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
                await db.Specialty.create({
                    name: data.nameSpecialty,
                    descriptionHTML: data.descriptionHTML,
                    contentMarkdown: data.contentMarkdown,
                    image: data.avatar
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Save specialty completed!'
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
    createSpecialty
}