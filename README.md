Karma Include RAW JS file
=========================

Karma Include RAW JS file preprocessor plugin.

## Installation
Add ```karma-include-jsraw``` to devDependencies of ```package.json```

```bash
npm install karma-include-jsraw --save-dev
```

Add as a plugin to karma config.

```js
module.exports = 
//...
basePath: 'basePath', //this path is used for locate included scripts
frameworks: ['include-rawjs', 'jasmine'...],
//...
plugins: [
require('include-rawjs')
//... other plugins
]
```

## Usage

Add 
```js
/// <include path="path_to_file.js" />
```
Path is relative to karma *basePath*.
