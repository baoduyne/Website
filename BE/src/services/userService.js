import { reject } from "bcrypt/promises";
import db from "../models/index";
import bcrypt from "bcrypt";


let handleUserLogin = (email,password) =>{
    return new Promise(async (resolve,reject) =>{
        try{
            let userData = {  };
            let isExit = await checkUserEmail(email);
            

            if(isExit){
                let user = await db.User.findOne({
                    
                    attributes :['email','roleId',"password"],
                    where : {email : email,},
                    raw : true,
                })
                if(user){
                    
                    let check = await bcrypt.compareSync(password,user.password);
                
                    if(check){
                        delete user.password;
                        console.log(user);
                        userData = user;
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                    }
                    else{
                        userData.errCode = 3;
                        userData.errMessage = "Wrong Password!";
                    }
                }
                else{
                    userData.errCode = 2;
                    userData.errMessage = "User not found!";
                }
                resolve(userData);
            }
            else{
                //return err
                userData.errCode = 1;
                userData.errMessage = "Your's Email isnt exist in our system. Plesase try other email!";
                resolve(userData);
                
            }
        }
        catch(e){
            reject(e);
        }
    })
}



let checkUserEmail = (userEmail) =>{
    return new Promise(async (resolve,reject) =>{
        try{
            let user = await db.User.findOne({
                where : {
                    email : userEmail
                }
            });
          
            if(user){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }
        catch(e){
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin : handleUserLogin,
}