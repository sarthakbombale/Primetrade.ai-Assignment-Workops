import express from 'express';
import auth from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { createTaskSchema, updateTaskSchema } from '../validators/taskValidation.js';
import { createTask, getTasks, getTask, updateTask, deleteTask, toggleTaskStatus } from '../controllers/taskController.js';

const router = express.Router();

router.use(auth);

router.post('/', validate(createTaskSchema), createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.put('/:id/toggle', toggleTaskStatus);
router.delete('/:id', deleteTask);

export default router;

