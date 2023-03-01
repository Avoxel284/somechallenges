/**
 * Search Engine Hack challenge
 *
 * 2023 Oliver B (Avoxel284)
 */

/** The length of the output words */
const wordLength = 5;
/** An array of pithy, one-liner sayings */
const sayings = require("fs")
	.readFileSync(__dirname + "/sayings-10.txt")
	.toString()
	.split("\n");

/**
 * Reverse searches an array of sayings and finds common "words" between them. Returns an object containing common words and their count values.
 *
 * The length of these words is hardcoded in a variable above.
 * The current method of searching these words is by iterating through each saying, flattening them in to a long string, splitting all wordLength-long
 * words words from the saying and dumping it in an array. Then, while iterating through these sayings it will check if the word has already been found.
 * If so, the word is added to the commonWords array.
 *
 * @param {Array} sayings An array of sayings to search for common words
 */
function reverseSearch(sayings) {
	let words = [];
	let commonWords = {};
	if (!Array.isArray(sayings) || !sayings?.length > 0)
		throw "Given sayings array isn't valid (empty or not an array)";

	sayings.forEach((s) => {
		// Make sure its a valid string
		if (typeof s != "string" || s.length == 0) return;
		// "Flatten" the saying into a lower case string with no spaces
		s = s.toLowerCase().replace(/[^A-Z]/gi, "");

		// Extract "words" from sayings
		for (let i = 0; i < s.length; i++) {
			if (i > s.length - wordLength) continue;
			w = s.substring(i, i + wordLength);

			// If the word was previously found, promote it to commonWords with its count
			// If the word isn't in commonWords, give it a count of 2 since we found it once before then found it again
			if (words.includes(w)) !commonWords[w] ? (commonWords[w] = 2) : commonWords[w]++;

			words.push(w);
		}
	});

	return commonWords;
}

// Run the function, then sort it from highest count to lowest
const results = Object.entries(reverseSearch(sayings)).sort((a, b) => b[1] - a[1]);

console.log(
	`Found ${results.length} common words (length: ${wordLength}) in ${sayings.length} given sayings! Top 10 common words with their count:`
);
console.log(
	results
		.splice(0, 10)
		.map((v, i, a) => `"${v[0]}" with ${v[1]}${i < a.length - 1 ? ", " : ""}`) // damn look at that attention to detail
		.join("")
);
