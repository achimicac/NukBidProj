import mongoose from "mongoose";

const pictureSchema = new mongoose.Schema({
      
      picLink: [
            {
                  contentType: String,
                  data: Buffer
            },
            {
                  contentType: String,
                  data: Buffer
            },
            {
                  contentType: String,
                  data: Buffer
            },
            {
                  contentType: String,
                  data: Buffer
            },
            {
                  contentType: String,
                  data: Buffer
            }
      ],
      goodsID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Goods"
      },
})

export default mongoose.model("Pics", pictureSchema);