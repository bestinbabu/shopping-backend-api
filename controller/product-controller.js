const product = require("../models/product-model")
const {BadRequest, NotFound} = require("../customError")
const {StatusCodes}  = require("http-status-codes")

const createProduct = async(req,res) => {
    req.body.user = req.user.userID
    const data = await product.create(req.body)
    res.status(StatusCodes.OK).json({product:data})
}

const getAllProducts = async(req,res) => {
    const data = await product.find({})
    res.status(StatusCodes.OK).json({data:data,count:data.length})
}

const getSingleProduct = async(req,res) => {
    const {id:productID} = req.params
    const data = await product.findById(productID).populate({path:"reviews"})
    res.status(StatusCodes.OK).json({product:data})
}

const updateProduct = async(req,res) => {
    const {id:productID} = req.params
    const updateData = req.body
    const data = await product.findByIdAndUpdate(productID,updateData,{new:true,runValidators:true})
    res.status(StatusCodes.OK).json({product:data})

}

const deleteProduct = async(req,res) => {
    const {id:productID} = req.params
    const productToDelete = await product.findById(productID)
    if (!productToDelete) {
        throw new NotFound("no product with that id")
    }
    await productToDelete.remove()
    res.status(StatusCodes.OK).json({success:true})
}

const uploadImage = async(req,res) => {
    res.json({data:'upload Image'})
}



module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}