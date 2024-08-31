import axios from "axios"

const getAllUsers = (inputId) =>{
   return axios.get(`/api/get-all-users?id=${inputId}`,{id:inputId})
}

const deleteUser = (id) =>{
   return axios.delete('/api/delete-user',id)
}

const editUser = (data) =>{
   return axios.put("/api/edit-user",data)
}

export {getAllUsers,deleteUser,editUser}