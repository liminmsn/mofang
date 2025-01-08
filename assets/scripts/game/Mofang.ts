import { _decorator, EventMouse, EventTouch, NodeEventType, Vec2, Node, misc, v3, Vec3, Quat } from 'cc';
import { GameNodeBase } from '../lib/GameNodeBase';
const { ccclass, type } = _decorator;

@ccclass
export class Mofang extends GameNodeBase {
    @type(Node)
    mf: Node;
    start() {
        // console.log('my mf');
        this.OnAll([NodeEventType.MOUSE_DOWN, NodeEventType.TOUCH_START], this.Down);
    }
    Down(ent: EventMouse | EventTouch) {
        // this.init_pos = ent.getLocationInView();
        //绑定移动事件
        this.OnAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE], this.Move);
        //取消移动事件
        this.OnAll([NodeEventType.MOUSE_UP, NodeEventType.TOUCH_END], () => {
            this.OffAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE]);
        });
    }

    Move(ent: EventMouse | EventTouch) {
        const delta = ent.getDelta();
        const speed = 0.002;
        const horizontal = delta.x * speed;
        const vertical = delta.y * speed;
    }
    protected update(dt: number): void {

    }
}


