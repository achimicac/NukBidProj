import Goods from "../../api/models/Goods.js";
import Pics from "../../api/models/Pics.js";

export const goodsSuccess = async (req, res) => {
      const allGoods = await Goods.find({ status: "success" }).populate({
            path: "images",
            model: "Pics",
            select: "picLink"
      });
      res.json(allGoods);
}