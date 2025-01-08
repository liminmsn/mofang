import { Component, EventMouse, EventTouch } from "cc";

export abstract class GameNodeBase extends Component {
    constructor() {
        super();
    }
    public OnAll(ent_arr: string[], fun: (ent: EventMouse | EventTouch) => void) {
        for (let i = 0; i < ent_arr.length; i++) {
            this.node.on(ent_arr[i], fun, this);
        }
    }
    public OffAll(ent_arr: string[]) {
        for (let i = 0; i < ent_arr.length; i++) {
            this.node.off(ent_arr[i]);
        }
    }
}
