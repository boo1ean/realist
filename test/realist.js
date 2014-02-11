var Realist = require('../');  

describe('Realist', function() {
	var options = {
		path: {
			keys: ['p', 'path'],
			description: 'Path to migrations base directory'
		},

		force: {
			keys: ['f', 'force'],
			description: 'Force down all migrations'
		},

		nosave: {
			keys: ['n', 'nosave'],
			description: 'Do not save migrations data to storage'
		},

		storage: {
			keys: ['s', 'storage'],
			description: 'Use specific migrations storage'
		},

		name: {
			keys: ['good-enough-option']
		},

		sho: ['qwe']
	};

	var actions = {
		'up [steps]': function() {},
		'down [steps]': function() {},
		'refresh': function() {},
		'create <name>': function() {}
	};

	var realist = new Realist(options, actions);

	var givenOptions = {
		'p': 'much path',
		'nosave': true,
		'f': 'good',
		'storage': 'best storage',
		'good-enough-option': 'Johny',
		'qwe': 'www'
	};

	var expectedOptions = {
		'path': 'much path',
		'nosave': true,
		'force': 'good',
		'storage': 'best storage',
		'name': 'Johny',
		'sho': 'www'
	};

	describe('resolveOptions', function() {
		it('Should resolve options according to option map', function() {
			realist.resolveOptions(givenOptions).should.be.eql(expectedOptions);
		});
	});
});
