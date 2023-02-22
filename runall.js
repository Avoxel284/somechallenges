require("fs").readdir(__dirname, (err, v) => {
	if (err) console.log(`An error occurred when reading directory:`, err);
	console.log(`Testing various coding challenges by Oliver B (Avoxel284)\n${"=".repeat(30)}\n`);

	v.sort().forEach((f) => {
		if (!f.match(/[0-99]-.*\.js/i)) return;
		console.log(`Running ${f}...`);
		require(`${__dirname}/${f}`);
		console.log()
	});
});
