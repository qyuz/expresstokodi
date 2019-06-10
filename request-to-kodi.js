const request = require('request-promise-native');


module.exports = requestToKodi;


function requestToKodi(path, opts = {}) {
	console.log(`sending to kodi ${path}`);
	console.log(`format ${opts.format}`);
	const ydlOpts = opts.format ? ` ${JSON.stringify({ydlOpts: {format: '720p60'}})}` : '';
	return request({
		uri: 'http://localhost:8080/jsonrpc',
		method: 'POST',
		json: {
			jsonrpc: "2.0",
			method: "Player.Open",
			params: {
				item: {
					file: `plugin://plugin.video.sendtokodi/?${path}${ydlOpts}`
				},
			},
			id: 1,
		},
	});

}
