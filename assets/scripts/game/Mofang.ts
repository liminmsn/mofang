import { _decorator, EventMouse, EventTouch, NodeEventType, Vec2, Node } from 'cc';
import { GameNodeBase } from '../lib/GameNodeBase';
const { ccclass, type } = _decorator;

@ccclass
export class Mofang extends GameNodeBase {
    @type(Node)
    mf: Node;
    start() {
        console.log('my mf');
        this.OnAll([NodeEventType.MOUSE_DOWN, NodeEventType.TOUCH_START], this.Down);
    }
    Down(ent: EventMouse | EventTouch) {
        // this.init_pos = ent.getLocationInView();
        //绑定鼠标移动事件
        this.OnAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE], this.Move);
        //鼠标抬起就取消移动事件绑定
        this.OnAll([NodeEventType.MOUSE_UP, NodeEventType.TOUCH_END], () => {
            [NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE].forEach(item => this.node.off(item));
        });
    }

    Move(ent: EventMouse | EventTouch) {
        console.log(ent.getDelta());
    }
}


