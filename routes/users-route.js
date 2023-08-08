const express = require("express")
const router = express.Router()
const {authenticateUser,authorizeUser} = require("../middleware/auth-middleware")

const { getAllUser, getSingleUser,updateUser,updateUserPassword,showCurrentUser } = require("../controller/user-controller")

router.route("/getAllUser").get(authenticateUser,authorizeUser({roles:['admin']}),getAllUser)
router.route("/me").get(authenticateUser,showCurrentUser)
router.route("/getSingleUser/:id").get(authenticateUser,getSingleUser)
router.route("/updateUser").patch(authenticateUser,updateUser)
router.route("/updateUserPassword").patch(authenticateUser,updateUserPassword)

module.exports = router

