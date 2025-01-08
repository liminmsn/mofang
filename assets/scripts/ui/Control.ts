import { _decorator, EventMouse, EventTouch, NodeEventType, Vec2, Node, NodeSpace, v3, Slider, v2 } from 'cc';
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
    }

    dir_: Vec2 = v2(0, 0);
    OnTabScrll(ent: Slider, dir: string) {
        if (ent.progress > 0.5) {
            this.dir_[dir] = 1;
        } else if (ent.progress < 0.5) {
            this.dir_[dir] = -1;
        } else {
            this.dir_[dir] = 0;
        }
    }

    protected update(dt: number): void {
        this.cobe.rotaryY(this.dir_.x * dt);
        this.cobe.rotaryX(this.dir_.y * dt);
    }
}


