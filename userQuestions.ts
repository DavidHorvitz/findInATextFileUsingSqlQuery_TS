import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const rl = readline.createInterface({ input, output, terminal: false });

export async function validateInput(question: string, maxLength: number, type: string): Promise<string> {
  let input = await rl.question(question);
  while (!input || input.length > maxLength) {
    console.log("Wrong input, try again");
    input = await rl.question(question);
  }
  let i = Number(input)
  if (type === 'number') {
    while (isNaN(i)) {
      console.log("This is not a number");
      input = await rl.question(question);
    }
  }

  return input;
}