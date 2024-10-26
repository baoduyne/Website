
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
        // attachments: [{
        //     filename: 'logo.png',
        //     path: '../FE/src/assets/logo.png',
        //     cid: 'logo'
        // }],
        html: createHTMLContent_test(emailData, emailData.language),
    });
}
// style = "color : black ; display : flex ; flex-direction : column"
//createHTMLContent(emailData, emailData.language)
let createHTMLContent = (emailData, language) => {
    if (language === 'vi')
        return (`
    <img
    style= "margin:15px 0 ;color : black;width:178px"  
    src = 'cid:logo'></img>
    
    <h1 style = "color : black" >Xin chào ${emailData.patientName}</h1> 
    <p style = "color : black">Bạn nhận được email này vì đã đặt lịch khám bệnh online trên : <a href = 'https://github.com/baoduyne'>bookingcare.com</a> </p>
    <p style = "color : black" >Thông tin đặt lịch khám bệnh: </p>
    <p style = "display:float;color:black">Thời gian: ${emailData.date}</p>
    <p style = "display:float;color:black">Bác sĩ đảm nhiệm: ${emailData.doctorName}</p>
    <p style = "display:float;color:black" >Nếu thông tin này là thật xin vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục khám bệnh</p>
    <a style = "display:float" href = '${emailData.redirectLink}'>Xác nhận lịch hẹn</a>
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

let createHTMLContent_test = (emailData, language) => {
    if (language === 'vi') {
        return (
            `<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
        <!-- HIDDEN PREHEADER TEXT -->
        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
        </div>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- LOGO -->
            <tr>
                <td bgcolor="#FFA73B" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Thư xác nhận lịch khám</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <h1 style = "color : black" >Xin chào ${emailData.patientName}</h1> 
    <p style = "color : black">Bạn nhận được email này vì đã đặt lịch khám bệnh online trên : <a href = 'https://github.com/baoduyne'>bookingcare.com</a> </p>
    <p style = "color : black" >Thông tin đặt lịch khám bệnh: </p>
    <p style = "display:float;color:black">Thời gian: ${emailData.date}</p>
    <p style = "display:float;color:black">Bác sĩ đảm nhiệm: ${emailData.doctorName}</p>
    <p style = "display:float;color:black" >Nếu thông tin này là thật xin vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục khám bệnh</p>
                                </a></p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${emailData.redirectLink}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Xác nhận lịch khám</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr> <!-- COPY -->
                        
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Nếu cần hỗ trợ hãy trả lời trực tiếp tại email này hoặc gọi theo hotline: 0123-231-123-321.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Cheer,<br>BaoDuy</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Điều khoản và dịch vụ của bookingcare</h2>
                                <p style="margin: 0;"><a href="localhost:3000/home" target="_blank" style="color: #FFA73B;">Policy & Copyright</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                <p style="margin: 0;">Toàn bộ thông tin được làm mang tính chất giả định vui lòng liên hệ <a href="https://www.facebook.com/baoduy.lo.1/" target="_blank" style="color: #111111; font-weight: 700;">facebook chính chủ</a> để được hỗ trợ hoặc trao đổi.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>`
        )
    }
    else {
        return (
            `<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#FFA73B" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Letter confrim booking schedule</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                 
                                    <h1 style = "color : black">Hello ${emailData.patientName}</h1> 
                                    <p style = "color : black" >You received this email as you have booked a schedule : <a href = 'https://github.com/baoduyne'>bookingcare.com</a> </p>
                                    <p style = "color : black" >booking informations: </p>
                                    <p style = "color : black" >Time: ${emailData.date}</p>
                                    <p style = "color : black" >Doctor: ${emailData.doctorName}</p>
                                    <p style = "color : black" >In case all the informations above are correct, please click the link below to confirm and redirect to complete booking form</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${emailData.redirectLink}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm booking</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">In case you need support please directly reply this email or call hotline: 0123-231-123-321.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Cheer,<br>BaoDuy</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">policy and copyright of bookingcare </h2>
                                    <p style="margin: 0;"><a href="localhost:3000/home" target="_blank" style="color: #FFA73B;">Policy & Copyright</a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">All informations above just for simulation,contact <a href="https://www.facebook.com/baoduy.lo.1/" target="_blank" style="color: #111111; font-weight: 700;">facebook author</a> in case need support.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>`
        )
    }

}

{/* <img src = '../../../FE/src/assets/logo.png'>this is logo</img> */ }

module.exports = {
    sendSimpleEmail
}