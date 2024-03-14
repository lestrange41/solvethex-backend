import { Router } from 'express';

import { createUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser } from '../controllers/user.controller';

const router = Router()

router.route('/').post(createUser)

router.route('/').get(getAllUsers)

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser)

export default router;
