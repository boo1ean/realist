var realist = require('../');

var handler = function() { 
	console.log('I am handler.');
};

var options = {
	'help': ['h', 'help']
};

var events = {
	'option help': function(app) {
		console.log('halp!');

		// Stop commands execution
		app.stop();
	}
}

realist(handler, options, events);
