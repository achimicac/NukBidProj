import Goods from "../api/models/Goods.js";
import mongoose from "mongoose";

export const goodInfo = async (req, res) => {
      const { goodsid } = req.params;
      const objectId = new mongoose.Types.ObjectId(goodsid);
      try {
        const good_info = await Goods.aggregate([
            { $match: { _id: objectId } },
            {
                $lookup: {
                    from: "pics", // The collection name containing images linked to goods
                    localField: "_id",
                    foreignField: "goodsID",
                    as: "images"
                }
            },
            {
                $unwind: {
                    path: "$images",
                    preserveNullAndEmptyArrays: true // Keeps the document in pipeline even if images are missing
                }
            },
            {
                $unwind: {
                    path: "$images.picLink",
                    preserveNullAndEmptyArrays: true // Handles cases where picLink may be empty or missing
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "topBuyer",
                    foreignField: "_id",
                    as: "topBuyer"
                }
            },
            {
                $project: {
                    _id: 1,
                    openPrice: 1,
                    maxPrice: 1,
                    endTime: 1,
                    topBuyer_username: { username: {$arrayElemAt: ["$topBuyer.username", 0]} },
                    leastAdd: 1,
                    properties: 1,
                    images: {
                        contentType: "$images.picLink.contentType",
                        data: "$images.picLink.data"
                    }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    openPrice: { $first: "$openPrice" },
                    maxPrice: { $first: "$maxPrice" },
                    endTime: { $first: "$endTime" },
                    topBuyer: { $first: "$topBuyer_username" },
                    leastAdd: { $first: "$leastAdd" },
                    properties: { $first: "$properties" },
                    images: { $push: "$images" } // Aggregates all image documents into an array
                }
            }
        ]);
  
          res.json({ data: good_info });
      } catch (error) {
          res.status(500).json({ message: "Error accessing the database", error: error.message });
      }
  }
  
  