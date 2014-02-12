var Router = require('../src/router');

describe('Router', function() {

	var routes = {
		'up [steps]': 'up',
		'down [steps]': 'down',
		'refresh': 'refresh',
		'create <name>': 'create'
	};

	var router = new Router(routes);

	it('Should resolve static route', function() {
		var args = ['refresh'];
		var expected = {
			args: [],
			handler: 'refresh'
		};

		router.resolve(args).should.be.eql(expected);
	});

	it('Should resolve route with required arguments', function() {
		var args = ['create', 'file'];
		var expected = {
			args: ['file'],
			handler: 'create'
		};

		router.resolve(args).should.be.eql(expected);
	});

	it('Should resolve routes with optional arguments', function() {
		var args = ['up'];
		var expected = {
			args: [],
			handler: 'up'
		};
		router.resolve(args).should.be.eql(expected);

		args = ['up', 10];
		expected = {
			args: [10],
			handler: 'up'
		};
		router.resolve(args).should.be.eql(expected);

		args = ['down'];
		expected = {
			args: [],
			handler: 'down'
		};
		router.resolve(args).should.be.eql(expected);

		args = ['down', 3];
		expected = {
			args: [3],
			handler: 'down'
		};
		router.resolve(args).should.be.eql(expected);
	});

	describe('match', function() {
		it('Should match static route', function() {
			var expected = [];

			var route = ['create', 'good', 'stuff'];
			var args = ['create', 'good', 'stuff'];

			router.match(route, args).should.be.eql(expected);
		});

		it('Should match route with required argument', function() {
			var expected = ['good'];

			var route = [
				'create',
				{ required: true, name: 'title' }
			];

			var args = ['create', 'good'];

			router.match(route, args).should.be.eql(expected);
		});

		it('Should match route with optional argument', function() {
			var expected = ['good', 'day'];

			var route = [
				'create',
				{ required: false, name: 'title' },
				{ required: false, name: 'target' }
			];

			var args = ['create', 'good', 'day'];

			router.match(route, args).should.be.eql(expected);
		});

		it('Should match route with required and optional arguments', function() {
			var expected = ['day', 'good'];

			var route = [
				'create',
				{ required: true, name: 'target' },
				{ required: false, name: 'title' }
			];

			var args = ['create', 'day', 'good'];

			router.match(route, args).should.be.eql(expected);
		});
	});
});
