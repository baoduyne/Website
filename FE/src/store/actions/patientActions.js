import actionTypes from "./actionTypes";
import { createBookingService } from "../../services/userService";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const createBookingStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DOCTOR_INFORMATIONS_START })
            let response = await createBookingService(data);

            if (response && response.errCode === 0) {
                dispatch(createBookingSuccess());
                toast.success('Đặt lịch thành công!', {
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
        }
        catch (e) {
            console.log(e);
            dispatch(createBookingFail());
        }
    }

}

export const createBookingSuccess = () => {
    return {
        type: actionTypes.GET_DOCTOR_INFORMATIONS_SUCCESS,

    }
}

export const createBookingFail = () => {
    return {
        type: actionTypes.GET_DOCTOR_INFORMATIONS_FAIL
    }
}