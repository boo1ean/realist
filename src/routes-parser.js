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

var router = {
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
		return routes.map(router.parseRoute);
	}
};

module.exports = router;
