
const dotenv = require('dotenv').config;
import nodemailer from 'nodemailer';



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
        from: '"Đặt lịch khám bệnh" <bookingcare@gmail.com>', // sender address
        to: emailData.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        attachments: [{
            filename: 'logo.png',
            path: '../FE/src/assets/logo.png',
            cid: 'logo'
        }],
        html: createHTMLContent(emailData, emailData.language),
    });
}

let createHTMLContent = (emailData, language) => {
    if (language === 'vi')
        return (`<h1>Xin chào ${emailData.patientName}</h1> 
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên : <a href = 'https://github.com/baoduyne'>bookingcare.com</a> </p>
    <p>Thông tin đặt lịch khám bệnh: </p>
    <p>Thời gian: ${emailData.date}</p>
    <p>Bác sĩ đảm nhiệm: ${emailData.doctorName}</p>
    <p>Nếu thông tin này là thật xin vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục khám bệnh</p>
    <div>
    <a href = '${emailData.redirectLink}'>Xác nhận lịch hẹn
    </a>
    </div>
    <img 
    style= "margin:50px 0"  
    src = 'cid:logo'></img>
`)
    else {
        return (`<h1>Hello ${emailData.patientName}</h1> 
        <p>You received this email as you have booked a schedule : <a href = 'https://github.com/baoduyne'>bookingcare.com</a> </p>
        <p>booking informations: </p>
        <p>Time: ${emailData.date}</p>
        <p>Doctor: ${emailData.doctorName}</p>
        <p>In case all the informations above are correct, please click the link below to confirm and redirect to complete booking form</p>
        <div>
        <a href = '${emailData.redirectLink}'>Confirm booking
        </a>
        </div>
        <img 
        style= "margin:50px 0"
        src = 'cid:logo'></img>
        
    `)
    }
}

{/* <img src = '../../../FE/src/assets/logo.png'>this is logo</img> */ }

module.exports = {
    sendSimpleEmail
}