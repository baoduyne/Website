import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter!'
        });
    }
 
        let userData = await userService.handleUserLogin(email, password);

        return res.status(200).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            user: userData ? userData : {},
        });
   

}

let handleGetAllUsers = async (req, res) => {
   
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter",
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "Ok",
        users
    });
    
    
}

function getBase64ImageSize(base64String) {
    // Remove the data URL prefix if it exists
    const base64WithoutPrefix = base64String.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    
    // Calculate the size
    const sizeInBytes = (base64WithoutPrefix.length * 3) / 4;
    return sizeInBytes;
}

let handleCreateNewUser = async (req, res) => {
    let size = getBase64ImageSize(req.body.avatar);
    console.log(size);
    let message = await userService.createNewUser(req.body);

    return res.status(200).json({
        errCode:message.errCode,
        errMessage :message.errMessage
    });
}

let handleDeleteUser = async (req,res) =>{
    
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage: `Missing required parameter!`
        })

    }
    let message = await userService.deleteUser(req.body.id);
    res.status(200).json({
        errCode : message.errCode,
        errMessage : message.errMessage,
    })
}

let handleEditUser = async (req,res) =>{
    let data = req.body;
    if(!data.id){
        res.status(200).json({
            errCode:1,
            errMessage:"Missing required parameter!",
        })
    }

    let message = await userService.editUser(data);

    res.status(200).json({
        errCode:message.errCode,
        errMessage : message.errMessage
    })

}

let getAllCode = async (req,res) =>{
    try{
        let type = req.query.type;
        
        if(type){
           
                let data = await userService.getAllCodeService(type);
                return res.status(200).json({
                    ...data
                })
        
        }
        else{
            return res.status(200).json({
                errCode : 1,
                errMessage: "Missing parameter!"
            })
        }
    }
    catch(e){
        return res.status(200).json({
            errCode:-1,
            errMessage:"Error from sever"
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser : handleEditUser,
    handleDeleteUser : handleDeleteUser,
    getAllCode : getAllCode
}