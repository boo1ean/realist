var _ = {
	omit: function(obj, prop) {
		var result = {};

		for (var i in obj) {
			if (i === prop) {
				continue;
			}

			result[i] = obj[i];
		}

		return result;
	},

	defaults: function(defs, obj) {
		for (var i in defs) {
			if (!obj[i]) {
				obj[i] = defs[i];
			}
		}

		return obj;
	},

	extend: function(a, b) {
		for (var i in b) {
			a[i] = b[i];
		}

		return a;
	}
};

module.exports = _;
