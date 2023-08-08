const {Unauthorized} = require("../customError/")

const checkPermissioins = (currentUser,requestedUser) => {
    if (currentUser.userRole === "admin") return;
    if (currentUser.userID == requestedUser._id.toString()) return;
    
    throw new Unauthorized("you are not allowed to access this page")
}

module.exports = checkPermissioins