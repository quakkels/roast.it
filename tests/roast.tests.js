var roast = require("../roast.it.js");

var TestRoast = require('../roast.js');
var consoleFake = require('./fakes/consoleFake.js');

roast.it(
    "Has no tests to start",
    function canAddATest() {
        // arrange
        var testRoast = new TestRoast();

        // assert
        return 0 === testRoast.tests.length;
    }
);

roast.it(
    "Can add a test",
    function canAddATest() {
        // arrange
        var testRoast = new TestRoast();

        // act
        testRoast.it('hello', function(){return;});

        // assert
        return 1 === testRoast.tests.length;
    }
);

roast.it(
    "Can run tests",
    function canRunTests() {
        // arrange
        var testRoast = new TestRoast(consoleFake);
        testRoast.tests = [{
            description:"description",
            testFunction:function(){return true;}
        }];

        // act
        var result = testRoast.run();

        // assert
        return false === testRoast.hasFailingTests;
    }
);