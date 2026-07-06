const express=require("express");

const router=express.Router();

const auth = require("../middleware/auth");

const {

register,
login,
getUsers,
searchUsers

}=require("../controllers/userController");

router.post("/register",auth,register);

router.post("/login",login);

router.get("/",getUsers);

router.get("/search", searchUsers);

module.exports=router;