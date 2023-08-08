const user = require("../models/user-model")
const {StatusCodes} = require("http-status-codes");
const {BadRequest,Unauthenticated}  = require("../customError")
const {sendCookies,token} = require("../utils/")


const register = async (req,res) => {
    const {username,password,email} = req.body 
    if (!username || !password || ! email) {
        throw new BadRequest("please provide the complete details")
    }

    const checkDupEmail = await user.findOne({email})
    if (checkDupEmail) {
        throw new BadRequest("email already exists")
    }

    const firstAccount = (await user.countDocuments({})) === 0
    const role = firstAccount?"admin":"user"
    const userData = await user.create({username,password,email,role})
    const userToken = token(userData)
    sendCookies({res,userToken})
    res.status(StatusCodes.CREATED).json({data:userToken})

}

const login = async (req,res) => {
    const {email,password} = req.body
    const userData = await user.findOne({email})

    if (!userData || !password) {
        throw new Unauthenticated("incorrect credentials")
    }
    const valid = await userData.comparePassword(password)

    if (!valid) {
        throw new Unauthenticated("invalid password or email")
    }
    const userToken = token(userData)
    sendCookies({res,userToken})
    res.status(StatusCodes.OK).json({msg:"success", data:userToken})

}

const logout = async (req,res) => {
    res.cookie("cookie",token,{
        httpOnly:true,
        expires:new Date(Date.now() + 5),
        secure:false,
        sighned: false,
    })
    res.status(StatusCodes.OK).json({status:"logout sucess"})
}

module.exports = {
    register,
    login,
    logout
}
