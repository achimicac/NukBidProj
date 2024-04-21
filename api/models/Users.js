import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      username: {
            type: String,
            require: true,
            unique: true
      },
      password: {
            type: String,
            require: true
      },
      fname: {
            type: String,
            require: true
      },
      lname: {
            type: String,
            require: true
      },
      email: {
            type: String,
            require: true,
            unique: true
      },
      tel: {
            type: String,
            require: true
      },
      address: {
            type: String,
            require: true
      },
      isAdmin: {
            type: Boolean,
            default: false
      },
      picture: {
            contentType: { 
                  type: String 
            },
            data: { 
                  type: Buffer 
            }
      }
})

export default mongoose.model("Users", userSchema);