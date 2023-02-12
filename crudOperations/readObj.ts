import { promises as fs } from 'fs';
import { FileHandle } from 'fs/promises';
import { writeOrRead } from '../home';
import { findTheCorrectIndex } from '../memoryIndex';
import { validateInput } from '../validateInput';

export let objectSearchByIndex = async () => {
    const findIndex: string = await validateInput("Enter your ID (must be 36 characters)", 36, 'string');
    await findTheCorrectIndex(findIndex);
    await writeOrRead();
}

export const getObjectInTxtName = async (position: number) => {
    try {
        const fd: FileHandle = await fs.open('./name.txt');
        const insertFromNameToBfr: Buffer = Buffer.alloc(63);
        await fd.read(insertFromNameToBfr, 0, 63, position);
        const bfrNameToString: string = insertFromNameToBfr.toString();
        const removeBfrNameMark: string = bfrNameToString.split('|').join(" ")
        console.log(`\n the position of the Object : ${position} `);
        console.log(`\n Output Object from Name.txt : ${removeBfrNameMark}`);
        console.log(`Success`);
        await fd.close();
        await writeOrRead();
    } catch (error) {
        console.error(error);
    }
}
