var Router = require('./router'),
    utils = require('./route-utils'),
    minimist = require('minimist'),
    basename = require('path').basename;

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

var actionsReference = function(actions) {
	return Object.keys(actions).map(function(action) {
		return '\t' + action;
	}).join('\n');
};

var defaultHandler = function() {
	var actions = actionsReference(this.actions);
	var options = optionsReference(this.options);
	console.log('Usage:');
	console.log(actions);
	console.log('\nOptions:');
	console.log(options);
};

var missingRequiredArgs = function(opt, candidate) {
	var route = utils.encodeRoute(candidate);
	console.log('Missing required argument.');
	console.log('Usage:', this.name, route);
};

var Realist = function(actions, options, argv) {
	argv = argv || process.argv;

	this.args    = minimist(argv.slice(2));
	this.actions = actions || null;
	this.options = options || null;
	this.name    = basename(argv[1]);
};

Realist.prototype.resolveOptions = function(args) {
	if (!this.options) {
		return args;
	}

	var result = {};

	for (var i in args) {
		for (var j in this.options) {
			var opt = this.options[j];
			if (opt.indexOf && -1 !== opt.indexOf(i) || opt.keys && -1 !== opt.keys.indexOf(i)) {
				result[j] = args[i];
			}
		}
	}

	return result;
};

Realist.prototype.resolveAction = function(args) {
	if (typeof this.actions === 'function') {
		return {
			args: args,
			handler: this.actions
		};
	}

	var router = new Router(this.actions);

	try {
		var action = router.resolve(args);
	} catch (candidates) {
		return {
			args: candidates,
			handler: missingRequiredArgs
		};
	}

	if (action !== false) {
		return action;
	}

	return {
		args: args,
		handler: defaultHandler
	};
};

Realist.prototype.run = function() {
	var action = this.resolveAction(this.args._);
	var options = this.resolveOptions(this.args);

	var args = [options].concat(action.args);
	action.handler.apply(this, args);
};

module.exports = Realist;
