import nodemailer from "nodemailer"
import fs from 'fs';
//import mao from "../public/images"

//หน้านี้ไว้เทสเฉยๆ

export const sendEmail = (req, res) => {

      const product_link = ''
      const bidder_email = ['samon15122501@gmail.com', 'lagrongduke@gmail.com']

      const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
      });
      
      const mailOptions = (receiver) => {
            return {
                  from: '"NukBid Website💸 " process.env.EMAIL',                // sender
                  to: receiver,                // list of receivers
                  subject: 'Notification from Nukbid',            // Mail subject
                  html: `
                        <!DOCTYPE html>
                        <html lang="en">
                              <head>
                                    <meta charset="UTF-8">
                                    <title> Notification From "NukBid" </title>
                                    <style>
                                          h1 {
                                                color: blue;
                                          }
                                          .mail {
                                                display: flex;
                                                align-items: center;
                                                flex-direction: column;
                                                justify-content: center;
                                          }
                                          img{
                                                border-radius: 30px;
                                          }
                                    </style>
                              </head>
                              <body>
                                    <div class="mail">
                                          <h1> สินค้าของคุณมีผู้เสนอราคาแข่งแหละ! </h1>
                                          <p> ถ้าาหากไม่อยากถูกแย่งไปล่ะก็ รีบเสนอราคาแข่งสิ <a href=${product_link}>กดเลย!</a> <p>
                                          <img src="cid:maomao@nodemailer.com"/>
                                    </div>
                              </body>
                        </html>
                  `,
                  attachments: [
                        {
                            filename: 'maomao.jpg',
                            path: 'public/images/maomaoandherdog.jpg',
                            cid: 'maomao@nodemailer.com'
                        },
                  ],
            };
      }
      
      transporter.sendMail(mailOptions(bidder_email), function (err, info) {
            if(err)
              res.json({success: false, text: `send email not success bz. ${err.message}`})
            else
              res.json({success: true, text: "send email success"})
      });
}