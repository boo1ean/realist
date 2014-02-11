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

	it('Should return false if required argument was not given', function() {
		var args = ['create'];
		var expected = false;

		router.resolve(args).should.be.eql(expected);
	});
});
