import { reject } from "bcrypt/promises";
import db from "../models/index";
require('dotenv').config();
import _, { includes } from 'lodash';
import { sendBillEmail } from "./emailService";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = await db.User.findAll({
                limit: +limit,
                order: [['createdAt', 'DESC']],
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: "genderData", attributes: ['valueEn', 'valueVi'] },
                    { model: db.Doctor_infor, as: "doctorInforData", include: [{ model: db.Specialty, as: "specialtyData", exclude: ['image'] }] }
                ],
                raw: true,
                nest: true
            })

            if (users) {
                resolve({
                    errCode: 0,
                    errMessage: 'Done',
                    users
                });
            }
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: "genderData", attributes: ['valueEn', 'valueVi'] }
                ],
            })

            resolve({
                doctors
            })
        }
        catch (e) {
            reject(e);
        }
    })
}

let saveSelectDoctor = (inforDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inforDoctor.action === 'CREATE') {

                await db.Markdown.create({
                    contentHTML: inforDoctor.contentHTML,
                    contentMarkdown: inforDoctor.contentMarkdown,
                    description: inforDoctor.description,
                    doctorId: inforDoctor.doctorId,
                })

                await db.Doctor_infor.create({
                    doctorId: inforDoctor.doctorId,
                    priceId: inforDoctor.priceSelected,
                    provinceId: inforDoctor.provinceSelected,
                    paymentId: inforDoctor.paymentSelected,
                    addressClinic: inforDoctor.clinicAddress,
                    nameClinic: inforDoctor.clinicName,
                    clinicId: inforDoctor.clinicId,
                    specialtyId: inforDoctor.specialtyId,
                    note: inforDoctor.clinicDescription,
                    count: 0,
                })
            }
            else if (inforDoctor.action === 'EDIT') {

                let doctor = await db.Markdown.findOne({
                    where: { doctorId: inforDoctor.doctorId }
                });
                let doctor_infor = await db.Doctor_infor.findOne({
                    where: { doctorId: inforDoctor.doctorId }
                });

                if (doctor) {
                    doctor.set({
                        contentHTML: inforDoctor.contentHTML,
                        contentMarkdown: inforDoctor.contentMarkdown,
                        description: inforDoctor.description,
                    });
                    await doctor.save();
                }

                if (doctor_infor) {
                    doctor_infor.set({
                        priceId: inforDoctor.priceSelected,
                        provinceId: inforDoctor.provinceSelected,
                        paymentId: inforDoctor.paymentSelected,
                        addressClinic: inforDoctor.clinicAddress,
                        nameClinic: inforDoctor.clinicName,
                        clinicId: inforDoctor.clinicId,
                        specialtyId: inforDoctor.specialtyId,
                        note: inforDoctor.clinicDescription,
                        count: 0,
                    })
                    await doctor_infor.save();
                }
            }

            resolve({
                errCode: 0,
                errMessage: 'Save doctor complete!'
            })
        }

        catch (e) {
            console.log(e);
            reject({
                errCode: -1,
                errMessage: 'err from sever!'
            })
        }
    })
}

let getDoctorMarkdown = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password']
                },
                include: [{ model: db.Markdown },
                { model: db.Allcode, as: 'positionData' },
                { model: db.Doctor_infor, as: 'doctorInforData' }
                ]
            })
            if (data) {
                resolve(data);
            }
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let saveDoctorSchedules = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedules = data;

            if (!schedules || !schedules[0].date || !schedules[0].doctorId) {
                resolve(
                    {
                        errCode: -1,
                        errMessage: 'Missing parameter!',
                    }
                )
            }

            else {
                schedules = schedules.map((item, index) => {
                    item.maxNumber = MAX_NUMBER_SCHEDULE;
                    return item;
                })

                let doctorId = schedules[0].doctorId;

                let existing = await db.Schedule.findAll({
                    where: { doctorId: doctorId },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                })


                let toCreate = _.differenceWith(schedules, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                });
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }

                resolve(
                    {
                        errCode: 0,
                        errMessage: 'save doctor schedules completed',
                    }
                )
            }
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let getDoctorSchedules = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve(
                    {
                        errCode: -2,
                        errMessage: 'Missing parameter...'
                    })
            }

            else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },

                    // include: [{ models: Allcode, as: 'timeTypeData', attributes: ["valueEn", "valueVi"] }]
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Get doctor schedule completed!',
                    data: data
                })
            }
        }


        catch (e) {
            console.log(e);
            reject(e);
        }

    })

}

// include: [{ model: db.Markdown },
//     { model: db.Allcode, as: 'positionData' },
//     { model: db.Doctor_infor, as: 'doctorInforData' }
//     ]

let getDoctorInfors = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = '';
            if (id === 'ALL') {
                response = await db.Doctor_infor.findAll({
                    include: [{ model: db.Allcode, as: 'priceData' },
                    { model: db.Allcode, as: 'proviceData' },
                    { model: db.Allcode, as: 'paymentData' }
                    ],
                    raw: false
                })

            }
            else {

                response = await db.Doctor_infor.findOne({
                    where: { doctorId: id },
                    include: [{ model: db.Allcode, as: 'priceData' },
                    { model: db.Allcode, as: 'proviceData', },
                    { model: db.Allcode, as: 'paymentData' }
                    ]
                })
            }

            if (response) {
                resolve({
                    errCode: 0,
                    errMessage: 'Get doctor informations completed!',
                    data: response
                })
            }
            else {
                resolve({
                    errCode: -1,
                    errMessage: 'Err from sever!',
                    data: ''
                })
            }
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}


let getBookingInforForDoctor = (doctorId, time) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !time) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing parameter...',
                    data: ''
                })
            }
            else {
                let data = '';
                if (time === 'ALL') {
                    data = await db.Booking.findAll({
                        where: {
                            statusId: 'S2',
                            doctorId: doctorId,
                        },

                        include: [
                            {
                                model: db.User, as: 'patientData', attributes: {
                                    exclude: ["avatar"]
                                },
                            },
                            {
                                model: db.Allcode, as: 'timeData'
                            }
                        ]
                    })
                }
                else {

                    data = await db.Booking.findAll({
                        where: {
                            statusId: 'S2',
                            doctorId: doctorId,
                            date: time
                        },
                        include: [
                            {
                                model: db.User, as: 'patientData', attributes: {
                                    exclude: ["avatar"]
                                },

                            },
                            {
                                model: db.Allcode, as: 'timeData'
                            }
                        ],

                    })
                }

                if (data) {
                    resolve({
                        errCode: 0,
                        errMessage: 'Get booking data for doctor completed!',
                        data: data
                    })
                }
                else {
                    resolve({
                        errCode: -1,
                        errMessage: 'err from sever!',
                        data: ''
                    })
                }
            }
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let sendBillToPatient = (email, pillPrice, note, bookingData, language) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!email || !pillPrice || !note || !bookingData || !language) {
                resolve(
                    {
                        errCode: -2,
                        errMessage: 'Missing parameter...'
                    })
            }

            else {
                let data = {}
                let doctorData = await db.Doctor_infor.findOne({
                    where: {
                        doctorId: bookingData.doctorId
                    },
                    include: [
                        { model: db.User, as: 'doctorInforData' },
                        { model: db.Allcode, as: 'priceData' },
                        { model: db.Allcode, as: 'proviceData' },
                        { model: db.Allcode, as: 'paymentData' },
                    ],
                    exclude: ['avatar'],

                })
                if (doctorData) {
                    await sendBillEmail(email, pillPrice, note, bookingData, doctorData, language)

                    let booking = await db.Booking.findOne({
                        where: { id: bookingData.id }
                    })
                    if (booking) {
                        booking.set({
                            statusId: 'S3'
                        })
                        booking.save()
                    }
                    await db.History.create({
                        bookingId: bookingData.id,
                        pillPrice: pillPrice,
                        note: note
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Save email completed!',
                        data: data
                    })
                }

            }
        }


        catch (e) {
            console.log(e);
            reject(e);
        }

    })

}


module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveSelectDoctor: saveSelectDoctor,
    getDoctorMarkdown: getDoctorMarkdown,
    saveDoctorSchedules: saveDoctorSchedules,
    getDoctorSchedules: getDoctorSchedules,
    getDoctorInfors: getDoctorInfors,
    getBookingInforForDoctor: getBookingInforForDoctor,
    sendBillToPatient: sendBillToPatient
}