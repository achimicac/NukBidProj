import { text } from "express";
import Users from "../api/models/Users.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
      const { username, password, fname, lname, email, tel, address } = req.body;
      if (!username || !password || !fname || !lname || !email || !tel || !address ) {
            res.json({text: "Please enter all your information"})
      }

      //const findUsers = await Users.find({$or: [{username: "owachiii"}, {email: "samon"}]});
      const findUser = await Users.findOne({ $or: [ {email: email}, {username: username} ] });
      if (findUser) {
            /*if ( findEmail && findEmail) {
                  res.json({text: "This username and email have been sign up"})
            }
            else if (findUsername) {
                  res.json({text: "This username has been sign up"})
            }
            else {
                  res.json({text: "This email has been sign up"})
            }*/
            res.json({success: false, text: "This username or email has been sign up."})
      }

      const salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT));
      const hash = bcrypt.hashSync(password, salt);
      
      const newUser = new Users({...req.body, password: hash});
      try {
            await Users.insertMany(newUser);
      } catch (error) {
            res.json({success: false, text: "Sign up isn't success"})
      }
      res.json({success: true, text: "Sign up success"})

}