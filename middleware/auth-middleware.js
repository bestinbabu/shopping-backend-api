const {Unauthenticated,BadRequest,Unauthorized} = require("../customError")
const {checkToken} = require("../utils")

const authenticateUser = async (req,res,next) => {

    const token = req.cookies.tokenCookie
    const validToken  = await checkToken({token})
    if (!validToken) {
        throw new Unauthenticated("unauthenticated")
    }
    req.user = {userID:validToken.userID,username:validToken.username,userRole:validToken.userRole}
    next();
}

const authorizeUser = ({roles}) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.userRole)) {
            throw new Unauthorized("not ok allowed")
        }
        next();
    }
}





module.exports = {
    authenticateUser,
    authorizeUser
}