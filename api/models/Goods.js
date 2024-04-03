import mongoose from "mongoose";

const goodSchema = new mongoose.Schema({
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
            require: true,
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
      },
      images: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pics"
      }]
      
})

export default mongoose.model("Goods", goodSchema);