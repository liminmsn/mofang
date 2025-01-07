import { _decorator, EventMouse, EventTouch, NodeEventType, Vec2, Node } from 'cc';
import { GameNodeBase } from '../lib/GameNodeBase';
const { ccclass, type } = _decorator;

@ccclass
export class Mofang extends GameNodeBase {
    @type(Node)
    mf: Node;
    init_pos: Vec2;
    start() {
        console.log('my mf');
        this.OnAll([NodeEventType.MOUSE_DOWN, NodeEventType.TOUCH_START], this.Down);
    }
    Down(ent: EventMouse | EventTouch) {
        this.init_pos = ent.getLocationInView();
        this.OnAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE], this.Move);
        this.OnAll([NodeEventType.MOUSE_UP, NodeEventType.TOUCH_END], () => {
            
        });
    }

    Move(ent: EventTouch) {
        console.log(this.init_pos, ent);
    }
}


