import { Router } from 'express';
import { createUser, getUsers } from '../controllers/user.controller';

const router = Router();

router.route('/').post(createUser);

router.route('/').get(getUsers);

export default router;
