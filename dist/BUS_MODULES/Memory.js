export class Memory {
    constructor() {
        this.memory = new Map();
    }
    execute(command, address, data) {
        if (command == "MemWrite") {
            if (address == undefined || data == undefined) {
                return "Error";
            }
            this.memory.set(address, data);
            return undefined;
        }
        if (command == "MemRead") {
            if (address == undefined) {
                return "Error";
            }
            let data = this.memory.get(address);
            if (data == undefined) {
                return "Error";
            }
            return data;
        }
    }
}
