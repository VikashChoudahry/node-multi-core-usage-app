const bodyParser = require('body-parser');
const cluster = require('cluster');
const express = require('express');
const { cpus } = require('os');

const apiRoute = require('./src/app/controllers/api');

// Initialize the app
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const totalClusterWorkers = cpus().length;

if (totalClusterWorkers > 1) {
	if (cluster.isMaster) {
		// Keep track of http requests
		// Comment this block if you don't want to see the logs
		let numOfRequests = 0;
		setInterval(() => {
			console.log('Num of requests = ' + numOfRequests);
		}, 1000); // Count requests

		function messageHandler(msg) {
			if (msg.cmd && msg.cmd === 'notifyRequest') {
				numOfRequests += 1;
			}
		}
		for (let i = 0; i < totalClusterWorkers; i++) {
			cluster.fork();
		}
		for (const id in cluster.workers) {
			cluster.workers[id].on('message', messageHandler);
		}
		cluster.on('exit', (code, signal) => {
			if (signal) {
				console.log('worker was killed by signal: ' + signal);
			} else if (code !== 0) {
				console.log('worker exited with error code: ' + code);
			} else {
				console.log('worker success!');
			}
		});
	} else {
		app.listen(PORT, () => {
			console.log(
				'App is running on port ' + PORT + ' and worker ' + process.pid
			);
		}); // Notify primary about the request
		process.send({ cmd: 'notifyRequest' });
	}
} else {
	app.listen(PORT, () => {
		console.log(
			'App is running on port ' +
				PORT +
				' with the single worker ' +
				process.pid
		);
	});
}
// Routes
app.use('/api', apiRoute);
