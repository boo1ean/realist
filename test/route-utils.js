var utils = require('../src/route-utils');

describe('Routes utils', function() {
	describe('parseRoute', function() {
		it('Should find required args', function() {
			var route = 'create <name>';
			var expected = [
				'create',
				{ required: true, name: 'name' }
			];

			utils.parseRoute(route).should.be.eql(expected);

			route = 'create <first> <last>';
			expected = [
				'create',
				{ required: true, name: 'first' },
				{ required: true, name: 'last' }
			];

			utils.parseRoute(route).should.be.eql(expected);
		});

		it('Should find optional args', function() {
			var route = 'create [name]';
			var expected = [
				'create',
				{ required: false, name: 'name' }
			];

			utils.parseRoute(route).should.be.eql(expected);

			route = 'create [first] [last]';
			expected = [
				'create',
				{ required: false, name: 'first' },
				{ required: false, name: 'last' }
			];

			utils.parseRoute(route).should.be.eql(expected);
		});

		it('Should find required and optional args', function() {
			var route = 'create <first> [last]';
			var expected = [
				'create',
				{ required: true, name: 'first' },
				{ required: false, name: 'last' }
			];

			utils.parseRoute(route).should.be.eql(expected);

			var route = 'create <first> <last> [latest]';
			var expected = [
				'create',
				{ required: true, name: 'first' },
				{ required: true, name: 'last' },
				{ required: false, name: 'latest'}
			];

			utils.parseRoute(route).should.be.eql(expected);
		});

		it('Should handle long static routes', function() {
			var route = 'create first last latest';
			var expected = [
				'create',
				'first',
				'last',
				'latest'
			];

			utils.parseRoute(route).should.be.eql(expected);
		});
	});

	var routes = [
		'create first last',
		'start <task>',
		'clean [target]',
		'destroy <target> [relations]'
	];

	describe('parseRoutes', function() {
		it('Should parse collection of routes', function() {
			var expected = [
				['create', 'first', 'last'],
				['start', { required: true, name: 'task' }],
				['clean', { required: false, name: 'target' }],
				['destroy', { required: true, name: 'target' }, { required: false, name: 'relations' }]
			];

			utils.parseRoutes(routes).should.be.eql(expected);
		});
	});

	describe('routesSchema', function() {
		it('Should create routes schema', function() {
			var expected = {
				'create first last': ['create', 'first', 'last'],
				'start <task>': ['start', { required: true, name: 'task' }],
				'clean [target]': ['clean', { required: false, name: 'target' }],
				'destroy <target> [relations]': ['destroy', { required: true, name: 'target' }, { required: false, name: 'relations' }]
			};

			utils.routesSchema(routes).should.be.eql(expected);
		});
	});
});
