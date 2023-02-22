/**
 * Sailors, monkeys and coconuts challenge
 *
 * 2023 Oliver B (Avoxel284)
 */

/**
 * @param {Number} n Amount of sailors
 */
function findCoconuts(n) {
	// Amount of coconuts to possibly begin with
	let x = 0;

	for (let i = 1; i < n; i++) {
		// Sailor takes its even division
		x = n * x;
		// Sailor gives one to the monkey
		x = x + 1;
		console.log(x)
	}

	return x;
}

console.log(findCoconuts(5));

/**
 * @param {Number} n Amount of sailors
 * @param {Number} c Amount of coconuts
 */
function takeCoconuts(n, c) {
	let x = 0;
	for (let i = 0; i < n; i++) {
		// Sailor takes its even division
		x = c / x;
		// Sailor gives one to the monkey
		x = x - 1;
	}

	return x;
}

console.log(takeCoconuts(5, 1000));
