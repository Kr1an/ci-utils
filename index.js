var http = require('http');
var spawn = require('child_process').spawn;
var kill = require('cross-port-killer').kill;

http.createServer((req, res) => {
	kill(process.env.APP_PORT || 3000).then((dip) => {
		console.log('killed process with dip: ' + dip);
		startProduction(process.env.APP_PATH, process.env.NPM_COMMAND || 'start:production');

	})

	// var child = spawn('npm', ['run', 'start:production-no-tests'], {cwd: '/home/anton/Workspace/empiresolomonbank'});
	// child.stderr.on('data', stderr);
	// child.stdout.on('data', stdout);

	res.end('_');
	
}).listen(process.env.UTILS_PORT || 3001);

var startProduction = function(path, npmCommand) {
	ioToConsoleProcess(spawn('npm', ['run', npmCommand], {cwd: path}));
}

var ioToConsoleProcess = function(process) {
	process.stderr.on('data', stderr);
	process.stdout.on('data', stdout);
	process.on('exit', onExit);
	return process;
}
var onExit = function() {
	console.log("Process endedup")
}
var stdout = function(data) {
	console.log(data.toString());
}
var stderr = function(data) {
	console.error(data.toString());
}
