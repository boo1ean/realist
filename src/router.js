var utils = require('./route-utils');

var Router = function(schema) {
	this.schema = schema || {};
	this.routes = utils.routesSchema(Object.keys(this.schema));
	this.candidates = [];
};

Router.prototype.resolve = function(args) {
	args = args || [];
	this.candidates = [];

	for (var i in this.routes) {
		var resolved = this.match(this.routes[i], args);

		if (resolved !== false) {
			return {
				args: resolved,
				handler: this.schema[i]
			};
		}
	}

	if (this.candidates.length) {
		throw this.candidates;
	}

	return false;
};

Router.prototype.match = function(route, args) {
	var result = [];

	for (var i in route) {
		var arg = route[i];

		if (typeof arg === 'string') {

			if (arg !== args[i]) {
				return false;
			}

		} else if (arg.required && !args[i]) {

			this.candidates.push(route);
			return false

		} else if (typeof args[i] !== undefined) {

			result.push(args[i]);

		}
	}

	return result;
}

module.exports = Router;
