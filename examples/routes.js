var realist = require('../');

var commands = {
	// Required argument
	'commit <target>': function(opt, target) {},

	// Optional argument
	'push [remote]': function(opt, remote) {},

	// Required + optional arguments
	'reset <target> [revision]': function(opt, target, revision) {},
};

realist(commands);
