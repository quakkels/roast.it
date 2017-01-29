var ConsoleFake = function ConsoleFake() {
    this.hasCalledLog = false;
    this.hasCalledError = false;

    this.hasCalledLogWith = null;
    this.hasCalledErrorWith = null;
 };

ConsoleFake.prototype.log = function log(msg) {
    this.hasCalledLog = true;
    this.hasCalledLogWith = msg;
};

ConsoleFake.prototype.error = function error(msg) {
    this.hasCalledError = true;
    this.hasCalledErrorWith = msg;
};

module.exports = ConsoleFake;
