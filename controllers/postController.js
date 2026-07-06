const Post = require("../models/Post");


// Create Post

const createPost = async(req,res)=>{

    try{

        const post = await Post.create(req.body);

        res.json(post);

    }

    catch(err){

        res.json(err);

    }

};


// Get All Posts

const getPosts = async(req,res)=>{

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;

    let skip = (page-1)*limit;

    const posts = await Post.find()
    .skip(skip)
    .limit(limit);

    res.json(posts);

};


// Get Single Post

const getPost = async(req,res)=>{

    const post = await Post.findById(req.params.id);

    res.json(post);

};


// Update

const updatePost = async(req,res)=>{

    const post = await Post.findByIdAndUpdate(

        req.params.id,
        req.body,
        {new:true}

    );

    res.json(post);

};


// Delete

const deletePost = async(req,res)=>{

    await Post.findByIdAndDelete(req.params.id);

    res.json({

        message:"Post Deleted"

    });

};


// Search

const searchPost = async (req, res) => {

    const { title, userId } = req.query;

    let query = {};

    if(title){
        query.title = { $regex: title, $options: "i" };
    }

    if(userId){
        query.userId = userId;
    }

    const posts = await Post.find(query);

    res.json(posts);
}


module.exports={

createPost,
getPosts,
getPost,
updatePost,
deletePost,
searchPost

}