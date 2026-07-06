const Todo = require("../models/todo");

// Create Todo
const createtodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.json(todo);
    } catch (err) {
        res.json(err);
    }
};

// Get Todos with Pagination
const gettodo = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 5;

        let skip = (page - 1) * limit;

        const todos = await Todo.find()
            .skip(skip)
            .limit(limit);

        res.json(todos);
    } catch (err) {
        res.json(err);
    }
};

// Update Todo
const updatetodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(todo);
    } catch (err) {
        res.json(err);
    }
};

// Delete Todo
const deletetodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);

        res.json({
            message: "Todo Deleted Successfully"
        });
    } catch (err) {
        res.json(err);
    }
};

// Search Todo
const searchtodo = async (req, res) => {
    try {
        const { title } = req.query;

        const todos = await Todo.find({
            title: { $regex: title, $options: "i" }
        });

        res.json(todos);
    } catch (err) {
        res.json(err);
    }
};

module.exports = {
    createtodo,
    gettodo,
    updatetodo,
    deletetodo,
    searchtodo
};