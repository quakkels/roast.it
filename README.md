# Roast

A simple JavaScript unit testing library designed for providing a fast feedback loop with minimal fuss.

## Install

`npm install roast.it --save`

## Make a test

Tests are added using the `roast.it()` function.

### tests/my.tests.js

```javascript
var roast = require('roast.it');

roast.it(
    "Description of the test",
    function testFunction() {
        // your testing code
        // return true or false based on whether the test passed
        return true;
    }
);
```

Then, create a JavaScript file that will run all your tests.

### tests/tests.js

```javascript
var roast = require('roast.it');

// include all test files
require('./my.tests.js');

roast.run();
roast.exit();
```

Add this `tests.js` file to your `package.json`'s `scripts` section.

### package.json

```json
  "scripts": {
    "test": "node tests/tests.js"
  }
```

Then test using NPM:

```batchfile
> npm test
```

Which shows this in the terminal:

```batchfile
> node tests/tests.js
Roasted 1 tests.
SUMMARY Total: 1, Passed: 1, Failed: 0, Time: 0.001s
```

If you need Teamcity to count the number of tests, then enable Teamcity reporting. This will use Teamcity’s test service messages to let Teamcity know and count the tests.

To enable Teamcity reporting:

```batchfile
> npm test -- --teamcity
```
