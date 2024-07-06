import { Module } from "../BUS_MODULES/module";
import { BUS } from "./bus";

export class SystemBus{

    private dataBus : BUS;
    private addressBus : BUS;
    private controlBus : BUS;

    private busModules : Array<Module>;

    public constructor(){
        this.dataBus = new BUS();
        this.addressBus = new BUS();
        this.controlBus = new BUS();
        this.busModules = new Array<Module>();
    }

    public writeData(info: string): void{
        this.dataBus.write(info);
    }

    public writeAddress(info: string): void{
        this.addressBus.write(info);
    }

    public writeControl(info?: string): void{
        this.controlBus.write(info);
    }

    public readData(): string | undefined{
        return this.dataBus.read();
    }
    
    public readAddress(): string | undefined{
        return this.addressBus.read();
    }

    public readControl(): string | undefined{
        return this.controlBus.read();
    }

    public addModule(module : Module): void{
        this.busModules.push(module);
    }

    public execute() : void{

        /*
            BUS commands
            MemWrite -> put data on DataBus, put address on AddressBus. Search for the memory module and execute the command
            MemRead -> put address on AddressBus. Search for the memory module and execute the command. Load the memory on dataBus and interruption on controlBus

            CpuMemReadFinished -> put data on DataBus and interruption on controlBus
        */        
       
        let command = this.controlBus.read();

        console.log("Executing command: ", command);

        if(command == undefined){
            return;
        }

        if(command == "MemWrite"){
            let data = this.dataBus.read();
            let address = this.addressBus.read();

            console.log("Data: ", data)
            console.log("Address: ", address)

            if(data == undefined || address == undefined){
                return;
            }

            for(let i = 0; i < this.busModules.length; i++){
                this.busModules[i].execute("MemWrite", address, data);
            }

            this.controlBus.write(undefined);
        }

        if(command == "MemRead"){
            let address = this.addressBus.read();
            if(address == undefined){
                return;
            }

            let data = undefined;

            for(let i = 0; i < this.busModules.length; i++){
                data = this.busModules[i].execute("MemRead", address);
            }

            console.log("Data read: ", data)

            if(data == undefined){
                this.controlBus.write(undefined)
                return;
            }

            this.dataBus.write(data);
            this.controlBus.write("CpuMemReadFinished");
        }

        if(command == "CpuMemReadFinished"){
            for(let i = 0; i < this.busModules.length; i++){
                this.busModules[i].execute("CpuMemReadFinished");
            }
        }

        if(this.controlBus.read()){
            this.execute()
        }

    }

}