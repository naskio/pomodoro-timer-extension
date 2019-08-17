export default class {
    constructor(ms, action) {
        this.ms = ms;
        this.action = action;
        this.id = -1;
    }

    start = () => {
        this.id = setInterval(this.action, this.ms);
    };

    stop = () => {
        clearInterval(this.id);
    }
}
