import { SystemBus } from "../BUS/system_bus";
import { Module } from "./module";

export class CPU implements Module{

    private systemBus : SystemBus;

    public constructor(systemBus : SystemBus){
        this.systemBus = systemBus;
    }

    public execute(command : string, address? : string, data? : string): string | undefined{
        if(command == "CpuMemReadFinished"){
            console.log("Reading from memory finished")
            console.log("Reading from address: ", this.systemBus.readAddress())
            console.log("Data read: ", this.systemBus.readData())
            console.log("Priting data: ", this.systemBus.readData())
            console.log()
            this.systemBus.writeControl(undefined)
            return undefined;
        }
        return undefined;
    }

    public run(struction : string, address? : string, data? : string): void{
        console.log("Running instruction: ", struction)
        this.systemBus.writeControl(struction)
        if(address)
            this.systemBus.writeAddress(address)
        if(data)
            this.systemBus.writeData(data)

        this.systemBus.execute();

        console.log()
    }
}