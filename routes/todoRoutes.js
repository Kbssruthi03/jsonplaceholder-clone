const express = require("express");
const router = express.Router();

const {
    createtodo,
    gettodo,
    updatetodo,
    deletetodo,
    searchtodo
} = require("../controllers/todoController");

router.post("/", createtodo);
router.get("/", gettodo);
router.get("/search", searchtodo);
router.put("/:id", updatetodo);
router.delete("/:id", deletetodo);

module.exports = router;