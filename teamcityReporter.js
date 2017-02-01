var TeamcityReporter = function TeamcityReporter(consoleObject, argv) {
    this.isEnabledCache = null;
    this.startTestTime = null;

    this.hasTestStarted = false;
    this.hasTestFinished = false;

    this.console = consoleObject;
    this.argv = argv;
};

TeamcityReporter.prototype.isEnabled = function isEnabled() {
    if (this.isEnabledCache !== null) {
        return this.isEnabledCache;
    }

    for (var i = 0; i < this.argv.length; i++) {
        if (this.argv[i] === '--teamcity') {
            this.isEnabledCache = true;
            return this.isEnabledCache;
        }
    }

    this.isEnabledCache = false;
    return this.isEnabledCache;
};

TeamcityReporter.prototype.reportStartTest = function reportStartTest(testName) {
    if (this.hasTestStarted === true) {
        return;
    }

    this.startTestTime = Date.now();

    this.console.log('##teamcity[testStarted name=\'' + testName + '\']');

    this.hasTestFinished = false;
    this.hasTestStarted = true;
};

TeamcityReporter.prototype.reportStopTest = function reportStopTest(testName) {
    if (this.hasTestFinished === true || this.hasTestStarted === false) {
        return;
    }

    this.console.log('##teamcity[testFinished name=\'' + testName +
        '\' duration=\'' + (Date.now() - this.startTestTime) + '\']');

    this.hasTestStarted = false;
    this.hasTestFinished = true;
};

TeamcityReporter.prototype.reportFailTest = function reportFailedTest(testName) {
    if (this.hasTestFinished === true || this.hasTestStarted === false) {
        return;
    }

    this.console.log('##teamcity[testFailed name=\'' + testName + '\']');
};

module.exports = TeamcityReporter;
