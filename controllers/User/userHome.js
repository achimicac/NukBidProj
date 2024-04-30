import Goods from "../../api/models/Goods.js";
import Bidding from "../../api/models/Bidding.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

export const userHome = async (req, res) => {
      try {
        const usercookie = req.cookies.userLoggedIn;
        const userId = jwt.decode(usercookie, process.env.JWT_SECRET).id;
        const objectId = new mongoose.Types.ObjectId(userId);
        const bidding = (await Bidding.find({ userID:  objectId})).map(good => new mongoose.Types.ObjectId(good.goodsID));
          
            const allGoods = await Goods.aggregate([
                { 
                    $match: { 
                        $and: [
                            {_id: { $nin: bidding  }}, 
                            {status: 'bidding'}
                        ] 
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
                    $sort: { endTime: 1 }
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
          
          res.json({data: allGoods});
    } catch (error) {
        console.error("Error fetching goods:", error);
        res.status(500).json({ success: false, text: "Failed to fetch goods" });
    }
};