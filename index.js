const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db");

const userRoutes=require("./routes/userRoutes");

const postRoutes=require("./routes/postRoutes");

const commentRoutes=require("./routes/commentRoutes");

const albumRoutes=require("./routes/albumRoutes");

const todoRoutes=require("./routes/todoRoutes");

dotenv.config();

const app=express();

app.use(express.json());

connectDB();

app.use("/users",userRoutes);

app.use("/posts",postRoutes);

app.use("/comments",commentRoutes);

app.use("/albums",albumRoutes);

app.use("/todo",todoRoutes);

app.listen(process.env.PORT,()=>{

console.log("Server Started");

});