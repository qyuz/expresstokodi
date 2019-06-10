const express = require('express');
const requestToKodi = require('./request-to-kodi');

const app = express();
const port = 3000;
app.get('/', async(req, res) => {
	try {
		const path = req.query.path;
		console.log(`received path ${path}`);
		const extr = path.match(/.*(https?:\/\/.*)/)[1];
		console.log(`extracted path ${extr}`);
		await requestToKodi(extr, { format: req.query.format });
		res.sendStatus(200);
	} catch (error) {
		console.error('error handling request', error);
	}
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
