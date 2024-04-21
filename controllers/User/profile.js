import Users from "../../api/models/Users.js";
import jwt from 'jsonwebtoken'

export const profile = async (req, res) => {
      try {
          // Find all goods with status 'bidding' and populate their images from the Pics collection
            const usercookie = req.cookies.userLoggedIn;
            const id = (jwt.decode(usercookie, process.env.JWT_SECRET)).id;
            const userprofile = await Users.find({ _id: id})
            const userpic = userprofile[0].picture.data.toString('base64')
          
          res.json({data: userprofile, picture: userpic});
      } catch (error) {
          console.error("Error fetching goods:", error);
          res.status(500).json({ success: false, text: "Failed to fetch goods", error: error.message });
      }
};