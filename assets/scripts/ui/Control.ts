import { _decorator, EventMouse, EventTouch, NodeEventType, Vec2, Node, NodeSpace, v3, Slider, v2, Label } from 'cc';
import { GameNodeBase } from '../lib/GameNodeBase';
import { Cube } from '../game/Cube';
const { ccclass, type } = _decorator;

@ccclass
export class Control extends GameNodeBase {
    @type(Cube)
    cobe: Cube;
    @type([Slider])
    slider_arr: Slider[];

    start() {
        this.run = true;
        this.OnAll([NodeEventType.MOUSE_DOWN, NodeEventType.TOUCH_START], this.Down);
    }
    Down(ent: EventMouse | EventTouch) {
        //绑定移动事件
        this.OnAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE], this.Move);
        //取消移动事件
        this.OnAll([NodeEventType.MOUSE_UP, NodeEventType.TOUCH_END], () => {
            this.OffAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE]);
            this.run = false;
        });
    }

    Move(ent: EventMouse | EventTouch) {
        const { x, y } = ent.getDelta();
    }

    run: boolean = false;
    protected update(dt: number): void {
        if (this.run) {
            this.slider_arr.forEach(item => {
                const name = item.node.children[0].getComponent(Label).string;
                if (item.progress != 0.5) {
                    const dir_val = item.progress > 0.5 ? 1 : -1;
                    if (name === 'X') {
                        this.cobe.rotaryY(dir_val * dt);
                    }
                    if (name === 'Y') {
                        this.cobe.rotaryY(dir_val * dt);
                    }
                }
            });
        }
    }
}


