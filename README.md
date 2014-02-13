## Command line realist [![Build Status](https://travis-ci.org/boo1ean/realist.png?branch=master)](https://travis-ci.org/boo1ean/realist)

Micro framework for developing command line apps.

## Installation

    $ npm install realist

## Many examples

### Commands schema

```javascript
var realist = require('realist');

var commands = {
	// Required argument
	'commit <target>': function(opt, target) {
		console.log('commit', opt, target);
	},

	// Optional argument
	'push [remote]': function(opt, remote) {
		console.log('push', opt, remote);
	},

	// Required + optional arguments
	'reset <target> [revision]': function(opt, target, revision) {
		console.log('reset', opt, target, revision);
	},

	// Default command
	'default': function(opt) {
		console.log('I am default command!');
	}
};

realist(commands);
```

Usage:

```
node commands-schema.js
I am default command!
```

```
node commands-schema.js commit model
'commit' {} 'model'
```

```
node commands-schema.js commit model --force
'commit' { force: true } 'model'
```

```
node commands-schema.js commit
Missing required argument.
Usage: commands-schema.js commit <target>
```

```
node commands-schema.js push origin
'push' {} 'origin'
```

```
node commands-schema.js push
'push' {} undefined
```

```
node commands-schema.js reset model HEAD~2
'reset' {} 'model' 'HEAD~2'
```

```
node commands-schema.js reset model -i
'reset' { i: true } 'model' undefined
```

```
node commands-schema.js reset --force
Missing required argument.
Usage: commands-schema.js reset <target> [revision]
```

### Options schema

```javascript
var realist = require('realist');

var options = {
	'force': ['f', 'force'],
	'ignore': ['i', 'ig', 'ignore']
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

Usage:

```
node options-schema.js

WARNING: default command handler is not specified

realist({ 'default': handler });

```

```
node options-schema.js show -f -i
{ force: true, ignore: true }
```

```
node options-schema.js show ignore -f -i
true
```

```
node options-schema.js show force --force 'yes really force'
yes really force
```

```
node options-schema.js show -fi
{ force: true, ignore: true }
```

```
node options-schema.js show --force --ig
{ force: true, ignore: true }
```

### Single handler

```javascript
var realist = require('realist');

realist(function(opt, arg1, arg2) {
	console.log(opt, arg1, arg2);
});
```

Usage:

```
node single-handler.js --title hey
{ title: 'hey' } undefined undefined
```

```
node single-handler.js arg1 arg2 -s --name johny
{ s: true, name: 'johny' } 'arg1' 'arg2'
```

```
node single-handler.js destroy --reason 'because wow'
{ reason: 'because wow' } 'destroy' undefined
```

### Events

There some events triggered on realist app:

`option <option name>` - if <option name> option was specified.

`candidates` - command not found, but there are some candidates.  By default it's handled with missingRequiredArgument handler.

`default` - default command was called.

```javascript
var realist = require('realist');

var handler = function() { 
	console.log('I am handler.');
};

var options = {
	'help': ['h', 'help']
};

var events = {
	'option help': function(app) {
		console.log('halp!');

		// Stop commands execution
		app.stop();
	}
}

realist(handler, options, events);
```

Usage:

```
node events.js
I am handler.
```

```
node events.js --help
halp!
```

```
node events.js -h
halp!
```

## Real world usages

- [mgrt - database migration tool](https://github.com/boo1ean/mgrt/blob/master/bin/mgrt#L63-L129)
- [capo - events management tool](https://github.com/msemenistyi/capo/blob/master/bin/capo_cli.js)

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
