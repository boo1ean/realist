var RequiredArgument = function(name) {
	this.required = true;
	this.name = name;
};

RequiredArgument.match = function(arg) {
	return arg.match(/^\<.+\>$/);
};

var OptionalArgument = function(name) {
	this.required = false;
	this.name = name;
};

OptionalArgument.match = function(arg) {
	return arg.match(/^\[.+\]$/);
};

var sanitizeArgument = function(arg) {
	return arg.slice(1, -1);
};

var utils = {
	parseRoute: function(route) {
		var args = route.split(' ');
		var result = [];

		for (var i in args) {
			var arg = args[i];

			if (RequiredArgument.match(arg)) {
				arg = new RequiredArgument(sanitizeArgument(arg));
			} else if (OptionalArgument.match(arg)) {
				arg = new OptionalArgument(sanitizeArgument(arg));
			}

			result.push(arg);
		}

		return result;
	},

	parseRoutes: function(routes) {
		return routes.map(utils.parseRoute);
	},

	routesSchema: function(routes) {
		var parsed = utils.parseRoutes(routes);
		var schema = {};

		for (var i in routes) {
			schema[routes[i]] = parsed[i];
		}

		return schema;
	},

	encodeRoute: function(route) {
		return route.map(function(arg) {
			switch (true) {
				case arg.required:
					return '<' + arg.name + '>';

				case !!arg.name:
					return '[' + arg.name + ']';

				default:
					return arg;
			}
		}).join(' ');
	}
};

module.exports = utils;
