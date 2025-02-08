const mongoose=require('mongoose')

const eventSchema=new mongoose.Schema({
    eventName:{
        type:String,
        required:true,
        unique:true
    },
    eventDesc:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "users"}

},{
    timestamps:true
})
const eventModel=mongoose.model("events",eventSchema)
module.exports={eventModel}