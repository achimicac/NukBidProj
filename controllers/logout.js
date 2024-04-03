export const logout = async (req, res, next) => {
      try {
            res.clearCookie("userLoggedIn").json({status: "success", text: "Logout success"});
            
      } catch (error) {
            console.log("Cannot logout");
      }
}