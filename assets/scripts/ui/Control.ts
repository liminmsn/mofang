import { Node, _decorator, EventMouse, EventTouch, NodeEventType, Vec2, Slider, Label, PhysicsSystem, Camera, geometry, sys } from 'cc';
import { GameNodeBase } from '../lib/GameNodeBase';
import { Cube } from '../game/Cube';
const { ccclass, type } = _decorator;

@ccclass
export class Control extends GameNodeBase {
    @type(Cube)
    cobe: Cube;
    @type([Slider])
    slider_arr: Slider[] = [];

    start() {
        sys.isBrowser ? this.OnAll([NodeEventType.MOUSE_DOWN], this.Down) :
            sys.isMobile ? this.OnAll([NodeEventType.TOUCH_START], this.Down) : null;
    }
    Down(ent: EventMouse | EventTouch) {
        this.castRay(ent.getLocation());
        this.run = true;
        //绑定移动事件
        this.OnAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE], this.Move);
        //取消移动事件
        this.OnAll([NodeEventType.MOUSE_UP, NodeEventType.TOUCH_END], () => {
            this.OffAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE]);
            this.run = false;
            this.slider_arr.forEach(item => item.progress = 0.5);
        });
    }

    Move(ent: EventMouse | EventTouch) {
        const { x, y } = ent.getDelta();
    }

    run: boolean = false;
    protected update(dt: number): void {
        if (this.run) {
            this.slider_arr.forEach(item => {
                const name = item.node.children[0].children[0].getComponent(Label).string;
                if (item.progress != 0.5) {
                    const dir_val = item.progress > 0.5 ? 1 + item.progress : -(1 + (1 - item.progress));
                    if (name === 'X') {
                        this.cobe.rotaryY(dir_val * dt);
                    }
                    if (name === 'Y') {
                        this.cobe.rotaryX(dir_val * dt);
                    }
                }
            });
        }
    }

    @type(Node)
    y: Node;
    @type(Camera)
    camera: Camera; // 绑定一个摄像机
    private _ray: geometry.Ray = new geometry.Ray(); // 创建射线对象
    castRay(screenPosition: Vec2) { // 投射射线并检测碰撞
        if (!this.camera) {
            console.error('Camera is not assigned!');
            return;
        }

        // 将屏幕坐标转为世界射线
        this.camera.screenPointToRay(screenPosition.x, screenPosition.y, this._ray);

        // 使用物理系统检测射线碰撞
        if (PhysicsSystem.instance.raycast(this._ray)) {
            // 获取所有检测到的碰撞结果
            const results = PhysicsSystem.instance.raycastResults;
            if (results.length > 0) {
                const hit = results[0]; // 假设只需要第一个碰撞物体
                console.log('Hit object:', hit.collider.node.name);
                // 可在这里执行其他逻辑，比如高亮显示或触发事件
                console.log(hit.collider.node.getWorldRT());
                const node = hit.collider.node;
                this.y.setRTS(node.getWorldRotation(), node.getWorldPosition())
            }
            console.log(results);
            
        } else {
            console.log('No collision detected.');
        }
    }
}


