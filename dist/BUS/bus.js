export class BUS {
    constructor() {
        this.currentInfo = undefined;
    }
    read() {
        return this.currentInfo;
    }
    write(info) {
        this.currentInfo = info;
    }
}
