/**
 * A simple script to run all of the programs at once for your convenience. I totally added the numbers at the beginning 
 * of the script filenames to mark which challenge they were and not so this program knows which scripts to run.
 *
 * 2023 Oliver B (Avoxel284)
 */

require("fs").readdir(__dirname, (err, v) => {
	if (err) console.log(`An error occurred when reading directory:`, err);
	console.log(`Testing various coding challenges by Oliver B (Avoxel284)\n${"=".repeat(60)}\n`);

	v.sort().forEach((f) => {
		if (!f.match(/[0-9]-.*\.js/i)) return;
		console.log(`Running ${f}...`);
		require(`${__dirname}/${f}`);
		console.log();
	});
});
