import db from "../models/index";

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = await db.User.findAll({
                limit: +limit,
                order: [['createdAt', 'DESC']],
                where : {roleId : 'R2'},
                attributes: {
                    exclude: ['password']
                },
                include:[
                    {model : db.Allcode,as:'positionData',attributes:['valueEn','valueVi']},
                    {model : db.Allcode,as:"genderData",attributes:['valueEn','valueVi']}
                ],
                raw : true,
                nest:true
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

 let getAllDoctors = () =>{
    return new Promise( async (resolve,reject) =>{
        try{
            let doctors = await db.User.findAll({
                where : {roleId : 'R2'},
                attributes: {
                    exclude: ['password','avatar']
                },
            })
          
            resolve({
                doctors
            })
        }
        catch(e){
            reject(e);
        }
    }) 
 }


module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors : getAllDoctors
}