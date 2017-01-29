var Roast = require("./roast.js");

var TeamcityReporter = require('./teamcityReporter');
var teamcity = new TeamcityReporter(console, process.argv);

module.exports = new Roast(console, teamcity);
