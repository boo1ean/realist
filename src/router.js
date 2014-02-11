var utils = require('./route-utils');

var Router = function(schema) {
	this.schema = schema || {};
	this.routes = utils.routesSchema(Object.keys(this.schema));
};

Router.prototype.resolve = function(args) {
	args = args || [];

	for (var i in this.routes) {
		var resolved = utils.matchRoute(this.routes[i], args);

		if (resolved !== false) {
			return {
				args: resolved,
				handler: this.schema[i]
			};
		}
	}

	return false;
};

module.exports = Router;
