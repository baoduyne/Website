import actionTypes from "./actionTypes";
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctorsService,
    saveSelectDoctorService, getSelectDoctorService,
    saveDoctorSchedulesService, getDoctorSchedulesService,
    getDoctorInforsService, createSpecialtyService, getAllSpecialtyService,
    getDetailClinicService, getAllClinicService, createClinicService, getBookingService, sendBillToPatientService
} from "../../services/userService";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export const fetchAllCodeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALLCODE_START });
            let res = await getAllCodeService('ALL');
            let AllCode = res.data;
            let arrAllCode = {
                genders: [],
                roles: [],
                positions: [],
                times: [],
                status: [],
                provinces: []
            };
            if (res && res.errCode === 0) {
                AllCode.map((item, index) => {
                    if (item.type === 'ROLE') {
                        arrAllCode.roles.push(item);
                    }
                    if (item.type === 'GENDER') {
                        arrAllCode.genders.push(item);
                    }
                    if (item.type === 'POSITION') {
                        arrAllCode.positions.push(item);
                    }
                    if (item.type === 'TIME') {
                        arrAllCode.times.push(item);
                    }
                    if (item.type === 'STATUS') {
                        arrAllCode.status.push(item);
                    }
                    if (item.type === 'PROVINCE') {
                        arrAllCode.provinces.push(item)
                    }
                })
                dispatch(fetchAllCodeSuccess(arrAllCode));


            }
            else {
                dispatch(fetchAllCodeFail())
            }
        }
        catch (e) {
            console.log(e);
            dispatch(fetchAllCodeFail());
        }
    }
}

export const fetchAllCodeSuccess = (allcode) => {
    return {
        type: actionTypes.FETCH_ALLCODE_SUCCESS,
        data: allcode
    }
}

export const fetchAllCodeFail = () => {
    return {
        type: actionTypes.FETCH_ALLCODE_FAIL,

    }
}



export const saveUserAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess())
                dispatch(fetchUsersStart());
                toast.success('Add user completed!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }

        catch (e) {
            dispatch(saveUserFail())
            console.log(e);
        }
    }
}


export const saveUserSuccess = () => {
    return {
        type: actionTypes.SAVE_USER_SUCCESS
    }
}

export const saveUserFail = () => {
    return {
        type: actionTypes.SAVE_USER_FAIL
    }
}

export const fetchUsersStart = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.FETCH_ALLCODE_START })

            let res = await getAllUsers('ALL');


            if (res && res.errCode === 0) {
                dispatch(fetchUsersSuccess(res.users.reverse()))
            }

        }

        catch (e) {
            dispatch(fetchUsersFail())
            console.log(e);
        }
    }

}

export const fetchUsersSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        data: data
    }
}


export const fetchUsersFail = () => {
    return {
        type: actionTypes.FETCH_USERS_FAIL
    }
}


export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.DELETE_USER_START })
            let res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                dispatch(fetchUsersStart())
                dispatch(deleteUsersSuccess())
            }
        }

        catch (e) {
            dispatch(deleteUsersFail())
            console.log(e);
        }
    }

}
export const deleteUsersSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        data: data
    }
}


export const deleteUsersFail = () => {
    return {
        type: actionTypes.FETCH_USERS_FAIL
    }
}



export const editUserStart = (user) => {

    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.EDIT_USER_START })
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                dispatch(fetchUsersStart())
                dispatch(editUsersSuccess());
                toast.success('Edit user completed!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
        }

        catch (e) {
            dispatch(editUsersFail())
            console.log(e);
        }
    }

}
export const editUsersSuccess = (data) => {
    return {
        type: actionTypes.EDIT_USER_SUCCESS,
        data: data
    }
}


export const editUsersFail = () => {
    return {
        type: actionTypes.EDIT_USER_FAIL
    }
}

export const fetchTopDoctorStart = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_START })
            let res = await getTopDoctorHomeService(limit);
            if (res && res.errCode === 0) {
                dispatch(fetchDoctorSuccess(res.data))
            }
            else {
                dispatch(fetchDoctorFail())
            }
        }

        catch (e) {
            console.log(e);
            dispatch(fetchDoctorFail());
        }
    }
}

export const fetchDoctorSuccess = (data) => {
    return {
        type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
        data: data
    }
}

export const fetchDoctorFail = () => {
    return {
        type: actionTypes.FETCH_TOP_DOCTORS_FAIL
    }
}


export const getAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.GET_ALL_DOCTORS_START })
            let res = await getAllDoctorsService();

            if (res && res.errCode === 0) {
                dispatch(getAllDoctorsSuccess(res.data));
            }
        }
        catch (e) {
            console.log(e);
            dispatch(getAllDoctorsFail());
        }
    }

}

export const getAllDoctorsSuccess = (data) => {
    return {
        type: actionTypes.GET_ALL_DOCTORS_SUCCESS,
        data: data
    }
}

export const getAllDoctorsFail = () => {
    return {
        type: actionTypes.GET_ALL_DOCTORS_FAIL
    }
}

export const saveSelectDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.SAVE_SELECT_DOCTOR_START })

            let res = await saveSelectDoctorService(data);
            toast("Compiling...");

            if (res && res.errCode === 0) {
                console.log('3');
                dispatch(saveSelectDoctorSuccess());

            }

            else {
                toast.fail('Save doctor failed!')
            }
        }
        catch (e) {
            console.log(e);
            dispatch(saveSelectDoctorFail());

        }
    }

}

export const saveSelectDoctorSuccess = () => {
    toast.success('Save doctor information completed!');
    return {

        type: actionTypes.SAVE_SELECT_DOCTOR_SUCCESS,
    }
}

export const saveSelectDoctorFail = () => {
    toast.fail('Save doctor failed!',)
    return {
        type: actionTypes.SAVE_SELECT_DOCTOR_FAIL
    }
}


export const getSelectDoctorStart = (id) => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.GET_SELECT_DOCTOR_START })
            let res = await getSelectDoctorService(id);

            if (res && res.errCode === 0) {
                dispatch(getSelectDoctorSuccess(res.data));

            }

            else {
                toast.fail('Get doctor failed!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
        }
        catch (e) {
            console.log(e);
            dispatch(getSelectDoctorFail());
            toast.fail('Get doctor failed!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

}

export const getSelectDoctorSuccess = (data) => {
    return {
        type: actionTypes.GET_SELECT_DOCTOR_SUCCESS,
        data: data
    }
}

export const getSelectDoctorFail = () => {
    return {
        type: actionTypes.GET_SELECT_DOCTOR_FAIL
    }
}


export const getScheduleStart = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.GET_SCHEDULE_START })
            let res = await getAllCodeService('TIME');

            if (res && res.errCode === 0) {
                dispatch(getScheduleSuccess(res.data));

            }

            else {
                toast.fail('Get doctor failed!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
        }
        catch (e) {
            console.log(e);
            dispatch(getScheduleFail());
            toast.fail('Get doctor failed!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

}

export const getScheduleSuccess = (data) => {
    return {
        type: actionTypes.GET_SCHEDULE_SUCCESS,
        data: data
    }
}

export const getScheduleFail = () => {
    return {
        type: actionTypes.SAVE_DOCTOR_SCHEDULES_FAIL
    }
}


export const saveDoctorSchedulesStart = (data) => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.SAVE_DOCTOR_SCHEDULES_START })
            let res = await saveDoctorSchedulesService(data);

            if (res && res.errCode === 0) {
                dispatch(saveDoctorSchedulesSuccess(res.message));
                toast.success('Saved complete!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
            else {
                toast('FAIL!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }
        catch (e) {
            console.log(e);
            dispatch(saveDoctorSchedulesFail());
            toast('FAIL!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

}

export const saveDoctorSchedulesSuccess = () => {
    return {
        type: actionTypes.SAVE_DOCTOR_SCHEDULES_SUCCESS,
    }
}

export const saveDoctorSchedulesFail = () => {
    return {
        type: actionTypes.SAVE_DOCTOR_SCHEDULES_FAIL
    }
}


export const getDoctorSchedulesStart = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.GET_DOCTOR_SCHEDULES_START })
            let res = await getDoctorSchedulesService(doctorId, date);

            if (res && res.errCode === 0) {

                dispatch(getDoctorSchedulesSuccess(res.data));
            }
            else {

            }
        }
        catch (e) {
            console.log(e);
            dispatch(getDoctorSchedulesFail());
        }
    }

}

export const getDoctorSchedulesSuccess = (data) => {
    return {
        type: actionTypes.GET_DOCTOR_SCHEDULES_SUCCESS,
        data: data
    }
}

export const getDoctorSchedulesFail = () => {
    return {
        type: actionTypes.GET_DOCTOR_SCHEDULES_FAIL
    }
}



export const getDoctorInformationAllCodeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DOCTOR_INFROMATION_ALLCODE_START })

            let dataAllCode = {
                priceData: {},
                paymentData: {},
                provinceData: {},
            }
            dataAllCode.priceData = await getAllCodeService('PRICE');
            dataAllCode.paymentData = await getAllCodeService('PAYMENT');
            dataAllCode.provinceData = await getAllCodeService('PROVINCE');

            if (dataAllCode && dataAllCode.priceData && dataAllCode.priceData.errCode === 0) {
                dispatch(getDoctorInformationAllCodeSuccess(dataAllCode));
            }
        }
        catch (e) {
            console.log(e);
            dispatch(getDoctorInformationAllCodeFail());
        }
    }

}

export const getDoctorInformationAllCodeSuccess = (data) => {
    return {
        type: actionTypes.GET_DOCTOR_INFROMATION_ALLCODE_SUCCESS,
        data: data
    }
}

export const getDoctorInformationAllCodeFail = () => {
    return {
        type: actionTypes.GET_DOCTOR_INFROMATION_ALLCODE_FAIL
    }
}



export const getDoctorInformationsStart = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DOCTOR_INFORMATIONS_START })
            let response = await getDoctorInforsService(doctorId);


            if (response && response.errCode === 0) {
                dispatch(getDoctorInformationsSuccess(response.data));
            }
        }
        catch (e) {
            console.log(e);
            dispatch(getDoctorInformationsFail());
        }
    }

}

export const getDoctorInformationsSuccess = (data) => {
    return {
        type: actionTypes.GET_DOCTOR_INFORMATIONS_SUCCESS,
        data: data
    }
}

export const getDoctorInformationsFail = () => {
    return {
        type: actionTypes.GET_DOCTOR_INFORMATIONS_FAIL
    }
}

export const createSpecialtyStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_SPECIALTY_START })

            toast('Đang xử lý thông tin chuyên khoa...', {
                position: "bottom-right",
                autoClose: 2800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });


            let response = await createSpecialtyService(data);

            if (response && response.errCode === 0) {
                dispatch(createSpecialtySuccess());
            }
            else {
                dispatch(createSpecialtyFail());
            }
        }
        catch (e) {
            console.log(e);
            dispatch(createSpecialtyFail());
        }
    }

}

export const createSpecialtySuccess = () => {
    toast.success('Xử lý chuyên khoa thành công!');

    return {
        type: actionTypes.CREATE_SPECIALTY_SUCCESS,
    }
}

export const createSpecialtyFail = () => {
    toast.warn('Có lỗi xảy ra vui lòng kiểm tra lại thông tin!');
    return {
        type: actionTypes.CREATE_SPECIALTY_FAIL

    }
}


export const getAllSpecialtyStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ALL_SPECIALTY_START })


            let response = await getAllSpecialtyService();

            if (response && response.errCode === 0) {
                dispatch(getAllSpecialtySuccess(response.data));
            }
            else {
                dispatch(getAllSpecialtyFail());
            }
        }
        catch (e) {
            console.log(e);
            dispatch(getAllSpecialtyFail());
        }
    }

}

export const getAllSpecialtySuccess = (data) => {

    return {
        type: actionTypes.GET_ALL_SPECIALTY_SUCCESS,
        data: data
    }
}

export const getAllSpecialtyFail = () => {
    toast.warn('Có lỗi xảy ra vui lòng kiểm tra lại thông tin!');
    return {
        type: actionTypes.GET_ALL_SPECIALTY_FAIL
    }
}


export const createClinicStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_CLINIC_START })

            toast('Đang xử lý thông tin phòng khám...', {
                position: "bottom-right",
                autoClose: 2800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });


            let response = await createClinicService(data);

            if (response && response.errCode === 0) {
                dispatch(createClinicSuccess());
            }
            else {
                dispatch(createClinicFail());
            }
        }
        catch (e) {
            console.log(e);
            dispatch(createClinicFail());
        }
    }

}

export const createClinicSuccess = () => {
    toast.success('Xử lý phòng khám thành công!');

    return {
        type: actionTypes.CREATE_CLINIC_SUCCESS,
    }
}

export const createClinicFail = () => {
    toast.warn('Có lỗi xảy ra vui lòng kiểm tra lại thông tin!');
    return {
        type: actionTypes.CREATE_CLINIC_FAIL

    }
}


export const getAllClinicStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ALL_CLINIC_START })


            let response = await getAllClinicService();

            if (response && response.errCode === 0) {
                dispatch(getAllClinicSuccess(response.data));
            }
            else {
                dispatch(getAllClinicFail());
            }
        }
        catch (e) {
            console.log(e);
            dispatch(getAllClinicFail());
        }
    }

}

export const getAllClinicSuccess = (data) => {

    return {
        type: actionTypes.GET_ALL_CLINIC_SUCCESS,
        data: data
    }
}

export const getAllClinicFail = () => {
    toast.warn('Có lỗi xảy ra vui lòng kiểm tra lại thông tin!');
    return {
        type: actionTypes.GET_ALL_CLINIC_FAIL
    }
}


export const getBookingStart = (doctorId, time) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_BOOKING_START })


            let response = await getBookingService(doctorId, time);

            if (response && response.errCode === 0) {
                dispatch(getBookingSuccess(response.data));
            }
            else {
                dispatch(getBookingFail());
            }
        }
        catch (e) {
            console.log(e);
            dispatch(getBookingFail());
        }
    }

}

export const getBookingSuccess = (data) => {

    return {
        type: actionTypes.GET_BOOKING_SUCCESS,
        data: data
    }
}

export const getBookingFail = () => {
    toast.warn('Có lỗi xảy ra vui lòng kiểm tra lại thông tin!');
    return {
        type: actionTypes.GET_BOOKING_FAIL
    }
}

export const sendBillStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SEND_BILL_START })

            toast('Đang xử lý thông tin hóa đơn...', {
                position: "bottom-right",
                autoClose: 2800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            let response = await sendBillToPatientService(data);

            if (response && response.errCode === 0) {
                dispatch(sendBillSuccess(response.data));
            }
            else {
                dispatch(sendBillFail());
            }
        }
        catch (e) {
            console.log(e);
            dispatch(sendBillFail());
        }
    }

}

export const sendBillSuccess = (data) => {
    toast.success('Gửi hóa đơn thành công!');
    return {
        type: actionTypes.SEND_BILL_SUCCESS,
        data: data
    }
}

export const sendBillFail = () => {
    toast.warn('Có lỗi xảy ra vui lòng kiểm tra lại thông tin!');
    return {
        type: actionTypes.SEND_BILL_FAIL
    }
}