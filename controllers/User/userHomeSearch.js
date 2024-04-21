import Goods from "../../api/models/Goods.js"

export const userHomeSearch = async (req, res) => {
      const { search } = req.query

      const goodsName = await Goods.find(
            { goodName: { $regex: new RegExp(search, 'i') } }, 
            { _id: 1, goodName: 1 }
      );
          
      res.json({ data: goodsName })
}