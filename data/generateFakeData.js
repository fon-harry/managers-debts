const fs = require('fs');

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

let result = [];
for (let managerIndex = 1; managerIndex <= 10; managerIndex++) {
    for (let clientIndex = 1; clientIndex <= randomInteger(1, 9); clientIndex++) {

        let managerDebts = {};
        managerDebts.manager = 'Manager' + managerIndex;
        managerDebts.client = 'Client' + clientIndex;

        let contracts = [];
        for (let contractIndex = 1; contractIndex <= randomInteger(1, 5); contractIndex++) {

            contracts.push({
                name: 'Contract' + contractIndex,
                debt: +`${randomInteger(0, 9999)}.${randomInteger(0, 99)}`
            });
        }

        managerDebts.contracts = contracts;

        result.push(managerDebts);
    }
}

fs.writeFile("data/data.json", JSON.stringify(result, null, 4), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
}); 