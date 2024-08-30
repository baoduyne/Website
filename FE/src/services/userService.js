import axios from '../axios';
 
const handleLoginApi = (userEmail,userPassword) => {
    return axios.post('/api/login',{email:userEmail,password:userPassword});
}

const getAllUsers = (inputId) =>{
    return axios.get(`/api/get-all-users?id=${inputId}`,{id:inputId})
}

const createNewUserService = (data) =>{
    return axios.post('/api/create-new-user',data);
}

const deleteUserService = (id) =>{
    return axios.delete('/api/delete-user',{
        data:{
            id:id
        }
    });
}

const editUserService = (userData) =>{
    return axios.put('/api/edit-user',userData)
}

export {handleLoginApi,getAllUsers,createNewUserService,deleteUserService,editUserService}
