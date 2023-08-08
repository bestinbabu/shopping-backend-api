const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,"please provide the rating"]
    },
    title:{
        type:String,
        trim:true,
        required:[true,"please provide the title"],
        maxlength:50
    },
    comment:{
        type:String,
        required:[true,"please provide review"],
        maxlength:500
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:true
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref:"product",
        required:true
    },

},{timestamps:true})

reviewSchema.index({user:1,product:1},{unique:true})

reviewSchema.statics.calculateAverageRating = async function(productID) {
    const result = await this.aggregate([
        {$match:{
            product:productID
        }},
        {$group: {
            _id:"$product",
            avgRating:{$avg:"$rating"},
            numOfReviews:{$sum:1}
        }}
    ])
    console.log(result);
    try {
        await this.model('product').findOneAndUpdate({_id:productID},{
            avgRating:result[0]?.avgRating || 0,
            numOfReviews:result[0]?.numOfReviews || 0
        })
    } catch (error) {
        
    }
}

reviewSchema.post('save', async function() {
    await this.constructor.calculateAverageRating(this.product)
})

reviewSchema.post('remove', async function() {
    await this.constructor.calculateAverageRating(this.product)
})

const review = mongoose.model("review",reviewSchema); 
module.exports = review