import mongoose from "mongoose";

const biddingSchema = new mongoose.Schema({
      userID: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Users"
      },
      goodsID: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Goods"
      }
})

export default mongoose.model("Bidding", biddingSchema);