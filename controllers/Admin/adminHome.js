import Goods from "../../api/models/Goods.js";

export const adminHome = async (req, res) => {
      try {
          
            const allGoods = await Goods.aggregate([
                { 
                    $match: { 
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
                    $sort: { _id: -1 }
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