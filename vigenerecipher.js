/**
 * Vigenère Cipher challenge
 *
 * 2023 Oliver B (Avoxel284)
 */

const alphabet = Array.from(Array(26))
	.map((e, i) => i + 65)
	.map((x) => String.fromCharCode(x));

let vigenereMatrix = alphabet;
alphabet.forEach((a, y) => {
	vigenereMatrix[y] = [];
	alphabet.forEach((b, x) => {
		vigenereMatrix[y][x] = alphabet[x+1];
	});
});

console.log(vigenereMatrix);

/**
 * Returns the index of a given letter in the alphabet array
 * @param {String} l Letter to find index for
 */
function letterToIndex(l) {
	return String.fromCharCode(l) - 66; // don't forget 0-based indexing!
}

/**
 *
 * @param {String} str String to be encrypted
 * @param {String} key Cipher key
 */
function encrypt(str, key) {
	let result = "";

	if (str.length <= key.length) key = key.substring(0, str.length);
	else key = key.repeat(Math.ceil(str.length / key.length)).substring(0, str.length);
	if (key.length < str.length) throw "Key length is shorter than str length ??";

	console.log(`str: ${str} (${str.length}) :: key: ${key} (${key.length})`);
	for (i = 1; i < str.length; i++) {
		// result += alphabet[ key[i] letterToIndex[str[i]]]
	}

	return result;
}

console.log(encrypt("hello world", "dfw"));
