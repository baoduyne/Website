import { reject } from "bcrypt/promises";
import db from "../models/index";

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
                include: [{ model: db.Markdown }]
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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveSelectDoctor: saveSelectDoctor,
    getDoctorMarkdown: getDoctorMarkdown
}