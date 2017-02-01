var roast = require("../roast.it.js");

var TeamcityReporter = require('../teamcityReporter');
var ConsoleFake = require('./fakes/consoleFake.js');

roast.it('Enable with flag', function enableWithFlag() {
    var reporter = new TeamcityReporter(null, ['', '--teamcity']);

    var isEnabled = reporter.isEnabled();

    return isEnabled === true;
});

roast.it('Enable with flag and set cache', function enableWithFlagSetCache() {
    var reporter = new TeamcityReporter(null, ['', '--teamcity']);

    reporter.isEnabled();

    return reporter.isEnabledCache === true;
});

roast.it('Disable when missing flag', function disableWhenNoFlag() {
    var reporter = new TeamcityReporter(null, ['', '']);

    var isEnabled = reporter.isEnabled();

    return isEnabled === false;
});

roast.it('Disable when missing flag and set cache', function disableWhenNoFlagSetCache() {
    var reporter = new TeamcityReporter(null, ['', '']);

    reporter.isEnabled();

    return reporter.isEnabledCache === false;
});

roast.it('Start test and set the start time', function startTestSetTime() {
    var console = new ConsoleFake();
    var reporter = new TeamcityReporter(console);

    reporter.reportStartTest('');

    return reporter.startTestTime !== null;
});

roast.it('Start test and set test started', function startSetStarted() {
    var console = new ConsoleFake();
    var reporter = new TeamcityReporter(console);

    reporter.reportStartTest('');

    return reporter.hasTestStarted === true && reporter.hasTestFinished === false;
});

roast.it('Start test and report test name', function startTestReportName() {
    var console = new ConsoleFake();
    var reporter = new TeamcityReporter(console);

    reporter.reportStartTest('test name');

    return console.hasCalledLogWith.indexOf('test name') > 0;
});

roast.it('Do not start test when test has started', function doNotStartWhenStarted() {
    var console = new ConsoleFake();
    var reporter = new TeamcityReporter(console);
    reporter.hasTestStarted = true;

    reporter.reportStartTest('');

    return reporter.hasTestStarted === true && console.hasCalledLog === false;
});

roast.it('Stop test and set test stopped', function stopTestSetStop() {
    var console = new ConsoleFake();
    var reporter = new TeamcityReporter(console);
    reporter.hasTestStarted = true;

    reporter.reportStopTest('');

    return reporter.hasTestStarted === false && reporter.hasTestFinished === true;
});

roast.it('Stop test and report test name', function stopTestReportName() {
    var console = new ConsoleFake();
    var reporter = new TeamcityReporter(console);

    reporter.hasTestStarted = true;
    reporter.startTestTime = Date.now();

    reporter.reportStopTest('test name');

    return console.hasCalledLogWith.indexOf('test name') > 0;
});

roast.it('Do not stop test when test has not started', function doNotStopWhenNotStarted() {
    var console = new ConsoleFake();
    var reporter = new TeamcityReporter(console);
    reporter.hasTestFinished = true;

    reporter.reportStopTest('');

    return reporter.hasTestFinished === true && console.hasCalledLog === false;
});

roast.it('Fail test when test has started', function failTestWhenTestStarted() {
    var console = new ConsoleFake();
    var reporter = new TeamcityReporter(console);
    reporter.hasTestStarted = true;

    reporter.reportFailTest('');

    return reporter.hasTestFinished === false && console.hasCalledLog === true;
});

roast.it('Fail test and report test name', function stopTestReportName() {
    var console = new ConsoleFake();
    var reporter = new TeamcityReporter(console);
    reporter.hasTestStarted = true;

    reporter.reportFailTest('test name');

    return console.hasCalledLogWith.indexOf('test name') > 0;
});

roast.it('Do not fail test when test has finished', function doNotFailTestWhenFinished() {
    var console = new ConsoleFake();
    var reporter = new TeamcityReporter(console);
    reporter.hasTestFinished = true;

    reporter.reportFailTest('');

    return reporter.hasTestStarted === false && console.hasCalledLog === false;
});
