var Router = require('./router'),
    utils = require('./route-utils'),
    _ = require('./utils'),
    minimist = require('minimist'),
    basename = require('path').basename,
	EventEmitter = require('events').EventEmitter;

var defaultHandler = function() {
	console.log('\nWARNING: default command handler is not specified');
	console.log('\nrealist({ \'default\': handler });\n');
};

var missingRequiredArgs = function(app, candidates) {
	var route = utils.encodeRoute(candidates.shift());
	console.log('Missing required argument.');
	console.log('Usage:', app.name, route);
	app.stop();
};

var commands = {
	'default': defaultHandler
};

var options = {
	'version': ['v', 'version'],
	'help': ['h', 'help']
};

var events = {
	'candidates': missingRequiredArgs
};

var optionsDefaults  = _.defaults.bind(null, options);
var commandsDefaults = _.defaults.bind(null, commands);
var eventsDefaults   = _.defaults.bind(null, events);

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
	options = options || {};
	return optionsDefaults(options);
};

var parseArgv = function(argv) {
	return minimist(argv.slice(2));
};

var Realist = function(commands, options, events, argv) {
	argv = argv || process.argv;

	this.args     = parseArgv(argv);
	this.commands = parseCommands(commands);
	this.options  = parseOptions(options);
	this.name     = basename(argv[1]);
	this.stoped   = false;

	events = events || {};
	this.bindEvents(eventsDefaults(events));
};

Realist.prototype.__proto__ = EventEmitter.prototype;

Realist.prototype.bindEvents = function(events) {
	for (var event in events) {
		var handler = events[event];

		if (typeof handler === 'function') {
			this.on(event, handler);
		}
	}
};

Realist.prototype.triggerOptionsEvents = function(options) {
	for (var event in options) {

		if (this.stoped) {
			return;
		}

		this.emit('option ' + event, this);
	}
};

Realist.prototype.stop = function() {
	this.stoped = true;
};

Realist.prototype.unstop = function() {
	this.stoped = false;
};

Realist.prototype.resolveOptions = function(opts) {
	var result = {};

	for (var i in opts) {
		for (var j in this.options) {
			var opt = this.options[j];
			if (opt.indexOf && -1 !== opt.indexOf(i) || opt === i) {
				result[j] = opts[i];
			}
		}
	}

	return _.extend(opts, result);
};

Realist.prototype.resolveCommand = function(args) {
	if (Object.keys(this.commands).length === 1) {
		return {
			args: args,
			handler: this.commands.default
		};
	}

	var router = new Router(this.commands);

	try {
		var command = router.resolve(args);
	} catch (candidates) {
		return this.emit('candidates', this, candidates);
	}

	if (command !== false) {
		return command;
	}

	return {
		args: args,
		default: true,
		handler: this.commands.default
	};
};

Realist.prototype.run = function() {
	var command = this.resolveCommand(this.args._);
	var options = this.resolveOptions(_.omit(this.args, '_'));

	this.triggerOptionsEvents(options);

	if (this.stoped) {
		return this.unstop();
	}

	if (command) {
		if (command.default) {
			this.emit('default', this);
		}

		if (this.stoped) {
			return this.unstop();
		}

		var args = [options].concat(command.args);
		command.handler.apply(this, args);
	}
};

module.exports = Realist;
