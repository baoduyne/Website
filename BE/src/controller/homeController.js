import db from'../models/index';
import CRUD from "../services/CRUDService"
import userController from "../controller/userController"
let getHomePage = async (req,res) => {
    try{
        // //let data = await db.User.findAll();
        // //console.log("----------");
        // //console.log(data);
        // console.log("----------");
        return res.render("homepage.ejs",);//{data: JSON.stringify(data) });
    }
    catch(e){
        console.log(e);
    }
}

let getAboutPage = (req,res) =>{
    return res.render("test/aboutpage.ejs");

}
let getCRUD = (req,res) => {
    return res.render("crud.ejs");
}
let postCRUD = async (req,res) =>{
    await CRUD.createNewUser(req.body);
    let data = await CRUD.getAllUser();
    return res.render('displayCRUD.ejs',{
        dataTable:data
    });
}

let displayGetCRUD = async (req,res) => {
let data = await CRUD.getAllUser();
    console.log("--------------");
    console.log(data);
    console.log("-------------");
return res.render('displayCRUD.ejs',{
    dataTable: data,
});
}


let getEditCRUD = async (req,res) =>{
    let userId = req.query.id;
    let userData = await CRUD.getUserInfoById(userId);
    if(userId){
    console.log(userData);
    }
    else{
        return res.send("Null");
    }
    return res.render("editCRUD.ejs",{
        userData:userData
    });
}

let putCRUD = async (req,res) =>{
    let data = req.body;
    let allUsers = await CRUD.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        dataTable:allUsers
    })
}

let deleteCRUD = async (req,res) =>{
    let userId = req.query.id;
    if(userId){
    await CRUD.deleteUserById(userId);
    return res.send("Delete user successed");
    }
    else{
    return res.send("User not found");
    }
}

module.exports = {
    getHomePage : getHomePage,
    getAboutPage : getAboutPage,
    getCRUD : getCRUD,
    postCRUD : postCRUD,
    displayGetCRUD : displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD : putCRUD,
    deleteCRUD:deleteCRUD,
}