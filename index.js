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
      origin: 'http://localhost:' + PORT,
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

app.use("/", router);

const server = app.listen(PORT, () => {
      mongoConnect();
      console.log("Already connect to backend!");
})

//////////test
import {Server} from 'socket.io'
const io = new Server(server)

// รอการ connect จาก client
io.on('connection', (client) => {
      console.log('user connected')
    
      // เมื่อ Client ตัดการเชื่อมต่อ
      client.on('disconnect', () => {
          console.log('user disconnected')
      })
  
      // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
      client.on('sent-message', function (message) {
          io.sockets.emit('new-message', message)
      })
  })

////////////////