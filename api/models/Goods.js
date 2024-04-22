import mongoose from "mongoose";

const goodSchema = new mongoose.Schema({
      goodName: {
            type: String,
            require: true
      },
      openPrice: {
            type: String,
            require: true,
      },
      maxPrice: {
            type: String,
      },
      endTime: {
            type: String,
            require: true
      },
      topBuyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
      },
      leastAdd: {
            type: String,
      },
      status: {
            type: String,
      },
      properties: {
            type: String,
      }
})

export default mongoose.model("Goods", goodSchema);