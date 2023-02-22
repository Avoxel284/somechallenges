/**
 * Vigenère Cipher challenge
 *
 * 2023 Oliver B (Avoxel284)
 */

/**
 * An array of uppercase letters from A-Z, procedurally generated
 */
const alphabet = Array.from(Array(26))
	.map((e, i) => i + 65)
	.map((x) => String.fromCharCode(x));

/**
 * Ciphers a given letter (a) to the given letter (b) based on the Vigenere matrix
 *
 * @param {String} a String letter
 * @param {String} b Key letter
 */
function cipherLetter(a, b) {
	/**
	 * Returns the index of a given letter in the alphabet
	 * @param {String} l Letter to find index for
	 */
	const letterToIndex = (l) => l.toUpperCase().charCodeAt(0) - 64;

	// Repeat the alphabet array so it "wraps around".
	// Then, get the sum of indexes of a and b, but subtract 2 so it shifts.
	return [...alphabet, ...alphabet][letterToIndex(a) + letterToIndex(b) - 2];
}

/**
 * Encrypts a given string by using a given key and ciphering it using the Vigenere table.
 * Note: the string and key will be converted to upper case.
 * Symbols including spaces, exclamation marks and full stops are allowed but won't be ciphered.
 *
 * @param {String} str String to be encrypted
 * @param {String} key Cipher key
 */
function encrypt(str, key) {
	let result = "";
	// Convert to uppercase and clean our str and key
	str = str.trim().toUpperCase();
	key = key.trim().toUpperCase();

	// If the str is shorter than the key, we'll just trim the key
	if (str.length <= key.length) key = key.trim().substring(0, str.length);
	// If the str is longer than the key, we'll repeat the key to fit then trim it
	// Just to be safe, we'll add an extra repeat (shouldn't need it though)
	else key = key.repeat(Math.ceil(str.length / key.length) + 1).substring(0, str.length);

	// Make sure our str and key is valid
	if (!key.match(/^([A-Z]|\s|\.|!){1,}$/))
		throw "Str can only include characters from A-Z, spaces, exclamation marks and fullstops";
	if (!key.match(/^[A-Z]{1,}$/)) throw "Key can only include characters from A-Z";
	console.log(`Encrypting: ${str} (${str.length}) with key: ${key} (${key.length})`);

	// Iterate through the str
	for (i = 0; i < str.length; i++) {
		// If the character is a letter, cipher it
		if (str[i].match(/^[A-Z]$/)) result += cipherLetter(str[i], key[i]);
		// If the character is a symbol, don't cipher it
		else if (str[i].match(/^\s|\.|!$/)) result += str[i];
	}

	return result;
}

console.log(encrypt("Hello World!", "dfw"));
