import express from 'express';
import { updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();
 
router.post('/update/:id',updateUser);

export default router;












