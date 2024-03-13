import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser } from '../controllers/user.controller';

const router = Router();

router.route('/').post(createUser);

router.route('/').get(getUsers);

router.route('/:userId').get(getUserById).put(updateUser);

export default router;
