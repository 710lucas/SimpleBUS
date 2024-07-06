import { SystemBus } from "./BUS/system_bus.js";
import { CPU } from "./BUS_MODULES/Cpu.js";
import { Memory } from "./BUS_MODULES/Memory.js";
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
];
const systemBus = new SystemBus();
const cpu = new CPU(systemBus);
const memory = new Memory();
systemBus.addModule(cpu);
systemBus.addModule(memory);
instructions.forEach(instruction => {
    cpu.run(instruction.code, instruction.address, instruction.data);
});
