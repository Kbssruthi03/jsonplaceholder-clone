const Comment=require("../models/Comment");

const createComment=async(req,res)=>{
    const comment=await Comment.create(req.body);
    res.json(comment);
}

const getComments=async(req,res)=>{
    const comments=await Comment.find();
    res.json(comments);
}

const updateComment=async(req,res)=>{
    const comment=await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(comment);
}

const deleteComment=async(req,res)=>{
    await Comment.findByIdAndDelete(req.params.id);
    res.json({message:"Comment Deleted"});
}

module.exports={
    createComment,
    getComments,
    updateComment,
    deleteComment
}