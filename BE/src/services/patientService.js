const { reject } = require("bcrypt/promises")
import db from "../models/index";
require('dotenv').config();
import { sendSimpleEmail } from "./emailService";
import _, { includes } from 'lodash';

let createBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.firstName || !data.lastName || !data.phoneNumber || !data.doctorId) {
                resolve({
                    errCode: -2,
                    errMessage: 'Missing parameter!'
                });
            }

            else {
                console.log(data);
                await sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.firstName + " " + data.lastName,
                    date: data.fullTime,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: 'https://google.com',
                });
                let user = await db.User.findOne({
                    where: { email: data.email },
                    raw: false
                })

                if (!user) {
                    await db.User.create({
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.genderId,
                        roleId: 'R3',
                        positionId: 'P0'
                    })

                    user = await db.User.findOne({
                        where: { email: data.email },
                        raw: false
                    })
                }



                if (user) {
                    await db.Booking.create({
                        statusId: 'S1',
                        doctorId: data.doctorId,
                        patientId: user.id,
                        date: data.date,
                        timeType: data.timeType,
                        supportFirstName: data.supportFirstName,
                        supportLastName: data.supportLastName,
                        supportPhoneNumber: data.supportPhoneNumber,
                        supportGender: data.supportGender,
                        supportBirthDay: data.supportBirthDay,
                        note: data.note

                    })

                    resolve({
                        errCode: 0,
                        errMessage: 'save user booking complete!'
                    });
                }



            }
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createBooking
}