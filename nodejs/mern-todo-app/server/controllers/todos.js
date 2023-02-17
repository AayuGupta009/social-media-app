const mongoose = require("mongoose");
import Todo from '../models/todos';
import Todo from '../models/todos'

export const readTodos = async (req,res) => {
    try{
        const Todos = await Todo.find();
        res.status(200).json(Todos)
    } catch(error){
        res.status(404).json({message : error.message})
    }
}

export const createTodos = async (req,res) => {
    const todo = new Todo(req.body)
    try{
        await todo.save();
        res.status(201).json(Todo )
    } catch(error){
        res.status(409).json({message : error.message})
    }
}