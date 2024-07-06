import { Module } from "./module";

export class Memory implements Module{
    
    private memory : Map<string, string>;

    public constructor(){
        this.memory = new Map<string, string>();
    }

    public execute(command : string, address? : string, data? : string): string | undefined{
        if(command == "MemWrite"){
            console.log("Writing on memory")
            if(address == undefined || data == undefined){
                return "Error";
            }
            this.memory.set(address, data);
            console.log("Memory: ", this.memory)
            return undefined;
        }
        if(command == "MemRead"){
            if(address == undefined){
                return "Error";
            }
            let data = this.memory.get(address);
            if(data == undefined){
                return "Error";
            }
            return data;
        }
    }
}