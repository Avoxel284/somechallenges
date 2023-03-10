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
	// Check n is an integer
	if (n % 1 != 0) return false;
	// Iterate from 2 to the square root of n
	for (let x = 2; x <= Math.sqrt(n); x++) if (n % x === 0) return false;
	// If the above didn't trigger, also make sure its not because n is lower than 1
	return n > 1;
}

/**
 * Finds the semiprimes between a given minimum and maximum.
 *
 * @param {Number} min
 * @param {Number} max
 */
function findSemiprimes(min, max) {
	const results = [];
	for (let n = min; n <= max; n++) {
		for (let i = 2; i < n; i++) {
			// If this factor of n isn't whole, continue
			if ((n / i) % 1 != 0) continue;
			// Get n's factors; a & b
			let a = n / i,
				b = i;
			// If a & b are prime numbers themselves, append them to our results
			if (checkIfPrime(a) && checkIfPrime(b) && !results.includes(n)) results.push(n);
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
		// Convert string input to numeric
		(v.min = Number(v.min)), (v.max = Number(v.max));
		if (v.min > v.max) return console.log(`Minimum is larger than maximum`);

		console.log(
			`Here are the semiprimes in range ${v.min} to ${v.max}: ${findSemiprimes(v.min, v.max)
				.map((v, i, a) => `${v}${i < a.length - 1 ? ", " : ""}`)
				.join("")}`
		);
	});
