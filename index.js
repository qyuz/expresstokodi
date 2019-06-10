const commandLineArgs = require('command-line-args');
const express = require('express');
const request = require('request-promise-native');

const app = express();
const port = 3000;
app.get('/', async (req, res) => {
	const path = req.query.path;
	console.log(`received path ${path}`);
	const extr = path.match(/.*(http:\/\/.*)/)[1];
	console.log(`extracted path ${extr}`);
	await toKodi(extr);
	res.sendStatus(200);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

(async function () {
	try {
		const cli = commandLineArgs([{
						name: 'path',
						type: String,
						defaultOption: true,
					},
				]);
		console.log(cli);
		toKodi(cli.path);

	} catch (error) {
		console.error('catch all', error);
	}
})();

function toKodi(path) {
	console.log(`sending to kodi ${path}`);
	return request({
		uri: 'http://localhost:8080/jsonrpc',
		method: 'POST',
		json: {
			jsonrpc: "2.0",
			method: "Player.Open",
			params: {
				item: {
					file: `plugin://plugin.video.sendtokodi/?${path}`
				},
			},
			id: 1,
		},
	});

}
