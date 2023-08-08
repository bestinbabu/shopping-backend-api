const mongoose  = require("mongoose")
const bycrypt = require("bcryptjs")
const valid = require("validator")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        validate:{
            validator: valid.isEmail,
            message:"enter a valid email"
        },
        unique:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

userSchema.pre("save",async function () {
    const salt = await bycrypt.genSalt(10)
    this.password = await bycrypt.hash(this.password,salt)
})

userSchema.methods.comparePassword = async function (userPassword) {
    return await bycrypt.compare(userPassword,this.password)
    
}

const user = mongoose.model("Users",userSchema)

module.exports = user