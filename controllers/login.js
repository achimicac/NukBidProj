import Users from "../api/models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
      const { username, password } = req.body;
      if (!username || !password ) {
            res.json({text: "Please enter your username or email and password"})
      }

      const findUser = await Users.findOne({$or: [{username: username}, {email: username}]});
      if (!findUser) {
            res.json({text: "Don't found this user"})
      }

      /*const checkPassword = await bcrypt.compare(password, findUser.password)
      if (!checkPassword) {
            res.json({text: "Password doesn't match"})
      }*/

      try {
            const token = jwt.sign(
                  { id: findUser._id, isAdmin: findUser.isAdmin },
                  process.env.JWT_SECRET,
                  { expiresIn: process.env.JWT_EXPIRES }
            );
            const cookieOptions = {
                  expiresIn: new Date( Date.now() + parseInt(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
                  httpOnly: true,
                  path: '/'
            };
            res.cookie("userLoggedIn", token, cookieOptions).json({ status: "success", text: "User logged in"});
      } catch (error) {
            console.log(error)
      }
}