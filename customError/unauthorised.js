const customError = require("./CustomError")
const {StatusCodes} = require("http-status-codes")

class Unauthorized extends customError {
    constructor(msg){
        super(msg)
        this.status = StatusCodes.UNAUTHORIZED

    }
}

module.exports = Unauthorized