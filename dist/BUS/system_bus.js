import { BUS } from "./bus.js";
export class SystemBus {
    constructor() {
        this.dataBus = new BUS();
        this.addressBus = new BUS();
        this.controlBus = new BUS();
        this.busModules = new Array();
    }
    writeData(info) {
        this.dataBus.write(info);
    }
    writeAddress(info) {
        this.addressBus.write(info);
    }
    writeControl(info) {
        this.controlBus.write(info);
    }
    readData() {
        return this.dataBus.read();
    }
    readAddress() {
        return this.addressBus.read();
    }
    readControl() {
        return this.controlBus.read();
    }
    addModule(module) {
        this.busModules.push(module);
    }
    execute() {
        /*
            BUS commands
            MemWrite -> put data on DataBus, put address on AddressBus. Search for the memory module and execute the command
            MemRead -> put address on AddressBus. Search for the memory module and execute the command. Load the memory on dataBus and interruption on controlBus

            CpuMemReadFinished -> put data on DataBus and interruption on controlBus
        */
        let command = this.controlBus.read();
        if (command == undefined) {
            return;
        }
        if (command == "MemWrite") {
            let data = this.dataBus.read();
            let address = this.addressBus.read();
            if (data == undefined || address == undefined) {
                return;
            }
            for (let i = 0; i < this.busModules.length; i++) {
                this.busModules[i].execute("MemWrite", address, data);
            }
        }
        if (command == "MemRead") {
            let address = this.addressBus.read();
            if (address == undefined) {
                return;
            }
            let data = undefined;
            for (let i = 0; i < this.busModules.length; i++) {
                data = this.busModules[i].execute("MemRead", address);
            }
            if (data == undefined)
                return;
            this.dataBus.write(data);
            this.controlBus.write("CpuMemReadFinished");
        }
        if (command == "CpuMemReadFinished") {
            for (let i = 0; i < this.busModules.length; i++) {
                this.busModules[i].execute("CpuMemReadFinished");
            }
        }
    }
}
