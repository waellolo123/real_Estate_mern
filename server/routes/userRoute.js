import express from 'express';
import { deleteUser, getUsers, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();
 
router.post('/update/:id',updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/', getUsers)

export default router;












