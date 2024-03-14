import { Router } from 'express';

import {loginUser } from '../controllers/user.controller';

const router = Router()

router.route('/').post(loginUser)

export default router;
