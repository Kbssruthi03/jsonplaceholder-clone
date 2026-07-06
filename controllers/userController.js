const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register

const register = async(req,res)=>{

    try{

        const {name,email,password}=req.body;

        const userExist=await User.findOne({email});

        if(userExist){

            return res.json({message:"User already exists"});

        }

        const hashPassword=await bcrypt.hash(password,10);

        const user=await User.create({

            name,
            email,
            password:hashPassword

        });

        res.json({
            message:"User Registered",
            user
        });

    }

    catch(err){

        res.json(err);

    }

}



// Login

const login=async(req,res)=>{

    try{

        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){

            return res.json({message:"User not found"});

        }

        const check=await bcrypt.compare(password,user.password);

        if(!check){

            return res.json({message:"Wrong Password"});

        }

        const token=jwt.sign(

            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}

        );

        res.json({

            message:"Login Success",
            token

        });

    }

    catch(err){

        res.json(err);

    }

}



// Get Users

const getUsers = async (req, res) => {

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;

    let skip = (page - 1) * limit;

    const users = await User.find()
        .select("-password")
        .skip(skip)
        .limit(limit);

    res.json(users);
};

// Search Users by Name
const searchUsers = async (req, res) => {
    try {

        const { name } = req.query;

        const users = await User.find({
            name: { $regex: name, $options: "i" }
        }).select("-password");

        res.json(users);

    } catch (err) {
        res.json(err);
    }
};


module.exports={

register,
login,
getUsers,
searchUsers

}