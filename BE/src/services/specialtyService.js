import db from "../models/index";
require('dotenv').config();

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.nameSpecialty
                || !data.contentMarkdown
                || !data.descriptionHTML
                || !data.avatar
            ) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing Parameter!'
                })
            }
            else {
                if (data.action === 'CREATE') {
                    await db.Specialty.create({
                        name: data.nameSpecialty,
                        descriptionHTML: data.descriptionHTML,
                        contentMarkDown: data.contentMarkdown,
                        image: data.avatar
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Save specialty completed!'
                    })
                }
                else {
                    let specialty = await db.Specialty.findOne({
                        where: { id: data.id },
                        raw: false
                    })
                    if (specialty) {
                        specialty.name = data.nameSpecialty;
                        specialty.descriptionHTML = data.descriptionHTML;
                        specialty.contentMarkDown = data.contentMarkdown;
                        specialty.image = data.avatar;
                        await specialty.save();
                        resolve({
                            errCode: 0,
                            errMessage: 'Edit specialty completed!'
                        })
                    }
                    else {
                        resolve({
                            errCode: -1,
                            errMessage: 'Edit specialty fail!'
                        })
                    }
                }

            }

        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}
let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({})
            resolve({
                errCode: 0,
                errMessage: 'Save specialty completed!',
                data: data
            })


        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let getDetailSpecialty = (specialtyId, provinceId, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!specialtyId || !provinceId || !type) {
                resolve({
                    errCode: -2,
                    errMessage: 'Missing parameter!',
                    data: {}
                })
            }
            else {
                let data = {}
                data.specialtyData = {};
                data.doctorData = {};

                if (type === 'SPECIALTY') {
                    data.specialtyData = await db.Specialty.findOne({
                        where: { id: specialtyId }
                    })
                }

                else {
                    if (provinceId === 'ALL') {
                        if (specialtyId === 'ALL') {
                            let doctorData = await db.Doctor_infor.findAll({
                                attributes: ['doctorId']
                            })
                            let arrDoctorId = [];

                            doctorData.map(item => {
                                arrDoctorId.push(item.doctorId);
                            })
                            data.doctorData = arrDoctorId;
                        }
                        else {
                            let doctorData = await db.Doctor_infor.findAll({
                                where: { specialtyId: specialtyId },
                                attributes: ['doctorId']

                            })
                            let arrDoctorId = [];

                            doctorData.map(item => {
                                arrDoctorId.push(item.doctorId);
                            })
                            data.doctorData = arrDoctorId;
                        }

                    }
                    else {
                        let doctorData = await db.Doctor_infor.findAll({
                            where: {
                                specialtyId: specialtyId,
                                provinceId: provinceId
                            },
                            attributes: ['doctorId']
                        })

                        let arrDoctorId = [];

                        doctorData.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                        data.doctorData = arrDoctorId;

                    }

                }

                if (data) {
                    resolve({
                        errCode: 0,
                        errMessage: 'Get specialty data completed!',
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
    createSpecialty, getAllSpecialty, getDetailSpecialty
}