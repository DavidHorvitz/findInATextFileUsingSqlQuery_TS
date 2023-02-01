// import { map } from '../memoryIndex.js';
// import { writeOrRead } from '../index.js';
// import { readFile, writeFile } from 'node:fs/promises';
// import { stdin as input, stdout as output } from 'node:process';
// import * as readline from 'node:readline/promises';
// import { validateInput } from '../userQuestions.js';
// //This function receives the ID from the user and the position from the memory
// // and checks if the ID is equal to the key in the memory, and deletes the index
// // from index.txt and the object from name.txt
// //delate:
// export const removeObjectFromTextFile = async (position?) => {
//     let findIndex = await validateInput("Enter your ID (must be 36 characters)", 36, 'string');
//     for (const [key, value] of map) {
//         if (key === findIndex) {
//             const fdName = await readFile('./name.txt', { encoding: 'utf8' });
//             const lines2 = fdName.split('\n');
//             const lineToDelete2 = position;
//             console.log(`\n the deleted object : ${lineToDelete2} `);
//             lines2.splice(lineToDelete2 - 1, 1);
//             const newData2 = lines2.join('\n');
//             const writeToName = await writeFile('./name.txt', newData2, { encoding: 'utf8' });
//             console.log('Line Object deleted successfully!');

//             console.log(`key : ${key} value : ${value}`);
//             const fdIndex = await readFile('./index.txt', { encoding: 'utf8' });
//             // convert the contents into an array of lines
//             const lines1 = fdIndex.split('\n');
//             // specify the line number you want to delete
//             const lineToDelete1 = position;
//             //     // remove the specified line
//             lines1.splice(lineToDelete1 - 1, 1);
//             // convert the array back into a string
//             const newData1 = lines1.join('\n');
//             const writeToIndex = await writeFile('./index.txt', newData1, { encoding: 'utf8' });
//             console.log('Line Index deleted successfully!');
//             await writeOrRead();
//         }

//     }
// }
import { map } from '../memoryIndex';
import { writeOrRead } from '../home';
import { promises as fs } from 'fs';
import { validateInput } from '../userQuestions';

// export const removeObjectFromTextFile = async (position: number) => {
//     let findIndex = await validateInput("Enter your ID (must be 36 characters)", 36, 'string');
//     for (const [key, value] of map) {
//         if (key === findIndex) {
//             const fdName: string = await fs.readFile('./name.txt', { encoding: 'utf8' });
//             const lines2: string[] = fdName.split('\n');
//             const lineToDelete2: number = position;
//             console.log(`\n the deleted object : ${lineToDelete2} `);
//             lines2.splice(lineToDelete2 - 1, 1);
//             const newData2: string = lines2.join('\n');
//             await fs.writeFile('./name.txt', newData2, { encoding: 'utf8' });
//             console.log('Line Object deleted successfully!');

//             console.log(`key : ${key} value : ${value}`);
//             const fdIndex: string = await fs.readFile('./index.txt', { encoding: 'utf8' });
//             const lines1: string[] = fdIndex.split('\n');
//             const lineToDelete1: number = position;
//             lines1.splice(lineToDelete1 - 1, 1);
//             const newData1: string = lines1.join('\n');
//             await fs.writeFile('./index.txt', newData1, { encoding: 'utf8' });
//             console.log('Line Index deleted successfully!');
//             await writeOrRead();
//         }

//     }
// }
export async function getInput() {
    let findIndex = await validateInput("Enter your ID (must be 36 characters)", 36, 'string');
    await getFindIndex(findIndex);
}
export async function getFindIndex(findIndex?: any, position?: any) {
    await removeObjectFromTextFile(position, findIndex);
}

export const removeObjectFromTextFile = async (position: number, findIndex?: string) => {
    for (const [key, value] of map) {
        if (key === findIndex) {
            const fdName: string = await fs.readFile('./name.txt', { encoding: 'utf8' });
            const lines2: string[] = fdName.split('\n');
            const lineToDelete2: number = position;
            console.log(`\n the deleted object : ${lineToDelete2} `);
            lines2.splice(lineToDelete2 - 1, 1);
            const newData2: string = lines2.join('\n');
            await fs.writeFile('./name.txt', newData2, { encoding: 'utf8' });
            console.log('Line Object deleted successfully!');

            console.log(`key : ${key} value : ${value}`);
            const fdIndex: string = await fs.readFile('./index.txt', { encoding: 'utf8' });
            const lines1: string[] = fdIndex.split('\n');
            const lineToDelete1: number = position;
            lines1.splice(lineToDelete1 - 1, 1);
            const newData1: string = lines1.join('\n');
            await fs.writeFile('./index.txt', newData1, { encoding: 'utf8' });
            console.log('Line Index deleted successfully!');
            await updatePositionInIndexFile();
            await writeOrRead();
        }
    }
}
export const updatePositionInIndexFile = async () => {
    const fdIndex: string = await fs.readFile('./index.txt', { encoding: 'utf8' });
    const lines: string[] = fdIndex.split('\n');
    let newData = '';
    let position = 0;
    for (const line of lines) {
        if (line) {
            const id = line.slice(0, 35);
            newData += id + (5 - position.toString().length, '0') + position + '\n';
            position++;
        }
    }
    await fs.writeFile('./index.txt', newData, { encoding: 'utf8' });
    console.log('Index file positions updated successfully!');
};


