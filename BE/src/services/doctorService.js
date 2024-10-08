import { reject } from "bcrypt/promises";
import db from "../models/index";
require('dotenv').config();
import _ from 'lodash';
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
                    { model: db.Allcode, as: "genderData", attributes: ['valueEn', 'valueVi'] }
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
            }
            else if (inforDoctor.action === 'EDIT') {
                let doctor = await db.Markdown.findOne({
                    where: { doctorId: inforDoctor.doctorId }
                });
                if (doctor) {
                    doctor.set({
                        contentHTML: inforDoctor.contentHTML,
                        contentMarkdown: inforDoctor.contentMarkdown,
                        description: inforDoctor.description,
                    });
                }
                await doctor.save();
            }

            resolve({
                errCode: 0,
                errMessage: 'Save doctor complete!'
            })
        }

        catch (e) {
            console.log(e);
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
                { model: db.Allcode, as: 'positionData' }
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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveSelectDoctor: saveSelectDoctor,
    getDoctorMarkdown: getDoctorMarkdown,
    saveDoctorSchedules: saveDoctorSchedules,
    getDoctorSchedules: getDoctorSchedules
}