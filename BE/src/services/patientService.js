const { reject } = require("bcrypt/promises")
import db from "../models/index";
require('dotenv').config();
import { sendSimpleEmail } from "./emailService";
import _, { includes } from 'lodash';
import { v4 as uuidv4 } from 'uuid';


let createToken = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking-appoinment?token=${token}&doctorId=${doctorId}`
    return result;
}

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

                let token = uuidv4();

                await sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.firstName + " " + data.lastName,
                    date: data.fullTime,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: createToken(data.doctorId, token),
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
                        timeMap: data.timeType,
                        supportFirstName: data.supportFirstName,
                        supportLastName: data.supportLastName,
                        supportPhoneNumber: data.supportPhoneNumber,
                        supportGender: data.supportGender,
                        supportBirthDay: data.supportBirthDay,
                        token: token,
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

let verifyAppoinment = (data) => {
    try {
        return new Promise(async (resolve, reject) => {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing Parameter...'
                })
            }
            else {

                let booking = await db.Booking.findOne({
                    where: {
                        token: data.token,
                        doctorId: data.doctorId,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (booking) {
                    booking.statusId = 'S2';

                    await booking.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Verify user token completed...'
                    })
                }
                else {
                    resolve({
                        errCode: -1,
                        errMessage: 'Cant find booking appointment...'
                    })
                }
            }

        })
    }
    catch (e) {
        reject(e);
    }
}

module.exports = {
    createBooking, verifyAppoinment
}