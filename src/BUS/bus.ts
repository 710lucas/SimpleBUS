export class BUS{

    private currentInfo : string | undefined;

    public constructor(){
        this.currentInfo = undefined;
    }

    public read(): string | undefined{
        return this.currentInfo;
    }

    public write(info?: string): void{
        this.currentInfo = info;
    }

}