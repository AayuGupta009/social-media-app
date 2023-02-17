import express from 'express';
import {createTodos, readTodos} from "../controllers/todos"

const router = express.Router();
router.get('/' , readTodos)
router.post('/' , createTodos)

export default router;