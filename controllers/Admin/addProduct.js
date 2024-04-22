import Goods from "../../api/models/Goods.js";
import Pics from "../../api/models/Pics.js";
import fs from "fs";

export const addProduct = async (req, res) => {
    const { goodName, openPrice, maxPrice, endTime, leastAdd, properties } = req.body;
    const allimage = [];

    try {
        if ( !goodName || !openPrice || !maxPrice || !endTime || !leastAdd || !properties || !req.files) {
            return res.status(400).json({ success: false, text: "Please provide all necessary information and at least one image" });
        }

        const fileToBase64 = (filePath) => {
            return new Promise((resolve, reject) => {
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        const base64Data = data.toString('base64');
                        resolve(base64Data);
                    }
                });
            });
        };

        for (const file of req.files) {
            const base64Image = await fileToBase64(file.path);
            allimage.push({
                contentType: file.mimetype,
                data: base64Image
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