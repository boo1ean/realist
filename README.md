## WARNING: MODULE IS UNDER CONSTRUCTION

## Command line realist [![Build Status](https://travis-ci.org/boo1ean/realist.png?branch=master)](https://travis-ci.org/boo1ean/realist)

## Installation

    $ npm install realist

## Examples

### Single handler

```javascript
var realist = require('realist');

realist(function(opt, arg1, arg2) {
	console.log(arguments);
});
```

Usage:

```
node single-handler.js 
{ '0': {} }

node single-handler.js -s --name johny
{ '0': { s: true, name: 'johny' } }

node single-handler.js arg1 arg2 -s --name johny
{ '0': { s: true, name: 'johny' }, '1': 'arg1', '2': 'arg2' }

node single-handler.js arg1 arg2 -fiva          
{ '0': { f: true, i: true, v: true, a: true },
  '1': 'arg1',
  '2': 'arg2' }

node single-handler.js destroy --reason 'because wow'
{ '0': { reason: 'because wow' }, '1': 'destroy' }
```

### Commands schema

```javascript
var commands = {
	// Required argument
	'commit <target>': function(opt, target) {},

	// Optional argument
	'push [remote]': function(opt, remote) {},

	// Required + optional arguments
	'reset <target> [revision]': function(opt, target, revision) {},
};

realist(commands);
```

### Options schema

```javascript
var options = {
	'force': ['f', 'force'],
	'ignore': ['i', 'ig', 'ignore'],
	'silent': ['s', 'silent']
}

var commands = {
	// Show options, if name is given -> dump single option
	'show [option-name]': function(opt, name) {
		if (name) {
			console.log(opt[name]);
		} else {
			console.log(opt);
		}
	}
};

realist(commands, options);
```

# License

The MIT License (MIT)
Copyright (c) 2014 Egor Gumenyuk <boo1ean0807@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
