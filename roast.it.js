var Roast = function Roast(tests) {
    this.tests = [];
    this.hasFailingTests = false;
    if (Array.isArray(tests)) {
        this.tests = tests;
    }
};

Roast.prototype.it = function it(description, testFunction) {
    this.tests.push({
        "description" : description,
        "testFunction" : testFunction
    });
};

Roast.prototype.run = function run() {
    this.tests.forEach(function runTest(test) {
        var result = test.testFunction();
        if (result !== true) {
            this.hasFailingTests = true;
            console.error("Failed: [" + test.description + "]");
        }
    }, this);
};

Roast.prototype.exit = function exit() {
    if (this.hasFailingTests) {
        process.exit(1);
    }

    process.exit(0);
};

module.exports = Roast;