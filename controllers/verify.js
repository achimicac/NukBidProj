
import jwt from 'jsonwebtoken';

export const VerifyLoggedIn = async (req, res, next) => {
      const { user } = req.cookies

      if (!user) {
            return res.json({text: "You need to login"})
      }
      next()
}

export const VerifyAdmin = async (req, res, next) => {
      const usercookie = req.cookies.userLoggedIn;
      const isAdmin = (jwt.decode(usercookie, process.env.JWT_SECRET)).isAdmin;
      
      if ( !isAdmin ) {
            res.json({success: false, text: "You connot access to Admin pages"})
      }
      next()
}

export const VerifyUser = async (req, res, next) => {
      const usercookie = req.cookies.userLoggedIn;
      const isAdmin = (jwt.decode(usercookie, process.env.JWT_SECRET)).isAdmin;
      
      if ( isAdmin ) {
            res.json({success: false, text: "You connot access to User pages"})
      }
      next()
}