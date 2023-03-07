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
 *
 * @param {Number} min
 * @param {Number} max
 */
function findSemiprimes(min, max) {
	if (max < min) throw "Minimum is larger than maximum";
	const results = [];
	for (let n = min; n <= max; n++) {
		// Save time if n is a semi prime through its roots
		// if (checkIfPrime(Math.sqrt(n))) results.push(n);

		for (let i = 2; i < n; i++) {
			if ((n / i) % 1 != 0) continue;
			let a = n / i,
				b = i;
			if (checkIfPrime(a) && checkIfPrime(b) && !results.includes(n)) results.push(n);

			// console.log(`${n} = ${a} x ${b}`);
		}
	}
	return results;
}

console.log(findSemiprimes(3, 11));
