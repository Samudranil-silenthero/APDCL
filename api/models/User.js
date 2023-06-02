const mongoose=require("mongoose")
const UserSchema= new mongoose.Schema({
        username:{
            type:String,
            required:[true,"Please enter an username"],
            unique:true
        },
        email:{
            type:String,
            required:[true,"Please enter an email"],
            unique:true
        },
        password:{
            type:String,
            required:[true,"Please enter a password"],
            unique:true
        }
    },
    {timestamps:true}
);

module.exports= mongoose.model("User",UserSchema)