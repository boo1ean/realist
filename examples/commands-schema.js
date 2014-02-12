var realist = require('../');

var commands = {
	// Required argument
	'commit <target>': function(opt, target) {
		console.log(opt, target);
	},

	// Optional argument
	'push [remote]': function(opt, remote) {
		console.log(opt, remote);
	},

	// Required + optional arguments
	'reset <target> [revision]': function(opt, target, revision) {
		console.log(opt, target, revision);
	},

	'default': function() {
		console.log('I am default command!');
	}
};

realist(commands);
