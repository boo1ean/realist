var Router = require('./router'),
    utils = require('./route-utils'),
    minimist = require('minimist'),
    basename = require('path').basename;

var defaultHandler = function() {
	var args = Array.prototype.slice.apply(arguments);
	console.log('Command not found:', args.slice(1).join(' '));
};

var missingRequiredArgs = function(opt, candidate) {
	var route = utils.decodeRoute(candidate);
	console.log('Missing required argument.');
	console.log('Usage:', this.name, route);
};

var Realist = function(options, actions, argv) {
	argv = argv || process.argv;

	this.args    = minimist(argv.slice(2));
	this.actions = actions || {};
	this.options = options || {};
	this.name    = basename(argv[1]);
};

Realist.prototype.resolveOptions = function(args) {
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
