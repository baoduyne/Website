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

const getDoctorSchedulesService = (doctorId, date) => {
    return axios.get(`/api/get-doctor-schedules?doctorId=${doctorId}&date=${date}`);
}

const getDoctorInforsService = (doctorId) => {
    return axios.get(`/api/get-doctor-infors?id=${doctorId}`);
}

const createBookingService = (data) => {
    return axios.post('/api/create-booking', data);
}

const verifyUserBookingAppoinmentService = (token, doctorId) => {
    return axios.post(`/api/verify?token=${token}&doctorId=${doctorId}`);
}

const createSpecialtyService = (data) => {
    return axios.post('/api/create-specialty', data);
}

const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`);
}

const getDetailSpecialtyService = (specialtyId, provinceId, type) => {
    return axios.get(`/api/get-detail-specialty?specialtyId=${specialtyId}&provinceId=${provinceId}&type=${type}`,);
}

const createClinicService = (data) => {
    return axios.post('/api/create-clinic', data);
}

const getAllClinicService = () => {
    return axios.get(`/api/get-all-clinic`);
}

const getDetailClinicService = (clinicId) => {
    return axios.get(`/api/get-detail-clinic?clinicId=${clinicId}`,);
}
const getBookingService = (doctorId, time) => {
    return axios.get(`/api/get-booking-infor-for-doctor?doctorId=${doctorId}&time=${time}`,);
}


const sendBillToPatientService = (data) => {
    return axios.post('/api/send-bill-to-patient', data);
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
    saveDoctorSchedulesService,
    getDoctorSchedulesService,
    getDoctorInforsService,
    createBookingService, verifyUserBookingAppoinmentService,
    createSpecialtyService, getAllSpecialtyService, getDetailSpecialtyService,
    getDetailClinicService, getAllClinicService, createClinicService, getBookingService, sendBillToPatientService
}
