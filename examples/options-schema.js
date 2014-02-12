var realist = require('../');

var options = {
	'force': ['f', 'force'],
	'ignore': ['i', 'ig', 'ignore']
}

var commands = {
	// Show options, if name is given -> dump single option
	'show [option-name]': function(opt, name) {
		if (name) {
			console.log(opt[name]);
		} else {
			console.log(opt);
		}
	}
};

realist(commands, options);
