var Roast = function Roast(consoleObject) {
    this.tests = [];
    this.hasFailingTests = false;
    this.console = consoleObject || console;
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
        var result = test.testFunction();
        if (result !== true) {
            this.hasFailingTests = true;
            this.console.error("Failed: [" + test.description + "]");
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