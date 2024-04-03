import Goods from "../../api/models/Goods.js";
import Pics from "../../api/models/Pics.js";

export const addProduct = async (req, res) => {
    const { openPrice, maxPrice, endTime, leastAdd, properties } = req.body;
    const allimage = [];

    try {
        if (!openPrice || !maxPrice || !endTime || !leastAdd || !properties || !req.files) {
            return res.status(400).json({ success: false, text: "Please provide all necessary information and at least one image" });
        }

        for (const file of req.files) {
            allimage.push({
                contentType: file.mimetype,
                data: file.buffer
            });
        }

        const newProduct = new Goods({ ...req.body, status: "bidding" });
        await newProduct.save();

        const newPics = new Pics({ picLink: allimage, goodsID: newProduct._id });
        await newPics.save();

        res.json({ success: true, message: "Add product successfully", product: newProduct, pics: newPics });

    } catch (error) {
        res.json({ success: false, text: "Failed to add product and images", error: error.message });
    }
};

//271997