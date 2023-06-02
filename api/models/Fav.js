const mongoose=require("mongoose")
const UserSchema= new mongoose.Schema({
        username:{
            type:String
        },
        cons_no:{
            type:String,
            required:[true,"Please enter a consumer no."]
        }
    },
    {timestamps:true}
);

module.exports= mongoose.model("Fav",UserSchema)