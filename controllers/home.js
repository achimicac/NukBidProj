export const home = async (req, res) => {
      try {
          // Find all goods with status 'bidding' and populate their images from the Pics collection
          const allGoods = await Goods.find({ openPrice: "20" }).populate({
              path: "images", // The field in Goods schema where the images will be populated
              model: "Pics", // The model to use for populating images
              select: "picLink" // Optionally, specify which fields to select from the Pics collection
          });
          
          res.json({data: allGoods});
      } catch (error) {
          console.error("Error fetching goods:", error);
          res.status(500).json({ success: false, text: "Failed to fetch goods", error: error.message });
      }
};