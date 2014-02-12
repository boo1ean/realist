var Realist = require('./app');

module.exports = function(actions, options, triggers) {
	return new Realist(actions, options, triggers).run();
};
