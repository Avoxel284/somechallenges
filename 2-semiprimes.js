/**
 * Sailors, monkeys and coconuts challenge
 *
 * 2023 Oliver B (Avoxel284)
 */

const inquirer = require("inquirer");

function checkIfPrime(n) {
	for (let x = 2; x <= n; x++) {
		return n % x != 0;
	}
}
/**
 *
 * @param {Number} min
 * @param {Number} max
 */
function findSemiprimes(min, max) {
	if (max < min) throw "Minimum is larger than maximum";
	const results = [];
	for (let i = min; i <= max; i++) {
		if (i % 1 == 0 && checkIfPrime(i / 2)) { results.push(i); continue;};
		console.log(i / 2, checkIfPrime(i / 2));
		// if (checkIfPrime(i/2) + checkIfPrime(i/2) == i) results.push(i);
	}
	return results;
}

console.log(findSemiprimes(3, 11));
