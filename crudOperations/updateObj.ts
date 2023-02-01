import { map } from '../memoryIndex';
import { writeOrRead } from '../home';
import { promises as fs } from 'fs';
import { stdin as input, stdout as output } from 'process';
import * as readline from 'node:readline/promises';

export const updateObjectFromTextFile = async (position: number) => {
    const rl = readline.createInterface({ input, output, terminal: false });
    let findIndex = await rl.question("Enter your ID you are want to remove ");
    while (!findIndex || findIndex.length !== 36) {
        console.log("The input is incorrect, try again delate");
        findIndex = await rl.question("Enter your ID you are want to remove");
    }
    for (const [key, value] of map) {
        if (key === findIndex) {
            
            const fdName = await fs.readFile('./name.txt', { encoding: 'utf8' });
            const lines2 = fdName.split('\n');
            const lineToDelete2 = position;
            console.log(`\n the deleted object : ${lineToDelete2} `);
            lines2.splice(lineToDelete2 - 1, 1);
            const newData2 = lines2.join('\n');
            await fs.writeFile('./name.txt', newData2, { encoding: 'utf8' });
            console.log('Line Object deleted successfully!');
            
            console.log(`key : ${key} value : ${value}`);
            const fdIndex = await fs.readFile('./index.txt', { encoding: 'utf8' });
            const lines1 = fdIndex.split('\n');
            const lineToDelete1 = position;
            lines1.splice(lineToDelete1 - 1, 1);
            const newData1 = lines1.join('\n');
            await fs.writeFile('./index.txt', newData1, { encoding: 'utf8' });
            console.log('Line Index deleted successfully!');
            await writeOrRead();
        }

    }
    rl.close();
}

