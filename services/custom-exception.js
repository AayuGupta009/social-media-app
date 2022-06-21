class Exceptions {
    constructor (errorCode, msg, actionCode) {
        this.status = errorCode;
        this.message = msg;
        this.actionCode = actionCode;
    }
}

module.exports = Exceptions;
