var Realist = require('./app');

module.exports = function(actions, options) {
	return new Realist(actions, options).run();
};
