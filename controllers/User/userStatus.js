import Goods from "../../api/models/Goods.js";
import Bidding from "../../api/models/Bidding.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

export const userBidding = async (req, res) => {
      const usercookie = req.cookies.userLoggedIn;
      const userId = jwt.decode(usercookie, process.env.JWT_SECRET).id;
      const objectId = new mongoose.Types.ObjectId(userId);
      const bidding = (await Bidding.find({ userID:  objectId})).map(good => new mongoose.Types.ObjectId(good.goodsID));
      /*const allGoods = await Goods.find({$and: [{status: "bidding"}, {_id: bidding}]}).populate({
            path: "images",
            model: "Pics",
            select: "picLink"
      });*/
      try {
            const goods_bidding = await Goods.aggregate([
                  { 
                        $match: { 
                              _id: { $in: bidding }, 
                              status: 'bidding' 
                  } 
                  },
                  {
                      $lookup: {
                          from: "pics",
                          localField: "_id",
                          foreignField: "goodsID",
                          as: "images"
                      }
                  },
                  { 
                      $unwind: "$images"
                  },
                  { 
                      $addFields: {
                          "firstPicLink": { $arrayElemAt: ["$images.picLink", 0] } 
                      }
                  },
                  {
                      $group: {
                          _id: "$_id",
                          goodName: { $first: "$goodName" },
                          maxPrice: { $first: "$maxPrice" },
                          endTime: { $first: "$endTime" },
                          firstImage: { $first: "$firstPicLink" }
                      }
                  },
                  {
                      $project: {
                          _id: 1,
                          goodName: 1,
                          maxPrice: 1,
                          endTime: 1,
                          image: {
                              contentType: "$firstImage.contentType",
                              // data: "$firstImage.data"
                          }
                      }
                  }
              ]);
    
            res.json({ data: goods_bidding });
      } catch (error) {
            res.status(500).json({ message: "", error: error.message });
      }
}

export const userWin = async (req, res) => {
      const usercookie = req.cookies.userLoggedIn;
      const userId = jwt.decode(usercookie, process.env.JWT_SECRET).id;
      const objectId = new mongoose.Types.ObjectId(userId);
      //const biddingwin = (await Goods.find({$and: [{status: "end"}, {topBuyer: objectId}]})).map(good => new mongoose.Types.ObjectId(good.goodsID));
      /*const allGoods = await Goods.find({$and: [{status: "end"}, {topBuyer: userId}]}).populate({
            path: "images",
            model: "Pics",
            select: "picLink"
      });//Check status name อีกที*/

      try {
            const goods_bidwin = await Goods.aggregate([
                  { 
                      $match: { 
                          topBuyer: objectId, 
                          status: "end"
                      }
                  },
                  {
                      $lookup: {
                          from: "pics",
                          localField: "_id",
                          foreignField: "goodsID",
                          as: "images"
                      }
                  },
                  { 
                      $unwind: "$images"
                  },
                  { 
                      $addFields: {
                          "firstPicLink": { $arrayElemAt: ["$images.picLink", 0] } 
                      }
                  },
                  {
                      $group: {
                          _id: "$_id",
                          goodName: { $first: "$goodName" },
                          maxPrice: { $first: "$maxPrice" },
                          endTime: { $first: "$endTime" },
                          firstImage: { $first: "$firstPicLink" }
                      }
                  },
                  {
                      $project: {
                          _id: 1,
                          goodName: 1,
                          maxPrice: 1,
                          endTime: 1,
                          image: {
                              contentType: "$firstImage.contentType",
                              // data: "$firstImage.data"
                          }
                      }
                  }
              ]);
              
              console.log(goods_bidwin);
              
                          
    
            res.json({ data: goods_bidwin });
      } catch (error) {
            res.status(500).json({ message: "", error: error.message });
      }

      //res.json({data: goods_bidwin});
}

//มาดูอีกทีว่าจะให้ส่งเป็นอะไรไป กับ อาจต้องเก็บรูปแรกไว้ในgoodsเลย