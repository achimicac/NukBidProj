import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import router from "./api/routes/pages.js"

const app = express();
const PORT = process.env.PORT;


const mongoConnect = async () => {
      try {
            await mongoose.connect("mongodb+srv://autmango:atchima1234@cluster0.zpkk2wq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            console.log("Already connect to mongoDB");
      } catch (error) {
            throw error
      }
}

app.use(cors({
      origin: 'http://localhost:'+PORT,
      credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected")
})

mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connected")
})

/*app.post("/", async (req, res) => {
      const newUser = new Users({
            ...req.body,
      });
      try {
            await newUser.save();
            res.status(200).send("User has been created.");
      } catch (error) {
            
      }
})*/

app.use("/", router);

app.listen(PORT, () => {
      mongoConnect();
      console.log("Already connect to backend!");
})