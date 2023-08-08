const express = require("express")
const  {authenticateUser,authorizeUser} = require("../middleware/auth-middleware")
const router = express.Router()

const {

    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage

} = require("../controller/product-controller")

router.route("/")
.post(authenticateUser,authorizeUser({roles:"admin"}),createProduct)
.get(getAllProducts)

router.route("/uploadImage").post(authenticateUser,authorizeUser({roles:"admin"}),uploadImage)

router.route("/:id")
.get(getSingleProduct)
.patch(authenticateUser,authorizeUser({roles:"admin"}),updateProduct)
.delete(authenticateUser,authorizeUser({roles:"admin"}),deleteProduct)

module.exports = router


