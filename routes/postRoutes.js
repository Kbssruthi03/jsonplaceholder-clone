const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const {

createPost,
getPosts,
getPost,
updatePost,
deletePost,
searchPost

}=require("../controllers/postController");

router.post("/",createPost);

router.get("/",getPosts);

router.get("/search",searchPost);

router.get("/:id",getPost);

router.put("/:id",auth,updatePost);

router.delete("/:id",auth,deletePost);

module.exports=router;