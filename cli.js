const commandLineArgs = require('command-line-args');
const requestToKodi = require('./request-to-kodi');

(async function () {
	try {
		console.log(process.argv);
		const cli = commandLineArgs([{
						name: 'format',
						type: Boolean,
					}, {
						name: 'path',
						type: String,
						defaultOption: true,
					},
				]);
		console.log(cli);
		requestToKodi(cli.path, {
			format: cli.format
		});
	} catch (error) {
		console.error('catch all', error);
	}
})();
