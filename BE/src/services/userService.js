import { reject } from "bcrypt/promises";
import db from "../models/index";
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExit = await checkUserEmail(email);


            if (isExit) {
                let user = await db.User.findOne({

                    attributes: ['email', 'roleId', 'firstName', 'lastName', "password"],
                    where: { email: email, },
                    raw: true,
                })
                if (user) {

                    let check = await bcrypt.compareSync(password, user.password);

                    if (check) {
                        delete user.password;
                        console.log(user);
                        userData = user;
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong Password!";
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = "User not found!";
                }
                resolve(userData);
            }
            else {
                //return err
                userData.errCode = 1;
                userData.errMessage = "Your's Email isnt exist in our system. Plesase try other email!";
                resolve(userData);

            }
        }
        catch (e) {
            reject(e);
        }
    })
}



let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            });

            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = 'abc';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"]
                    },
                    raw: true,
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ["password"]
                    },
                    raw: true
                });

            }
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })
}


let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCoder: 1,
                    errMessage: "Your email has already in our system.Please try other email!"
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                const avatarBuffer = data.avatar instanceof Buffer ? data.avatar : Buffer.from(data.avatar, 'base64');
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    avatar: data.avatar,
                    gender: data.genderId,
                    roleId: data.roleId,
                    positionId: data.positionId
                })


                resolve({
                    errCode: 0,
                    errMessage: "OK",
                });

            }

        }
        catch (e) {
            console.log('start');
            console.log(e);
            //reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {


            let user = await db.User.findOne({
                where: { id: userId }
            });

            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "User not found!"
                })
            }
            await user.destroy();
            resolve({
                errCode: 0,
                errMessage: "Deleted user!"
            });
        }

        catch (e) {
            reject(e);
        }
    })
}


let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }
        catch (e) {
            reject(e);
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                raw: false,
                where: { id: data.id },
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "User not found!"
                })
            }

            const avatarBuffer = data.avatar instanceof Buffer ? data.avatar : Buffer.from(data.avatar, 'base64');

            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.roleId = data.roleId;
            user.positionId = data.positionId;
            user.gender = data.gender;
            user.phoneNumber = data.phoneNumber;
            user.avatar = data.avatar;



            await user.save();
            resolve({
                errCode: 0,
                errMessage: "Done!"
            })
        }
        catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let allCode = {};
            if (type === 'ALL') {
                allCode = await db.Allcode.findAll();

            }
            else {
                allCode = await db.Allcode.findAll(
                    { where: { type: type } }
                );

            }

            if (allCode) {
                res.errCode = 0;
                res.errMessage = 'done';
                res.data = allCode;
            }
            else {
                res.errCode = 1;
                res.errMessage = "Missing object!"
            }
            resolve(res);
        }
        catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllCodeService: getAllCodeService
}