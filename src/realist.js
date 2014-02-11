var Router = require('./router'),
    minimist = require('minimist');

var defaultHandler = function() {
	var args = Array.prototype.slice.apply(arguments);
	console.log('Command not found:', args.slice(1).join(' '));
};

var Realist = function(options, actions, argv) {
	argv = argv || process.argv;

	this.args    = minimist(argv.slice(2));
	this.actions = actions || {};
	this.options = options || {};
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
	var action = router.resolve(args);

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
