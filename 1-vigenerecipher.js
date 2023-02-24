/**
 * Vigenère Cipher challenge
 *
 * 2023 Oliver B (Avoxel284)
 */

const inquirer = require("inquirer");

/**
 * An array of uppercase letters from A-Z, procedurally generated
 */
const alphabet = Array.from(Array(26))
	.map((e, i) => i + 65)
	.map((x) => String.fromCharCode(x));

/**
 * Returns the index of a given letter in the alphabet
 * @param {String} l Letter to find index for
 */
const letterToIndex = (l) => l.toUpperCase().charCodeAt(0) - 64;

/**
 * Encrypts a given string by using a given key and ciphering it using the Vigenere table.
 *
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

	// Iterate through the str
	for (i = 0; i < str.length; i++) {
		// If the character is a letter, cipher it
		if (str[i].match(/^[A-Z]$/g)) {
			// Repeat the alphabet array so it "wraps around"
			// Then, get the sum of indexes of str[i] and key[i], but subtract 2 so it shifts (also compensating for 0-based indexing)
			// Finally, append it to the result
			result += [...alphabet, ...alphabet][letterToIndex(str[i]) + letterToIndex(key[i]) - 2];
		}
		// If the character is a symbol, don't cipher it
		else if (str[i].match(/^\s|\.|!$/g)) result += str[i];
	}

	return result;
}

/**
 * Decrypts a given Vigenere-ciphered string using a given key.
 *
 * @param {String} str Ciphered string to be deciphered
 * @param {String} key The key used to decipher the string
 */
function decrypt(str, key) {
	let result = "";
	str = str.trim().toUpperCase();
	key = key.trim().toUpperCase();

	// Fix the key if necessary...
	if (str.length <= key.length) key = key.trim().substring(0, str.length);
	else key = key.repeat(Math.ceil(str.length / key.length) + 1).substring(0, str.length);

	console.log(`Deciphering: ${str} (${str.length}) with key: ${key} (${key.length})`);

	// Iterate through the str
	for (i = 0; i < str.length; i++) {
		// If the character is a letter, decipher it
		if (str[i].match(/^[A-Z]$/)) {
			// Repeat the alphabet array so it "wraps around"
			// Then, subtract the indexes of str[i] and key[i], but add 26 so it shifts back
			// Finally, append it to the result
			result += [...alphabet, ...alphabet][letterToIndex(str[i]) - letterToIndex(key[i]) + 26];
		}
		// If the character is a symbol, don't decipher it
		else if (str[i].match(/^\s|\.|!$/)) result += str[i];
	}

	return result;
}

function validateStrings(str, key) {
	return new Promise((res, rej) => {
		// Make sure our str and key is valid...
		if ((str != null && str.length == 0) || (key != null && key.length == 0)) rej("Invalid input");
		if (str != null && !str.match(/^([A-Z]|\s|\.|!){1,}$/gi))
			rej(
				"Message to cipher can only include characters from A-Z, spaces, exclamation marks and fullstops."
			);
		if (key != null && !key.match(/^[A-Z]{1,}$/gi))
			rej("Key can only include characters from A-Z.");
		res(true);
	});
}

console.log(`Welcome to my amazing Vigenere Cipher\n`);

inquirer
	.prompt([
		{
			name: "cipherOrDecipher",
			message: "Would you like to cipher or decipher a message?",
			type: "list",
			choices: ["Cipher", "Decipher"],
		},
	])
	.then((v) => {
		switch (v.cipherOrDecipher) {
			case "Cipher":
				inquirer
					.prompt([
						{
							name: "msg",
							message: "Input a message to cipher:",
							type: "input",
							validate: (input) => validateStrings(input),
						},
						{
							name: "key",
							message: "Input a key to use:",
							type: "input",
							validate: (input) => validateStrings(null, input),
						},
					])
					.then((v) => {
						console.log(`Ciphered result: ${encrypt(v.msg, v.key)}`);
					});

				break;

			case "Decipher":
				inquirer
					.prompt([
						{
							name: "msg",
							message: "Input the ciphered message:",
							type: "input",
							validate: (input) => validateStrings(input),
						},
						{
							name: "key",
							message: "Input the key used to cipher the message:",
							type: "input",
							validate: (input) => validateStrings(null, input),
						},
					])
					.then((v) => {
						console.log(`Deciphered result: ${decrypt(v.msg, v.key)}`);
					});
				break;
		}
	});

// console.log(encrypt("Hello World!", "dfw"));
// console.log(decrypt("KJHOT ZTNOI!", "dfw"));
