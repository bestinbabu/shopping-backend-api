const jwt = require("jsonwebtoken")
const {StatusCodes} = require("http-status-codes");

const genToken = ({payload}) => {

    return jwt.sign(payload,process.env.JWT_SECRECT,{expiresIn:process.env.JWT_LIFETIME});
}

const checkToken = async ({token}) => {

    return jwt.verify(token,process.env.JWT_SECRECT)
    
}

const sendCookies = ({res,userToken}) => {
    const day = 1000 * 60 * 60 * 24
    const token =  genToken({payload:userToken})
    res.cookie("tokenCookie",token,{
        httpOnly:true,
        expires:new Date(Date.now() + day),
        secure:false,
        sighned: false,
    })
}

module.exports = {
    genToken,
    checkToken,
    sendCookies
}