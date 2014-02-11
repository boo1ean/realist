var parser = require('../src/routes-parser');

describe('Routes parser', function() {
	describe('parseRoute', function() {
		it('Should find required args', function() {
			var route = 'create <name>';
			var expected = [
				'create',
				{ required: true, name: 'name' }
			];

			parser.parseRoute(route).should.be.eql(expected);

			route = 'create <first> <last>';
			expected = [
				'create',
				{ required: true, name: 'first' },
				{ required: true, name: 'last' }
			];

			parser.parseRoute(route).should.be.eql(expected);
		});

		it('Should find optional args', function() {
			var route = 'create [name]';
			var expected = [
				'create',
				{ required: false, name: 'name' }
			];

			parser.parseRoute(route).should.be.eql(expected);

			route = 'create [first] [last]';
			expected = [
				'create',
				{ required: false, name: 'first' },
				{ required: false, name: 'last' }
			];

			parser.parseRoute(route).should.be.eql(expected);
		});

		it('Should find required and optional args', function() {
			var route = 'create <first> [last]';
			var expected = [
				'create',
				{ required: true, name: 'first' },
				{ required: false, name: 'last' }
			];

			parser.parseRoute(route).should.be.eql(expected);

			var route = 'create <first> <last> [latest]';
			var expected = [
				'create',
				{ required: true, name: 'first' },
				{ required: true, name: 'last' },
				{ required: false, name: 'latest'}
			];

			parser.parseRoute(route).should.be.eql(expected);
		});

		it('Should handle long static routes', function() {
			var route = 'create first last latest';
			var expected = [
				'create',
				'first',
				'last',
				'latest'
			];

			parser.parseRoute(route).should.be.eql(expected);
		});
	});

	describe('parseRoutes', function() {
		it('Should parse collection of routes', function() {
			var routes = [
				'create first last',
				'start <task>',
				'clean [target]',
				'destroy <target> [relations]'
			];

			var expected = [
				['create', 'first', 'last'],
				['start', { required: true, name: 'task' }],
				['clean', { required: false, name: 'target' }],
				['destroy', { required: true, name: 'target' }, { required: false, name: 'relations' }],
			];

			parser.parseRoutes(routes).should.be.eql(expected);
		});
	});
});
