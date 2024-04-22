import Bidding from "../../api/models/Bidding.js";
import Goods from "../../api/models/Goods.js";


export const goodBidding = async (req, res) => {
      const { price, goodsid } = req.body;
      const usercookie = req.cookies.userLoggedIn;
      const userId = jwt.decode(usercookie, process.env.JWT_SECRET).id;
      const goodsId = new mongoose.Types.ObjectId(goodsid);
      const objectId = new mongoose.Types.ObjectId(userId);

      try {
            const bidding = (await Bidding.find({ $and: [{ userID:  objectId}, { goodsID: goodsId }] }));

            //Check ว่าชนกับคนอื่นมั้ย กับ ทำแจ้งเตือน
            if (bidding.length() === 0) {
                  await Bidding.insertOne({ userID: objectId, goodsID: goodsId })
            }
            
            const bid_good = await Goods.findOneAndUpdate({ _id: goodsId }, { topBuyer: objectId, maxPrice: price })
            res.json({success: true, text: "บิดล้ะ"})
      } catch (error) {
            res.json({ success: false, text: "Failed to bid good", error: error.message });
      }
}