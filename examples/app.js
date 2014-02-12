#!/usr/bin/env node

var Realist = require('../');

var options = {
	whoop: ['w', 'whoop'],
	silent: ['s', 'si', 'silent'],
	email: ['e', 'email']
};

var actions = {
	'hello <first> [last]': function(opt, first, last) {
		console.log(arguments);
	}
};

new Realist(options, actions).run();
