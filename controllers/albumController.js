const Album = require("../models/albums");

console.log(Album);

const createAlbum=async(req,res)=>{
    const album=await Album.create(req.body);
    res.json(album);
}

const getAlbum=async(req,res)=>{
    const album=await Album.find();
    res.json(album);
}

const updateAlbum=async(req,res)=>{
    const album=await Album.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(album);
}

const deleteAlbum=async(req,res)=>{
    await Album.findByIdAndDelete(req.params.id);
    res.json({message:"Album Deleted"});
}

module.exports={
    createAlbum,
    getAlbum,
    updateAlbum,
    deleteAlbum
}