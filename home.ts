import { exit } from 'process';
import { getDateFromTheUser } from './crudOperations/createObj';
import { deleteObject } from './crudOperations/deleteObj';
import { objectSearchByIndex } from './crudOperations/readObj';
import { loadAnIndexIntoMemory } from './memoryIndex';
import { validateInput } from './validateInput';



export async function writeOrRead(): Promise<void> {
    const question: string = await validateInput(`Do you want to enter information or read or or delate or exit  w | r | d | e  ?`, 1, 'string');
    switch (question) {
        case 'd':
            return await deleteObject();
        case 'w':
            return await getDateFromTheUser();
        case 'r':
            return await objectSearchByIndex();
        case 'e':
            console.log("Have a good day");
            exit();
        default:
            console.log("try anyMore...");
            await writeOrRead();
            break;
    }
};
async function run() {
    await loadAnIndexIntoMemory();
    await writeOrRead();

}
run().then(() => {

    console.log("Success");

});


