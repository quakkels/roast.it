var TeamcityReporterFake = function TeamcityReporterFake() {
    this.isEnabledCache = false;

    this.hasCalledReportStartTest = false;
    this.hasCalledReportStopTest = false;
    this.hasCalledReportFailTest = false;

    this.hasCalledReportStartTestWith = null;
    this.hasCalledReportStopTestWith = null;
    this.hasCalledReportFailTestWith = null;
};

TeamcityReporterFake.prototype.isEnabled = function isEnabled() {
    return this.isEnabledCache;
};

TeamcityReporterFake.prototype.reportStartTest = function reportStartTest(testName) {
    this.hasCalledReportStartTest = true;
    this.hasCalledReportStartTestWith = testName;
};

TeamcityReporterFake.prototype.reportStopTest = function reportStopTest(testName) {
    this.hasCalledReportStopTest = true;
    this.hasCalledReportStopTestWith = testName;
};

TeamcityReporterFake.prototype.reportFailTest = function reportFailTest(testName) {
    this.hasCalledReportFailTest = true;
    this.hasCalledReportFailTestWith = testName;
};

module.exports = TeamcityReporterFake;
