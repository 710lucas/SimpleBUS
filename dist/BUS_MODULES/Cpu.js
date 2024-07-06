export class CPU {
    constructor(systemBus) {
        this.systemBus = systemBus;
    }
    execute(command, address, data) {
        if (command == "CpuMemReadFinished") {
            console.log("Reading from memory finished");
            console.log("Reading from address: ", this.systemBus.readAddress());
            console.log("Data read: ", this.systemBus.readData());
            return undefined;
        }
        return undefined;
    }
    run(struction, address, data) {
        console.log("Running instruction: ", struction);
        this.systemBus.writeControl(struction);
        if (address)
            this.systemBus.writeAddress(address);
        if (data)
            this.systemBus.writeData(data);
    }
}
