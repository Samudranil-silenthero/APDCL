const mongoose=require("mongoose")
const OtpSchema= new mongoose.Schema({
        email:{
            type:String,
            required:[true,"Please enter an email"],
            unique:true
        },
        otp:{
            type:String
        }
    },
    {timestamps:true}
);
module.exports= mongoose.model("Otp",OtpSchema)