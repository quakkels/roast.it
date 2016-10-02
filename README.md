# Roast
A simple Javascript unit testing library designed for providing a fast 
feedback loop with minimal fuss.

## Making a test

Tests are added using the `roast.it()` function.

### my.tests.js:
```
var roast = require('../roast.it.js');

Roast.it(
    "Description of the test",
    function testFunction() {
        // your testing code
        // return true or false based on whether the test passed
        return true;
    }
);
```

Then, create a Javascript file that will run all your tests.

### tests.js:
```
var roast = require('../roast.it.js');

// include all test files
require('./my.tests.js');

roast.run();
roast.exit();
```
