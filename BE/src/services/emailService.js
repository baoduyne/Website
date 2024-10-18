
const dotenv = require('dotenv').config;

import nodemailer from 'nodemailer';
import { EmptyResultError } from 'sequelize';

let sendSimpleEmail = async (emailData) => {


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: emailData.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        text: "Hello", // plain text body
        html:
            `<h1>Xin chào ${emailData.patientName}</h1> 
             <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên github : https://github.com/baoduyne </p>
             <p>Thông tin đặt lịch khám bệnh: </p>
             <p>Thời gian: ${emailData.date}</p>
             <p>Bác sĩ đảm nhiệm: ${emailData.doctorName}</p>
             <p>Nếu thông tin này là thật xin vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục khám bệnh</p>
             <div>
             <a href = '${emailData.redirectLink}'>
             </a>
             </div>

        
        `,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}



module.exports = {
    sendSimpleEmail
}