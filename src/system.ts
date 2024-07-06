import { SystemBus } from "./BUS/system_bus";
import { CPU } from "./BUS_MODULES/Cpu"
import { Memory } from "./BUS_MODULES/Memory";

const instructions = [
    {
        code: "MemWrite",
        address: "0x0000",
        data: "First"
    },
    {
        code: "MemWrite",
        address: "0x0001",
        data: "Second"
    },
    {
        code: "MemRead",
        address: "0x0000"
    },
    {
        code: "MemRead",
        address: "0x0001"
    }
]

const systemBus : SystemBus = new SystemBus();

const cpu : CPU = new CPU(systemBus);

const memory : Memory = new Memory();

systemBus.addModule(cpu);
systemBus.addModule(memory);

instructions.forEach(instruction => {
    cpu.run(instruction.code, instruction.address, instruction.data);
})