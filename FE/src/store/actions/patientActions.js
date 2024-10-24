import actionTypes from "./actionTypes";
import { createBookingService, getDetailSpecialtyService } from "../../services/userService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { emitter } from '../../utils/emitter';

export const createBookingStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DOCTOR_INFORMATIONS_START })

            toast('Đang xác nhận lịch khám...', {
                position: "bottom-right",
                autoClose: 2800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });


            let response = await createBookingService(data);

            if (response && response.errCode === 0) {
                dispatch(createBookingSuccess());
            }
            else {
                dispatch(createBookingFail());
            }
        }
        catch (e) {
            console.log(e);
            dispatch(createBookingFail());
        }
    }

}

export const createBookingSuccess = () => {
    toast.success('Đặt lịch thành công!');


    return {
        type: actionTypes.GET_DOCTOR_INFORMATIONS_SUCCESS,
    }
}

export const createBookingFail = () => {
    toast.warn('Có lỗi xảy ra vui lòng kiểm tra lại thông tin!');
    return {
        type: actionTypes.GET_DOCTOR_INFORMATIONS_FAIL

    }
}

export const getDetailSpecialtyStart = (specialtyId, provinceId, type) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DETAIL_SPECIALTY_START })

            let response = await getDetailSpecialtyService(specialtyId, provinceId, type);

            if (response && response.errCode === 0) {
                dispatch(getDetailSpecialtySuccess(response.data));
            }
            else {
                dispatch(getDetailSpecialtyFail());
            }
        }
        catch (e) {
            console.log(e);
            dispatch(getDetailSpecialtyFail());
        }
    }

}

export const getDetailSpecialtySuccess = (data) => {
    return {
        type: actionTypes.GET_DETAIL_SPECIALTY_SUCCESS,
        data: data
    }
}

export const getDetailSpecialtyFail = () => {
    toast.warn('Có lỗi xảy ra vui lòng kiểm tra lại thông tin!');
    return {
        type: actionTypes.GET_DETAIL_SPECIALTY
    }
}