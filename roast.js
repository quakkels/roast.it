var Roast = function Roast(consoleObject, teamcityReporter) {
    this.tests = [];
    this.hasFailingTests = false;

    this.testedCount = 0;
    this.testedPassCount = 0;
    this.testedFailCount = 0;
    this.testedStartTime = Date.now();

    this.console = consoleObject;

    if (teamcityReporter.isEnabled() === true) {
        this.reportStartTest = teamcityReporter.reportStartTest.bind(teamcityReporter);
        this.reportFailTest = teamcityReporter.reportFailTest.bind(teamcityReporter);
        this.reportStopTest = teamcityReporter.reportStopTest.bind(teamcityReporter);
    }
};

Roast.prototype.it = function it(description, testFunction) {
    this.tests.push({
        description : description,
        testFunction : testFunction
    });
};

Roast.prototype.run = function run() {
    this.tests.forEach(function runTest(test) {
        this.reportStartTest(test.description);

        var result = test.testFunction();

        if (result !== true) {
            this.hasFailingTests = true;
            this.testedFailCount++;

            this.reportFailTest(test.description);
        } else {
            this.testedPassCount++;
        }

        this.reportStopTest(test.description);

        this.testedCount++;
    }, this);

    this.console.log("Roasted " + this.testedCount + " tests.");
    this.console.log("SUMMARY Total: " + this.testedCount + ", Passed: " + this.testedPassCount +
        ", Failed: " + this.testedFailCount + ", Time: " + (Date.now() - this.testedStartTime) / 1000 + "s");
};

Roast.prototype.exit = function exit() {
    if (this.hasFailingTests) {
        process.exit(1);
    }

    process.exit(0);
};

Roast.prototype.reportStartTest = function reportStartTest() {};

Roast.prototype.reportStopTest = function reportStopTest() {};

Roast.prototype.reportFailTest = function reportFailTest(description) {
    this.console.error("Failed: [" + description + "]");
};

module.exports = Roast;
