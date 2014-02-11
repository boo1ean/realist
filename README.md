## WARNING: MODULE IS UNDER CONSTRUCTION

## Command line realist [![Build Status](https://travis-ci.org/boo1ean/realist.png?branch=master)](https://travis-ci.org/boo1ean/realist)

## Installation

    $ npm install realist

## Usage

Example app:

```javascript
var Realist = require('../');

var options = {
	whoop: ['w', 'whoop'],
	silent: ['s', 'si', 'silent'],
	email: ['e', 'email']
};

var actions = {
	'hello <first> [last]': function(opt, first, last) {
		console.log(arguments);
	}
};

new Realist(options, actions).run();
```

Output example:

```javascript
node app.js hello Harry Potter -w 
{
	'0': { whoop: true },
	'1': 'Harry',
	'2': 'Potter'
}

node app.js hello Harry --silent --whoop
{
	'0': { silent: true, whoop: true }
	'1': 'Harry'
}

node app.js hello Harry -ws --email harry@potter.com
{
	'0': { whoop: true, silent: true, email: 'harry@potter.com' },
	'1': 'Harry'
}

node app.js hello Harry
{
	'0': {},
	'1': 'Harry'
}

// Don't pass required param
node app.js hello
Command not found: hello
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
