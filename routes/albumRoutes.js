const express = require("express");
const router = express.Router();

const {
    createAlbum,
    getAlbum,
    updateAlbum,
    deleteAlbum
} = require("../controllers/albumController");

router.post("/", createAlbum);
router.get("/", getAlbum);
router.put("/:id", updateAlbum);
router.delete("/:id", deleteAlbum);

module.exports = router;