"use strict";
var roast = require('../roast.it.js');

require('./roast.tests.js');
require('./teamcityReporterTests');

roast.run();
roast.exit();
