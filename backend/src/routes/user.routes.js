import { Router } from 'express'
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router()


router.route('/register').post(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    registerUser);
router.route('/login').post(loginUser)




router.use(verifyJWT);//routes below this middleware are protected and contain user info in req.user
router.route('/logout').post(logoutUser);
router.route('/profile').get(getCurrentUser)
router.route('/change-password').patch(changeCurrentPassword);
router.route('/update-avatar').patch(upload.single('avatar'), updateUserAvatar);
router.route('/update-account').patch(updateAccountDetails);
router.route('/refresh-token').post(refreshAccessToken);
export default router;