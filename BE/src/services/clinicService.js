import db from "../models/index";
require('dotenv').config();

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.nameClinic
                || !data.contentMarkDown
                || !data.contentHTML
                || !data.avatar
                || !data.backgroundImage
            ) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing Parameter!'
                })
            }
            else {
                if (data.action === 'CREATE') {
                    await db.Clinic.create({
                        name: data.nameClinic,
                        address: data.addressClinic,
                        contentHTML: data.contentHTML,
                        contentMarkDown: data.contentMarkDown,
                        image: data.avatar,
                        backgroundImage: data.backgroundImage
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Save Clinic completed!'
                    })
                }
                else {
                    let Clinic = await db.Clinic.findOne({
                        where: { id: data.id },
                        raw: false
                    })
                    if (Clinic) {
                        Clinic.name = data.nameClinic;
                        Clinic.address = data.addressClinic;
                        Clinic.contentHTML = data.contentHTML;
                        Clinic.contentMarkDown = data.contentMarkDown;
                        Clinic.image = data.avatar;
                        Clinic.backgroundImage = data.backgroundImage;
                        await Clinic.save();
                        resolve({
                            errCode: 0,
                            errMessage: 'Edit Clinic completed!'
                        })
                    }
                    else {
                        resolve({
                            errCode: -1,
                            errMessage: 'Edit Clinic fail!'
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
let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({})
            resolve({
                errCode: 0,
                errMessage: 'Get All Clinic completed!',
                data: data
            })


        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let getDetailClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!clinicId) {
                resolve({
                    errCode: -2,
                    errMessage: 'Missing parameter!',
                    data: {}
                })
            }
            else {
                let data = {}


                data.doctorData = await db.Doctor_infor.findAll({
                    where: { clinicId: clinicId },
                    attributes: ['doctorId']
                })

                let arrOjbect = [];

                if (data.doctorData) {
                    data.doctorData.map(item => {
                        arrOjbect.push(item.doctorId)
                    })
                }
                if (arrOjbect) {
                    data.doctorData = arrOjbect;
                }
                data.clinicData = await db.Clinic.findOne({
                    where: { id: clinicId }
                })

                if (data) {
                    resolve({
                        errCode: 0,
                        errMessage: 'Get Clinic data completed!',
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
    createClinic, getAllClinic, getDetailClinic
}