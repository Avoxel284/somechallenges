/**
 * A simple script to remove all unwanted strings from sayings.txt
 * Not part of the assignment.
 *
 * 2023 Oliver B (Avoxel284)
 */

let k = [],
	f = true;
require("fs")
	.readFileSync(__dirname + "/sayings.txt")
	.toString()
	.split("\n")
	.forEach((v) => {
		if (v.match(/^[A-Z,a-z,\s,\.]{1,}$/)) {
			if (f) k.push(v.toLowerCase().replace(/[^A-Z]/gi, ""));
			else k.push(v);
		}
	});

require("fs").writeFileSync(__dirname + "/sayings-f.txt", k.join("\n"));
