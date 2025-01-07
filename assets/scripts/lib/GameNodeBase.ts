import { Component, EventMouse, EventTouch } from "cc";

export class GameNodeBase extends Component {
    constructor() {
        super();
    }
    public OnAll(ents: string[], fun: (ent: EventMouse | EventTouch) => void) {
        for (let i = 0; i < ents.length; i++) {
            this.node.on(ents[i], fun, this);
        }
    }
}
