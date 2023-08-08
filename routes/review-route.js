const express = require("express")
const router = express.Router()
const  {authenticateUser,authorizeUser} = require("../middleware/auth-middleware")

const {
    createReview,
    getAllReview,
    getSingleReview,
    updateReview,
    deleteReview
} = require("../controller/review-controller")

router.route("/")
    .get(getAllReview)
    .post(authenticateUser,createReview)

router.route("/:id")
    .get(authenticateUser,getSingleReview)
    .patch(authenticateUser,updateReview)
    .delete(authenticateUser,deleteReview)

module.exports = router