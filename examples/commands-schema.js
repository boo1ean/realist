var realist = require('../');

var commands = {
	// Required argument
	'commit <target>': function(opt, target) { console.log(arguments); },

	// Optional argument
	'push [remote]': function(opt, remote) { console.log(arguments); },

	// Required + optional arguments
	'reset <target> [revision]': function(opt, target, revision) { console.log(arguments); }
};

realist(commands);
