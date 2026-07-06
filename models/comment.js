const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    body:{
        type:String,
        required:true
    },

    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }

},{timestamps:true});

module.exports=mongoose.model("Comment",commentSchema);