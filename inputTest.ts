import { validateInput } from "./validateInput";


const sqlQueryTypes = ["SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "INSERT", "GROUP BY"];

async function getInputUser() {
    const inputUser: string = await validateInput("Enter your Query ", 100, "string");
    await processSQLQuery(inputUser);
}

getInputUser();

async function processSQLQuery(input: string) {
    const inputWords = input.split(' ');

    if (inputWords.length < 4) {
        console.error('Invalid SQL query');
        return;
    }

    let queryTypeIndex = -1;
    let queryOperatorIndex = -1;
    let queryOperator1Index = -1;

    for (let i = 0; i < inputWords.length; i++) {
        if (sqlQueryTypes.includes(inputWords[i].toUpperCase())) {
            if (queryTypeIndex === -1) {
                queryTypeIndex = i;
            } else if (queryOperatorIndex === -1) {
                queryOperatorIndex = i;
            } else if (queryOperator1Index === -1) {
                queryOperator1Index = i;
                break;
            }
        }
    }

    if (queryTypeIndex === -1 || queryOperatorIndex === -1) {
        console.error('Invalid SQL query type or operator');
        return;
    }

    const queryType = inputWords[queryTypeIndex].toUpperCase();
    const id = inputWords[queryTypeIndex + 1];
    const queryOperator = inputWords[queryOperatorIndex].toUpperCase();
    const lastName = inputWords[queryOperatorIndex + 1];
    let queryOperator1 = "";
    let firstName = "";
    if (queryOperator1Index !== -1) {
        queryOperator1 = inputWords[queryOperator1Index].toUpperCase();
        firstName = inputWords[queryOperator1Index + 1];
    }

    if (id.length > 10 || lastName.length > 10 || firstName.length > 10) {
        console.error('Invalid column name');
        return;
    }
    console.log(` return the Query : ${input}`);
    return input;
}

