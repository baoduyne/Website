import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId })
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: id
        }
    });
}

const editUserService = (userData) => {
    return axios.put('/api/edit-user', userData)
}

const getAllCodeService = (type) => {
    return axios.get(`/api/allcode?type=${type}`, { type: type });
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/get-top-doctor-home?limit=${limit}`)
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveSelectDoctorService = (inforDoctor) => {

    return axios.post(`/api/save-select-doctor`, inforDoctor);
}

const getSelectDoctorService = (id) => {
    return axios.get(`/api/get-doctor-markdown?id=${id}`);
}

const saveDoctorSchedulesService = (data) => {
    return axios.post('/api/save-doctor-schedules', data);
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveSelectDoctorService,
    getSelectDoctorService,
    saveDoctorSchedulesService
}
