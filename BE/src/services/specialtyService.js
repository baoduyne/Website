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

module.exports = {
    createSpecialty, getAllSpecialty
}