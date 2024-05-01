import Bidding from "../../api/models/Bidding.js";
import Goods from "../../api/models/Goods.js";
import nodemailer from "nodemailer";
import { sendEmail } from "../EmailTemplate.js";
import Users from "../../api/models/Users.js";

export const goodBidding = async (req, res) => {
      const { price, goodsid } = req.body;
      const usercookie = req.cookies.userLoggedIn;
      const userId = jwt.decode(usercookie, process.env.JWT_SECRET).id;
      const goodsId = new mongoose.Types.ObjectId(goodsid);
      const objectId = new mongoose.Types.ObjectId(userId);

      try {
            //const bidding = (await Bidding.find({ $and: [{ userID:  objectId}, { goodsID: goodsId }] }));
            //const bidding = (await Bidding.find({ $and: [{ userID:  objectId}, { goodsID: goodsId }] }));
            //const bidding = (await Bidding.find({ goodsID: goodsId })).map(user => new mongoose.Types.ObjectId(user.userID));
            const allUser_bidding = await Bidding.aggregate([
                  { 
                        $match: {
                              goodsID: goodsId
                        }
                  },
                  {
                      $lookup: {
                          from: "users",
                          localField: "userID",
                          foreignField: "_id",
                          as: "email"
                      }
                  },
                  {
                      $group: {
                          userID: "$userID",
                          email: "$email"
                      }
                  },
                  {
                      $project: {
                              userID: 1,
                              email: 1
                      }
                  }
          ]);

            //Check ว่าชนกับคนอื่นมั้ย กับ ทำแจ้งเตือน
            if (objectId in allUser_bidding.userID) {
                  await Bidding.insertOne({ userID: objectId, goodsID: goodsId })
            }
            
            const bid_good = await Goods.findOneAndUpdate({ _id: goodsId }, { topBuyer: objectId, maxPrice: price })
            sendEmail('link_product', allUser_bidding.map(user => user.email))

            //เหลือทำ ไลฟ์

            res.json({success: true, text: "บิดล้ะ"})
      } catch (error) {
            res.json({ success: false, text: "Failed to bid good", error: error.message });
      }
}