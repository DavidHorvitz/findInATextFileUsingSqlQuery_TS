import { getObjectInTxtName } from './crudOperations/readObj';
import { getFindIndex } from './crudOperations/deleteObj';
import { updateObjectFromTextFile } from './crudOperations/updateObj';
import * as fs from 'fs';

export const map: Map<string, string> = new Map();

export const loadAnIndexIntoMemory = async (): Promise<void> => {
    try {
        const fileBuffer: Buffer = await fs.promises.readFile('./index.txt');
        const fileContents: string = fileBuffer.toString();
        const lines = fileContents.split('\n');
        for (const line of lines) {
            map.set(line.split('|')[0], line.split('|')[1]);
        }
        for (const [key, value] of map) {
            console.log(`key : ${key} value : ${value}`);
        }
    } catch (err) {
        console.error(err);
    }
};
//This function receives the ID from the user and compares it to the key in memory
//  and if they are the same, passes the value to the read & delay functions
export const findTheCorrectIndex = async (findIndex: string): Promise<void> => {
    for (const [key, valuePosition] of map) {
        if (key === findIndex) {
            console.log(`value Position ${valuePosition}`);
            const position: number = parseInt(valuePosition) * 63;
            console.log(`position ${position}`);
            await getObjectInTxtName(position);
            await getFindIndex(position, findIndex);
            await updateObjectFromTextFile(position);
        }
    }
}
