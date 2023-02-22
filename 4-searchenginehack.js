/**
 * Search Engine Hack challenge
 *
 * 2023 Oliver B (Avoxel284)
 */

/** The length of the output words */
const wordLength = 5;

/**
 * Reverse searches an array of sayings and finds common "words" between them. Returns an object containing common words and their count values.
 *
 * The length of these words is hardcoded in a variable above.
 * The current method of searching these words is by iterating through each saying, splitting all wordLength-long words words from the saying
 * and dumping it in an array. Then, while iterating through these sayings it will check if the word has already been found.
 *
 * @param {Array} sayings An array of sayings to search for common words
 */
function reverseSearch(sayings) {
	let words = [];
	let commonWords = {};

	sayings.forEach((s) => {
		// Extract "words" from sayings
		s = s.toLowerCase().replace(/[^A-Z]/gi, "");
		// console.log(s);

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
const results = Object.entries(
	reverseSearch(
		require("fs")
			.readFileSync(__dirname + "/sayings.txt")
			.toString()
			.split("\n")
	)
).sort((a, b) => b[1] - a[1]);

console.log(`Found ${results.length} common words in given sayings! Top 10:`)
console.log(results.splice(0, 10).map(v=>`"${v[0]}" with ${v[1]}, `).join(""));
