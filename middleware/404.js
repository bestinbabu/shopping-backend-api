const {StatusCodes} = require("http-status-codes")

const NotFound = async (req,res) => {
    res.status(StatusCodes.NOT_FOUND).json({msg:"route dosent exist"})
}

module.exports = NotFound