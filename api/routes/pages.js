import express from "express";
import Users from "../models/Users.js"

import { signup } from "../../controllers/signup.js";
import { login } from "../../controllers/login.js";
import { logout } from "../../controllers/logout.js";
import { home } from "../../controllers/home.js";
import { VerifyAdmin, VerifyUser } from "../../controllers/verify.js";
import { addProduct } from "../../controllers/Admin/addProduct.js";
import { userBidding, userWin } from "../../controllers/User/userStatus.js";
import { profile } from "../../controllers/User/profile.js";

const router = express.Router();

import multer from "multer";
import { goodInfo } from "../../controllers/goodInfo.js";
import { goodsSuccess } from "../../controllers/Admin/adminStatus.js";
import { editprofile } from "../../controllers/User/editProfile.js";
const upload = multer({ })

/////////////// Test
router.post('/admin', VerifyAdmin)
router.post('/user', VerifyUser)


////////////////////////////// Real

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

/* -----  Admin ----- */
router.get('/admin/home', home)
router.get('/admin/products/success', goodsSuccess)
router.post('/admin/home/addProduct', upload.array('image', 5), addProduct)
router.get('/admin/products/:goodsid', goodInfo)

/* ----- User ----- */
router.get('/user/home', home)
router.get('/user/products/bidding', userBidding)
router.get('/user/products/win', userWin)
router.get('/user/products/:goodsid', goodInfo)
//router.put('/user/products/:goodsid', goodBidding) //เหลือทำแจ้งเตือน
//router.post('/user/home/search')
router.get('/user/profile', profile)
router.get('/user/profile/edit', profile)
router.put('/user/profile/edit', editprofile)

export default router;