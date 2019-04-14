const fs = require('fs');
const fetch = require('node-fetch');

const data = generate(10, 5, 10, 1, 5)


fetch('http://127.0.0.1:3000', {
		method: 'post',
		body:    JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' },
	})
	.then(response => response.text())
	.then(data => console.log(data))
	.catch(err => console.error(err));

// fs.writeFile("data/data.json", JSON.stringify(data, null, 4), 'utf8', function (err) {
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     }
 
//     console.log("JSON file has been saved.");
// });


function getRandomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}

function generate(managersCount, clientsMinCount, clientMaxCount, contactsMinCount, contractMaxCount) {
	const result = [];
	for(let managerIndex = 1; managerIndex <= managersCount; managerIndex++) {
		const manager = {id: managerIndex, name: `Manager${managerIndex}`, clients: []};
		for (let clientIndex = 1; clientIndex <= getRandomInteger(clientsMinCount, clientMaxCount); clientIndex++) {
			const client = {id: clientIndex, name: `Client${clientIndex}`, contracts: []}
			for (let contractIndex = 1; contractIndex <= getRandomInteger(contactsMinCount, contractMaxCount); contractIndex++) {
				const contract = {id: contractIndex, name: `Contract${contractIndex}`, debt: `${getRandomInteger(0, 9999)}.${getRandomInteger(0, 99)}`}
				client.contracts.push(contract);
			}
			manager.clients.push(client);
		}
		result.push(manager);
	}

	return result;
}