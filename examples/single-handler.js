#!/usr/bin/env node
var realist = require('../');

realist(function(opt, arg1, arg2) {
	console.log(opt, arg1, arg2);
});
