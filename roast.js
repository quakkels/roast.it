var Roast = function Roast(consoleObject, teamcityReporter) {
    this.tests = [];
    this.hasFailingTests = false;

    this.testedCount = 0;
    this.testedPassCount = 0;
    this.testedFailCount = 0;
    this.testedStartTime = Date.now();

    this.console = consoleObject;
    this.teamcityReporter = teamcityReporter;
};

Roast.prototype.it = function it(description, testFunction) {
    this.tests.push({
        description : description,
        testFunction : testFunction
    });
};

Roast.prototype.run = function run() {
    this.tests.forEach(function runTest(test) {
        if (this.teamcityReporter.isEnabled()) {
            this.teamcityReporter.reportStartTest(test.description);
        }

        var result = test.testFunction();

        if (result !== true && this.teamcityReporter.isEnabled() === true) {
            this.teamcityReporter.reportFailTest(test.description);
        }

        if (result !== true && this.teamcityReporter.isEnabled() !== true) {
            this.console.error("Failed: [" + test.description + "]");
        }

        if (result !== true) {
            this.hasFailingTests = true;
            this.testedFailCount++;
        } else {
            this.testedPassCount++;
        }

        if (this.teamcityReporter.isEnabled() === true) {
            this.teamcityReporter.reportStopTest(test.description);
        }

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

module.exports = Roast;
