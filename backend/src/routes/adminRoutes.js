import express from 'express';
import auth from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';
import { getUsers, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

router.use(auth);
router.use(requireRole('ADMIN'));

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

export default router;

