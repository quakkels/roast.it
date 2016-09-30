var Roast = require('../roast.it.js')

var tests = [];
var messages = [];

var assert = function assert(expected, actual, reason) {
    if (expected === actual) {
        return { isPassing: true };
    } else {
        return { isPassing:false, reason: reason };
    }
};

// add tests
////////////

tests.push({
    description: "Has no tests to start",
    test: function canAddATest() {
        // arrange
        var roast = new Roast();

        // assert
        return assert(0, roast.tests.length, "A test exists when it shouldn't.");
    }
})

tests.push({
    description: "Can add a test",
    test: function canAddATest() {
        // arrange
        var roast = new Roast();

        // act
        roast.it('hello', function(){return;});

        // assert
        return assert(1, roast.tests.length, "Test wasn't added.");
    }
})

// run tests
////////////

for(var i = 0; i < tests.length; i++) {
    var result = tests[i].test();

    if (result.isPassing === false) {
        messages.push({
            description: tests[i].description,
            reason: result.reason
        });
    }
}

// report failures
//////////////////

for(var i = 0; i < messages.length; i++) {
    console.log(
        messages[i].description + '\n\t' +
        messages[i].reason)
}

if (messages.length > 0) {
    process.exit(1);
}