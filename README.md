# Roast
A simple Javascript unit testing library designed for providing a fast 
feedback loop with minimal fuss.


## Install

`npm install roast.it`

## Make a test

Tests are added using the `roast.it()` function.

### tests/my.tests.js:
```
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

Then, create a Javascript file that will run all your tests.

### tests/tests.js:
```
var roast = require('roast.it');

// include all test files
require('./my.tests.js');

roast.run();
roast.exit();
```

Add this `tests.js` file to your `package.json`'s `scripts` section.

### package.json:
```
  "scripts": {
    "test": "node tests/tests.js"
  },
```

Then test using NPM:
```
> npm test
```
Which shows this in the terminal:
```
> node tests/tests.js                                                                                                                                                  
                                                                                                                                                                       
Roasted 1 tests.
```
