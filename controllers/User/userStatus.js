import Goods from "../../api/models/Goods.js";
import Bidding from "../../api/models/Bidding.js"

export const userBidding = async (req, res) => {
      const usercookie = req.cookies.userLoggedIn;
      const userId = (jwt.decode(usercookie, process.env.JWT_SECRET)).id;

      const bidding = await Bidding.find({ userId:  userId});
      const allGoods = await Goods.find({$and: [{status: "bidding"}, {_id: bidding}]}).populate({
            path: "images",
            model: "Pics",
            select: "picLink"
      });
      res.json({data: allGoods});
}

export const userWin = async (req, res) => {
      const usercookie = req.cookies.userLoggedIn;
      const userId = (jwt.decode(usercookie, process.env.JWT_SECRET)).id;

      const allGoods = await Goods.find({$and: [{status: "end"}, {topBuyer: userId}]}).populate({
            path: "images",
            model: "Pics",
            select: "picLink"
      });//Check status name อีกที

      res.json({data: allGoods});
}

//มาดูอีกทีว่าจะให้ส่งเป็นอะไรไป กับ อาจต้องเก็บรูปแรกไว้ในgoodsเลย