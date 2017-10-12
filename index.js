var http = require('http');
var exec = require('child_process').exec;

http.createServer((req, res) => {
	exec("fuser -k -n tcp " + process.env.APP_PORT || 3000);
	exec("cd " + process.env.APP_PATH + " && " + process.env.RUN_COMMAND || "npm run start:production");
	res.end("ended");
}).listen(process.env.UTILS_PORT || 3001);
