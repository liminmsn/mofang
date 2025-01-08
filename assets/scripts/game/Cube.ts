import { _decorator, NodeSpace, Quat, quat, v3 } from 'cc';
import { GameNodeBase } from '../lib/GameNodeBase';
const { ccclass, type } = _decorator;

@ccclass
export class Cube extends GameNodeBase {
    rotaryX(num: number) {
        this.rotate(v3(1, 0, 0), num);
    }
    rotaryY(num: number) {
        this.rotate(v3(0, 1, 0), num);
    }
    rotaryZ(num: number) {
        this.rotate(v3(0, 0, 1), num);
    }
    rotate(axis = v3(0, 1, 0), rotationSpeed = 5) {
        let angle = rotationSpeed;  // 旋转角度
        let quatRotation = quat();
        Quat.fromAxisAngle(quatRotation, axis, angle);
        this.node.rotate(quatRotation);
    }
    protected update(dt: number): void {

    }
}