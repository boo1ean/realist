## Command line realist [![Build Status](https://travis-ci.org/boo1ean/realist.png?branch=master)](https://travis-ci.org/boo1ean/realist)

[minimist](https://github.com/substack/minimist) based cli app "framework"

## Installation

    $ npm install realist

## Examples

### Commands schema

```javascript
var commands = {
	// Required argument
	'commit <target>': function(opt, target) { console.log(arguments); },

	// Optional argument
	'push [remote]': function(opt, remote) { console.log(arguments); },

	// Required + optional arguments
	'reset <target> [revision]': function(opt, target, revision) { console.log(arguments); }
};

realist(commands);
```

Usage:

```
node commands-schema.js
Usage:
	commit <target>
	push [remote]
	reset <target> [revision]
```

```
node commands-schema.js commit model
{ '0': {}, '1': 'model' }
```

```
node commands-schema.js commit model --force
{ '0': { force: true }, '1': 'model' }
```

```
node commands-schema.js commit
Missing required argument.
Usage: commands-schema.js commit <target>
```

```
node commands-schema.js push origin
{ '0': {}, '1': 'origin' }
```

```
node commands-schema.js push
{ '0': {} }
```

```
node commands-schema.js reset model HEAD~2
{ '0': {}, '1': 'model', '2': 'HEAD~2' }
```

```
node commands-schema.js reset model -i
{ '0': { i: true }, '1': 'model' }
```

```
node commands-schema.js reset --force
Missing required argument.
Usage: commands-schema.js reset <target> [revision]
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

Usage:

```
node options-schema.js
Usage:
	show [option-name]

Options:
	force -f --force
	ignore -i --ig --ignore
	silent -s --silent
```

```
node options-schema.js show -f -s -i
{ force: true, silent: true, ignore: true }
```

```
node options-schema.js show silent -f -s -i
true
```

```
node options-schema.js show force --force 'yes really force'
yes really force
```

```
node options-schema.js show -fsi
{ force: true, silent: true, ignore: true }
```

```
node options-schema.js show --force --ig --silent
{ force: true, ignore: true, silent: true }
```

### Single handler

```javascript
var realist = require('realist');

realist(function(opt, arg1, arg2) {
	console.log(arguments);
});
```

Usage:

```
node single-handler.js --title hey
{ '0': { title: 'hey' } }
```

```
node single-handler.js arg1 arg2 -s --name johny
{ '0': { s: true, name: 'johny' }, '1': 'arg1', '2': 'arg2' }
```

```
node single-handler.js arg1 arg2 -fiva          
{ '0': { f: true, i: true, v: true, a: true },
  '1': 'arg1',
  '2': 'arg2' }
```

```
node single-handler.js destroy --reason 'because wow'
{ '0': { reason: 'because wow' }, '1': 'destroy' }
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
