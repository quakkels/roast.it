"use strict";
var roast = require("../roast.it.js");

var TestRoast = require('../roast.js');
var ConsoleFake = require('./fakes/consoleFake.js');
var TeamcityReporterFake = require('./fakes/teamcityReporterFake');

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
        testRoast.it('hello', function test() { return; });

        // assert
        return 1 === testRoast.tests.length;
    }
);

roast.it(
    "Can run tests",
    function canRunTests() {
        // arrange
        var testRoast = new TestRoast(new ConsoleFake(), new TeamcityReporterFake());
        testRoast.tests = getRoastFakeTests();

        // act
        testRoast.run();

        // assert
        return false === testRoast.hasFailingTests;
    }
);

roast.it(
    "Can fail tests",
    function canRunTests() {
        // arrange
        var consoleFake = new ConsoleFake();
        var testRoast = new TestRoast(consoleFake, new TeamcityReporterFake());
        testRoast.tests = getRoastFakeTests();
        testRoast.tests[0].testFunction = function failTest() { return false; };

        // act
        testRoast.run();

        // assert
        return true === testRoast.hasFailingTests && consoleFake.hasCalledError === true;
    }
);

roast.it(
    "Can fail tests and report with default",
    function canRunTests() {
        // arrange
        var consoleFake = new ConsoleFake();
        var testRoast = new TestRoast(consoleFake, new TeamcityReporterFake());
        testRoast.tests = getRoastFakeTests();
        testRoast.tests[0].testFunction = function failTest() { return false; };

        // act
        testRoast.run();

        // assert
        return true === testRoast.hasFailingTests && consoleFake.hasCalledErrorWith.indexOf('Description') > 0;
    }
);

roast.it(
    'Teamcity report when enabled with passing tests', function teamcityReportEnabledPassingTests() {
        // arrange
        var teamcity = new TeamcityReporterFake();
        teamcity.isEnabledCache = true;

        var testRoast = new TestRoast(new ConsoleFake(), teamcity);
        testRoast.tests = getRoastFakeTests();

        // act
        testRoast.run();

        // assert
        return teamcity.hasCalledReportStartTest === true &&
            teamcity.hasCalledReportStopTest === true &&
            teamcity.hasCalledReportFailTest === false;
    }
);

roast.it(
    'Teamcity report when enabled with failing tests', function teamcityReportEnabledFailingTests() {
        // arrange
        var teamcity = new TeamcityReporterFake();
        teamcity.isEnabledCache = true;

        var testRoast = new TestRoast(new ConsoleFake(), teamcity);
        testRoast.tests = getRoastFakeTests();
        testRoast.tests[0].testFunction = function failTest() { return false; };

        // act
        testRoast.run();

        // assert
        return teamcity.hasCalledReportStartTest === true &&
            teamcity.hasCalledReportStopTest === true &&
            teamcity.hasCalledReportFailTest === true;
    }
);

roast.it(
    'Teamcity report failing tests suppress default message', function teamcityReportTestsSuppress() {
        // arrange
        var consoleFake = new ConsoleFake();
        var teamcity = new TeamcityReporterFake();
        teamcity.isEnabledCache = true;

        var testRoast = new TestRoast(consoleFake, teamcity);
        testRoast.tests = getRoastFakeTests();
        testRoast.tests[0].testFunction = function failTest() { return false; };

        // act
        testRoast.run();

        // assert
        return teamcity.hasCalledReportStartTest === true &&
            teamcity.hasCalledReportStopTest === true &&
            teamcity.hasCalledReportFailTest === true &&
            consoleFake.hasCalledError === false;
    }
);

roast.it(
    'Teamcity report when disabled with failing tests', function teamcityReportDisabledFailingTests() {
        // arrange
        var teamcity = new TeamcityReporterFake();

        var testRoast = new TestRoast(new ConsoleFake(), teamcity);
        testRoast.tests = getRoastFakeTests();
        testRoast.tests[0].testFunction = function failTest() { return false; };

        // act
        testRoast.run();

        // assert
        return teamcity.hasCalledReportStartTest === false &&
            teamcity.hasCalledReportStopTest === false &&
            teamcity.hasCalledReportFailTest === false;
    }
);

roast.it(
    'Teamcity report with test name with passing tests', function teamcityReportNamePassingTests() {
        // arrange
        var teamcity = new TeamcityReporterFake();
        teamcity.isEnabledCache = true;

        var testRoast = new TestRoast(new ConsoleFake(), teamcity);
        testRoast.tests = getRoastFakeTests();

        // act
        testRoast.run();

        // assert
        return teamcity.hasCalledReportStartTestWith.indexOf('Description') === 0 &&
            teamcity.hasCalledReportStopTestWith.indexOf('Description') === 0 &&
            teamcity.hasCalledReportFailTestWith === null;
    }
);

roast.it(
    'Teamcity report with test name with failing tests', function teamcityReportNameFailingTests() {
        // arrange
        var teamcity = new TeamcityReporterFake();
        teamcity.isEnabledCache = true;

        var testRoast = new TestRoast(new ConsoleFake(), teamcity);
        testRoast.tests = getRoastFakeTests();
        testRoast.tests[0].testFunction = function failTest() { return false; };

        // act
        testRoast.run();

        // assert
        return teamcity.hasCalledReportStartTestWith.indexOf('Description') === 0 &&
            teamcity.hasCalledReportStopTestWith.indexOf('Description') === 0 &&
            teamcity.hasCalledReportFailTestWith.indexOf('Description') === 0;
    }
);

function getRoastFakeTests() {
    return [{
        description: 'Description',
        testFunction: function passTest() { return true; }
    }];
}
