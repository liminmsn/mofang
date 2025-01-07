import { _decorator, EventMouse, EventTouch, NodeEventType, Vec2 } from 'cc';
import { GameNodeBase } from '../lib/GameNodeBase';
const { ccclass, property } = _decorator;

@ccclass('Mofang')
export class Mofang extends GameNodeBase {
    init_pos: Vec2;

    start() {
        console.log('my mf');
        this.OnAll([NodeEventType.MOUSE_DOWN, NodeEventType.TOUCH_START], this.Down);
    }
    Down(ent: EventMouse | EventTouch) {
        this.init_pos = ent.getLocationInView();
        this.OnAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE], this.Move);
    }

    Move(ent: EventTouch) {
        console.log(this.init_pos, ent);
    }
}


