var Roast = function Roast(consoleObject, teamcityReporter) {
    this.tests = [];
    this.hasFailingTests = false;

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
    var testedCount = 0;
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
            this.hasFailingTests = !result;
        }

        if (this.teamcityReporter.isEnabled() === true) {
            this.teamcityReporter.reportStopTest(test.description);
        }

        testedCount++;
    }, this);

    this.console.log("Roasted " + testedCount + " tests.");
};

Roast.prototype.exit = function exit() {
    if (this.hasFailingTests) {
        process.exit(1);
    }

    process.exit(0);
};

module.exports = Roast;
