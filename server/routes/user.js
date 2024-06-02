import express from 'express';
import { myProfile, register } from '../controllers/user.js';
import { verifyUser } from '../controllers/user.js';
import { loginUser } from '../controllers/user.js';
import { isAUth } from '../middlewares/isAuth.js';

const router = express.Router();


router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAUth, myProfile);


export default router