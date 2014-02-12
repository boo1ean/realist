var Realist = require('../src/app');  

describe('Realist', function() {
	var options = {
		path: ['p', 'path'],
		force: ['f', 'force'],
		nosave: ['n', 'nosave'],
		storage: ['s', 'storage'],
		name: 'good-enough-option',
		sho: 'qwe'
	};

	var actions = {
		'up [steps]': function() {},
		'down [steps]': function() {},
		'refresh': function() {},
		'create <name>': function() {}
	};

	var realist = new Realist(actions, options);

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
		xit('Should resolve options according to option map', function() {
			realist.resolveOptions(givenOptions).should.be.eql(expectedOptions);
		});
	});
});
