import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { signup } from "../../controllers/signup.js";
import { login } from "../../controllers/login.js";
import { logout } from "../../controllers/logout.js";
import { userHome } from "../../controllers/User/userHome.js";
import { VerifyAdmin, VerifyUser } from "../../controllers/verify.js";
import { addProduct } from "../../controllers/Admin/addProduct.js";
import { userBidding, userWin } from "../../controllers/User/userStatus.js";
import { profile } from "../../controllers/User/profile.js";
import { goodInfo } from "../../controllers/goodInfo.js";
import { goodsSuccess } from "../../controllers/Admin/adminStatus.js";
import { editprofile } from "../../controllers/User/editProfile.js";
import { userHomeSearch } from "../../controllers/User/userHomeSearch.js";
import { adminHome } from "../../controllers/Admin/adminHome.js";
import { goodBidding } from "../../controllers/User/goodBidding.js";

const router = express.Router();
const storage = multer.diskStorage({
      /*destination: (req, file, cb) => {
            cb(null, '../../public/images')
      },*/
      filename: (req, file, cb) => {
            console.log(file)
            cb(null, Date.now() + path.extname(file.originalname))
      }
})
const upload = multer({ storage: storage })

/////////////// Test

////////////////////////////// Real
router.post('/admin', VerifyAdmin)
router.post('/user', VerifyUser)

router.post('/signup', signup)//
router.post('/login', login)//
router.get('/logout', logout)//

/* -----  Admin ----- */
router.get('/admin/home', adminHome)//
router.get('/admin/products/success', goodsSuccess)//
router.post('/admin/home/addProduct', upload.array('image', 5), addProduct)//
router.get('/admin/products/:goodsid', goodInfo)//

/* ----- User ----- */
router.get('/user/home', userHome)//
router.post('/user/home', userHomeSearch)//
router.get('/user/products/bidding', userBidding)//
router.get('/user/products/win', userWin)//
router.get('/user/products/:goodsid', goodInfo)//
router.put('/user/products/:goodsid', goodBidding)
router.get('/user/profile', profile)// checkอีกที
router.get('/user/profile/edit', profile)//
router.put('/user/profile/edit', editprofile)//

/* Alreary success */
//goodInfo, VerifyAdmin and User, Login(อย่าลืมแก้เข้ารหัสคืนด้วย), Signup, Logout, 
//userStatus, userHome, search in userHome, adminHome, editProfile

//ดูเรื่องรูป

export default router;