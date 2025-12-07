import {Router} from 'express';
import { adminRoute, verifyJWT } from '../middlewares/auth.middleware.js';
import { getSalesMetrics } from '../controllers/admin.controller.js';


const router=Router();

router.use(verifyJWT,adminRoute);

router.get('/getSalesMetrics',getSalesMetrics);

export default router;