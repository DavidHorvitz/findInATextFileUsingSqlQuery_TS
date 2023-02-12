import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
// import * as fs from 'fs';
import { writeOrRead } from '../home';
import { map } from '../memoryIndex';
import { validateInput } from '../validateInput';
const FILL_CHAR = `|`;

export const getDateFromTheUser = async function (): Promise<void> {
    const id: string = randomUUID();
    const firstName = await validateInput("What is your first name? (must be 10 characters)", 10, 'string');
    const lastName = await validateInput("What is your last name? (must be 10 characters)", 10, 'string');
    const age = await validateInput("What is your age?", 2, 'number');
    const USER_BUF_LEN = 62;
    const bfr = Buffer.alloc(USER_BUF_LEN, FILL_CHAR);
    bfr.write(id, 0)
    bfr.write(firstName, 37);
    bfr.write(lastName, 48);
    bfr.write(age, 59);
    console.log(`The new information you entered into the Name file is : \n First Name: ${firstName} \n Last Name : ${lastName} \n Age : ${age} \n ID: ${id}`);
    await fs.appendFile('./name.txt', `${bfr}\n`);
    console.log(" Success appendFile To Name file\n");

    //Find the number of rows * their size and add them to Index txt
    await countLines(bfr, id);

    await writeOrRead();
}


async function countLines(bfrToIndex: Buffer, id: string): Promise<void> {
    const fileBuffer: Buffer = await fs.readFile('./name.txt');
    const fileContents: string = fileBuffer.toString();
    const lines = fileContents.split('\n');
    let numberOfLines = -1;
    for (const line of lines) {
        numberOfLines++;
    }
    // let chunk = await file.readFile();
    // while (chunk) {
    //     numberOfLines += chunk.toString().split('\n').length;
    //     chunk = await file.readFile();
    // }
    const count_Lines = numberOfLines - 1;
    const lds = count_Lines.toString();

    bfrToIndex = Buffer.alloc(46, FILL_CHAR);
    bfrToIndex.write(id, 0)//This ID should be put in the search bar :  kay
    bfrToIndex.write(lds, 37) // The value I get here is the number of lines * the size of the line from the name.txt file
    console.log(`The new information you entered into the Index file is : \n ID: ${id} \n LDS ${lds} `);
    await fs.appendFile('./index.txt', `${bfrToIndex}\n`);
    console.log("Success appendFile To Index file\n");
    map.set(id, lds);
    // file.close();
}


