export interface Module{

    execute(command : string, address? : string, data? : string): string | undefined;

}