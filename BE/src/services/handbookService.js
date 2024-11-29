import db from "../models/index";

let createHandbook = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.title || !data.image || !data.contentMarkdown || !data.contentHTML || !data.specialtyId) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter!"
                })
            }
            else {

                let handbook;
                if (data.action === 'CREATE') {
                    handbook = await db.Handbook.create({
                        title: data.title,
                        image: data.image,
                        contentMarkdown: data.contentMarkdown,
                        contentHTML: data.contentHTML,
                        specialtyId: data.specialtyId
                    })
                }
                else {
                    handbook = await db.Handbook.findOne({
                        where: { id: data.id },

                        raw: false
                    })
                    if (handbook) {
                        handbook.title = data.title;
                        handbook.image = data.image;
                        handbook.contentMarkdown = data.contentMarkdown;
                        handbook.contentHTML = data.contentHTML;
                        handbook.specialtyId = data.specialtyId;

                        await handbook.save();
                    }
                }

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
                        where: { id: id },
                        include: { model: db.Specialty, as: 'SpecialtyData2' },
                    })
                }
                if (data) {

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