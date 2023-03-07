/**
 * Semiprimes challenge
 *
 * 2023 Oliver B (Avoxel284)
 */

const inquirer = require("inquirer");

/**
 * Checks if the given integer is a prime.
 * Will also return false if the number is not an integer.
 *
 * @param {Number} n Integer to check if prime
 */
function checkIfPrime(n) {
	if (n % 1 != 0) return false;
	for (let x = 2; x <= Math.sqrt(n); x++) if (n % x === 0) return false;
	return n > 1;
}
/**
 * Finds the semiprimes between a given minimum and maximum.
 *
 * @param {Number} min
 * @param {Number} max
 */
function findSemiprimes(min, max) {
	if (max < min) throw "Minimum is larger than maximum";
	const results = [];
	for (let n = min; n <= max; n++) {
		for (let i = 2; i < n; i++) {
			// If n's factors aren't whole, continue
			if ((n / i) % 1 != 0) continue;
			// Get n's factors; a & b
			let a = n / i,
				b = i;
			// If a & b are prime numbers themselves, append them to our results
			if (checkIfPrime(a) && checkIfPrime(b) && !results.includes(n)) results.push(n);

			// console.log(`${n} = ${a} x ${b}`);
		}
	}
	return results;
}

inquirer
	.prompt([
		{
			name: "min",
			message: "Please enter a minimum:",
			type: "input",
			validate: (input) => (!Number.isNaN(input) && input > 0 ? true : "Number must be above 0"),
		},
		{
			name: "max",
			message: "...And please enter a maximum:",
			type: "input",
			validate: (input) => (!Number.isNaN(input) && input > 0 ? true : "Number must be above 0"),
		},
	])
	.then((v) => {
		console.log(
			`Here are the semiprimes in range ${v.min} to ${v.max}: ${findSemiprimes(v.min, v.max)
				.map((v, i, a) => `${v}${i < a.length - 1 ? ", " : ""}`)
				.join("")}`
		);
	});
