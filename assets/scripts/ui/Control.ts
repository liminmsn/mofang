import { _decorator, EventMouse, EventTouch, NodeEventType, Vec2, Node, NodeSpace, v3, Slider } from 'cc';
import { GameNodeBase } from '../lib/GameNodeBase';
import { Cube } from '../game/Cube';
const { ccclass, type } = _decorator;

@ccclass
export class Control extends GameNodeBase {
    @type(Cube)
    cobe: Cube;

    start() {
        this.OnAll([NodeEventType.MOUSE_DOWN, NodeEventType.TOUCH_START], this.Down);
    }
    Down(ent: EventMouse | EventTouch) {
        //绑定移动事件
        this.OnAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE], this.Move);
        //取消移动事件
        this.OnAll([NodeEventType.MOUSE_UP, NodeEventType.TOUCH_END], () => {
            this.OffAll([NodeEventType.MOUSE_MOVE, NodeEventType.TOUCH_MOVE]);
        });
    }

    Move(ent: EventMouse | EventTouch) {
        const { x, y } = ent.getDelta();
        // this.cobe.rotaryX(-y * 0.01);
        // this.cobe.rotaryY(x * 0.01);
    }


    OnTabScrll(ent: Slider) {
        console.log(ent);
        
    }
}


