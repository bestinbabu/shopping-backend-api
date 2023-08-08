const user = require("../models/user-model")
const {StatusCodes} = require("http-status-codes");
const {BadRequest,Unauthenticated,NotFound}  = require("../customError")
const {sendCookies,token,checkPermissioins} = require("../utils/");


const getAllUser = async (req,res) => {
    const data = await user.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({users:data})

}
const getSingleUser = async (req,res) => {
    const id = req.params.id
    const requestedUser = await user.findById(id).select('-password')
    checkPermissioins(req.user,requestedUser)
    if (!requestedUser) {
        throw new NotFound(`No user with id ${id}`)
    }

    res.status(StatusCodes.OK).json({user:requestedUser})
}

const updateUser = async (req,res) => {
    const {username,email} = req.body
    if (!username || !email) {
        throw new BadRequest("please provide the details")
    }
    const userData = await user.findOneAndUpdate({_id:req.user.userID},{username:username,email:email},{new:true,runValidators:true})
    const userToken = token(userData)
    sendCookies({res,userToken})
    res.status(StatusCodes.OK).json({success:true,data:userToken})
    
}   

const updateUserPassword = async (req,res) => {
    const {oldPassword,newPassword} = req.body
    if (!oldPassword || !newPassword) {
        throw new BadRequest("please provide all the details")
    }
    const User = await user.findOne({_id:req.user.userID})
    const validPassword = await User.comparePassword(oldPassword)
    if (!validPassword) {
        throw new Unauthenticated("old password is incorrect")
    }
    User.password = newPassword
    await User.save()
    res.status(StatusCodes.OK).json({success:true,msg:"password changed successfully"})
}

const showCurrentUser = async (req,res) => {
    res.status(StatusCodes.OK).json({user:req.user.userRole})
}


module.exports = {
    getAllUser,
    getSingleUser,
    updateUser,
    updateUserPassword,
    showCurrentUser
}