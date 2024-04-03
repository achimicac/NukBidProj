import Goods from "../api/models/Goods.js";
import Pics from "../api/models/Pics.js";

export const goodInfo = async (req, res) => {

      const allGoods = await Goods.find({$and: [{status: "bidding"}, {_id: req.params.goodsid}]}).populate({
            path: "images",
            model: "Pics",
            select: "picLink"
      });//Check status name อีกที*/

      res.json({data: allGoods});
}