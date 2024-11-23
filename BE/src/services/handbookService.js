import db from "../models/index";

let createHandbook = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.contentMarkdown || !data.contentHTML || !data.specialtyId) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter!"
                })
            }
            else {

                let handbook = await db.Handbook.create({
                    contentMarkdown: data.contentMarkdown,
                    contentHTML: data.contentHTML,
                    specialtyId: data.specialtyId
                }
                )
                if (handbook) {
                    resolve({
                        errCode: 0,
                        errMessage: "save handbook data complete!"
                    })
                }
                else {
                    resolve({
                        errCode: -1,
                        errMessage: "Err from sever!"
                    })
                }

            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let getDataHandbook = async (type, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter!"
                })
            }
            else {
                let data = '';
                if (type === 'ALL') {
                    data = await db.Handbook.findAll()
                }
                else {
                    data = await db.Handbook.findOne({
                        where: { id: id }
                    })
                }
                if (data) {
                    console.log(data)
                    resolve({
                        errCode: 0,
                        errMessage: "get handbook data complete!",
                        data: data
                    })
                }
                else {
                    resolve({
                        errCode: -1,
                        errMessage: "Err from sever!"
                    })
                }



            }
        }
        catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createHandbook,
    getDataHandbook
}