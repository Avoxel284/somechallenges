/**
 * Sailors, monkeys and coconuts challenge
 *
 * 2023 Oliver B (Avoxel284)
 */

// const inquirer = require("inquirer");

/**
 * Calculates the amount of coconuts in a pile if for N amount of given sailors, each sailor takes N/coconuts and
 * gives 1 to the next door monkey. To do this, we mathematically brute force the amount of coconuts, working backwards.
 * Returns the original amount of coconuts and how many the monkey gets.
 *
 * @param {Number} sailors Number of sailors
 */
function findCoconuts(sailors) {
	let coconuts = 0;
	let monkeysCoconuts = 0;

	while (
		// Continue incrementing coconuts until the following function is false
		(() => {
			{
				let x = coconuts;
				for (let sailor = 1; sailor <= sailors; sailor++) {
					console.log(sailor)
					// If x mod sailors doesn't equal 1, we know it can't be our answer
					// Thus, continue incrementing coconuts
					if (x % sailors != 1) return true;

					// Record how many coconuts the monkey gets
					monkeysCoconuts++;

					// Sailor takes their division, and 1 goes to the monkey
					x -= 1 + Math.floor(x / sailors);
				}

				// If x doesn't equal 0 and x mod sailors equals 1, its our answer
				console.log(`huh ${x}`)
				return x != 0 && x % sailors == 1;
			}
		})()
	) {
		coconuts++;
		console.log(`incrememnted: ${coconuts}`);
	}

	return [coconuts, monkeysCoconuts];
}

// inquirer
// 	.prompt([
// 		{
// 			name: "sailors",
// 			type: "input",
// 			message: "How many sailors would you like to calculate coconuts for?",
// 			validate: (v) => {
// 				return new Promise((res, rej) => {
// 					if (!`${v}`.match(/^[2-9]$/g)) return rej(`Input must be a number and in the range 2-9.`);
// 					res(true);
// 				});
// 			},
// 		},
// 	])
// 	.then((v) => {
// 		[c, m] = findCoconuts(v.sailors);
// 		console.log(
// 			`Coconuts originally in the pile: ${c} | Monkey gets ${m} coconuts and each sailor gets ${
// 				(c - m) / v.sailors
// 			} coconuts`
// 		);
// 	});

[c, m] = findCoconuts(2);
console.log(
	`Coconuts originally in the pile: ${c} | Monkey gets ${m} coconuts and each sailor gets ${
		(c - m) / 2
	} coconuts`
);
