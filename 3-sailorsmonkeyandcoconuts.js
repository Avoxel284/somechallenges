/**
 * Sailors, monkeys and coconuts challenge
 *
 * 2023 Oliver B (Avoxel284)
 */

/**
 * @param {Number} sailors Number of sailors
 */
function findCoconuts(sailors) {
	// 				1,1 m = 1/2
	// 				2,2 m = 2/2
	// 				3,3 m =
	// 				4,4
	// 				5,5
	// 				1,1
	// 				1,1

	// c = n because its the lowest even split, when none go to the monkey at the end.
	let coconuts = 0;
	let x = 0;

	while (x % sailors == 0) {
		// console.log(`iterationio numero -- nuts : ${coconuts}`);
		let x = coconuts;
		for (let sailor = 1; sailor <= sailors; sailor++) {
			x -= 1 + x / sailors;
			console.log(x);
			// console.log(coconuts % sailors);
			// if (coconuts )
			if (x % sailors != 1) coconuts++;
			// else if (x != 0 && x % sailors == 0) coconuts++;

			// console.log(`coconuts after sailor #${sailor}: ${coconuts} | ${coconuts % sailors != 1}`);
		}
		// coconuts++;
		// console.log(coconuts);
		// if (coconuts==0) coconuts++;
		// if (!(coconuts != 0 && coconuts % sailors == 0)) coconuts++;
	}

	return coconuts;
}

x = findCoconuts(5);
console.log(x);
console.log(`.... ${x == 3121 ? "!!!!!!!!!!! IS" : "not"} 3121 :(`);

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

// console.log(takeCoconuts(5, 1000));
