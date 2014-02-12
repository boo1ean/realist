var Router = require('./router'),
    utils = require('./route-utils'),
    minimist = require('minimist'),
    basename = require('path').basename;

var omit = function(obj, prop) {
	var result = {};

	for (var i in obj) {
		if (i === prop) {
			continue;
		}

		result[i] = obj[i];
	}

	return result;
};

var optionsReference = function(options) {
	var result = [];

	for (var i in options) {
		var opt = options[i];
		var keys = opt.length ? opt : opt.keys;
		var message = keys.map(function(key) {
			return (key.length === 1 ? '-' : '--') + key;
		}).join(' ');

		result.push('\t' + i + ' ' + message);
	}

	return result.join('\n');
};

var commandsReference = function(commands) {
	return Object.keys(commands).map(function(command) {
		return '\t' + command;
	}).join('\n');
};

var defaultHandler = function() {
	var commands = commandsReference(this.commands);
	var options = optionsReference(this.options);
	console.log('Usage:');
	console.log(commands);
	console.log('\nOptions:');
	console.log(options);
};

var defaults = function(defs, obj) {
	for (var i in defs) {
		if (!obj[i]) {
			obj[i] = defs[i];
		}
	}

	return obj;
};

var commands = {
	'default': defaultHandler
};

var options = {
	version: ['v', 'version'],
	help: ['h', 'help'],
};

var optionsDefaults = defaults.bind(null, options);
var commandsDefaults = defaults.bind(null, commands);

var parseCommands = function(commands) {
	if (typeof commands === 'function') {
		return commandsDefaults({ 'default': commands });
	}

	if (commands) {
		return commandsDefaults(commands);
	}

	return null;
};

var parseOptions = function(options) {
	return options || null;
};

var parseArgv = function(argv) {
	return minimist(argv.slice(2));
};

var missingRequiredArgs = function(opt, candidate) {
	var route = utils.encodeRoute(candidate);
	console.log('Missing required argument.');
	console.log('Usage:', this.name, route);
};

var Realist = function(commands, options, argv) {
	argv = argv || process.argv;

	this.args     = parseArgv(argv);
	this.commands = parseCommands(commands);
	this.options  = parseOptions(options);
	this.name     = basename(argv[1]);
};

Realist.prototype.resolveOptions = function(args) {
	if (!this.options) {
		return omit(args, '_');
	}

	var result = {};

	for (var i in args) {
		for (var j in this.options) {
			var opt = this.options[j];
			if (opt.indexOf && -1 !== opt.indexOf(i) || opt === i) {
				result[j] = args[i];
			}
		}
	}

	return result;
};

Realist.prototype.resolveCommand = function(args) {
	if (Object.keys(this.commands).length === 1) {
		return {
			args: args,
			handler: this.commands['default']
		};
	}

	var router = new Router(this.commands);

	try {
		var command = router.resolve(args);
	} catch (candidates) {
		return {
			args: candidates,
			handler: missingRequiredArgs
		};
	}

	if (command !== false) {
		return command;
	}

	return {
		args: args,
		handler: this.commands['default']
	};
};

Realist.prototype.run = function() {
	var command = this.resolveCommand(this.args._);
	var options = this.resolveOptions(this.args);

	var args = [options].concat(command.args);
	command.handler.apply(this, args);
};

module.exports = Realist;
