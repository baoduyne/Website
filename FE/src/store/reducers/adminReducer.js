import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoading: true,
    genders: [],
    roles: [],
    positions: [],
    times: [],
    status: [],
    provinces: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    selectDoctor: {},
    allSchedules: [],
    allDoctorSchedules: [],
    priceData: [],
    paymentData: [],
    provinceData: [],
    doctorInfors: [],
    allSpecialty: [],
    allClinic: [],
    allBooking: [],
    allHandbook: [],
}

const appReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.FETCH_ALLCODE_START:

            copyState.isLoading = true;

            return {
                ...copyState
            }
        case actionTypes.FETCH_ALLCODE_SUCCESS:

            copyState = {
                ...action.data
            }
            copyState.isLoading = false;
            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALLCODE_FAIL:

            copyState = { ...state };
            copyState.isLoading = false;
            return {
                ...copyState,
            }
        case actionTypes.SAVE_USER_SUCCESS:

            return {
                ...state
            }
        case actionTypes.SAVE_USER_FAIL:

            return {

                ...state
            }
        case actionTypes.FETCH_USERS_START:
            return {
                ...state
            }
        case actionTypes.FETCH_USERS_SUCCESS:
            copyState = { ...state };
            copyState.users = action.data;
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.DELETE_USER_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.DELETE_USER_START:
            return {
                ...state
            }
        case actionTypes.DELETE_USER_SUCCESS:
            copyState = { ...state };
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.DELETE_USER_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.EDIT_USER_START:
            return {
                ...state
            }
        case actionTypes.EDIT_USER_SUCCESS:
            copyState = { ...state };
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.EDIT_USER_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.FETCH_TOP_DOCTORS_START:
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:

            copyState = { ...state }
            copyState.topDoctors = action.data;

            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.GET_ALL_DOCTORS_START:
            return {
                ...state
            }
        case actionTypes.GET_ALL_DOCTORS_SUCCESS:
            copyState = { ...state }
            copyState.allDoctors = action.data;
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.GET_ALL_DOCTORS_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.SAVE_SELECT_DOCTOR_START:
            return {
                ...state
            }
        case actionTypes.SAVE_SELECT_DOCTOR_SUCCESS:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.SAVE_SELECT_DOCTOR_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.GET_SELECT_DOCTOR_START:
            return {
                ...state
            }
        case actionTypes.GET_SELECT_DOCTOR_SUCCESS:
            copyState = { ...state }
            copyState.isLoading = false;
            copyState.selectDoctor = action.data;
            return {
                ...copyState
            }
        case actionTypes.GET_SELECT_DOCTOR_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.GET_SCHEDULE_START:
            return {
                ...state
            }
        case actionTypes.GET_SCHEDULE_SUCCESS:
            copyState = { ...state }
            copyState.isLoading = false;
            copyState.allSchedules = action.data;
            return {
                ...copyState
            }
        case actionTypes.GET_SCHEDULE_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.SAVE_DOCTOR_SCHEDULES_START:
            return {
                ...state
            }
        case actionTypes.SAVE_DOCTOR_SCHEDULES_SUCCESS:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.SAVE_DOCTOR_SCHEDULES_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.GET_DOCTOR_SCHEDULES_START:
            return {
                ...state
            }
        case actionTypes.GET_DOCTOR_SCHEDULES_SUCCESS:
            copyState = { ...state }
            copyState.allDoctorSchedules = action.data;
            copyState.isLoading = false;

            return {
                ...copyState
            }
        case actionTypes.GET_DOCTOR_SCHEDULES_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }


        case actionTypes.GET_DOCTOR_INFROMATION_ALLCODE_START:
            return {
                ...state
            }
        case actionTypes.GET_DOCTOR_INFROMATION_ALLCODE_SUCCESS:
            copyState = { ...state }

            copyState.priceData = action.data.priceData.data;
            copyState.paymentData = action.data.paymentData.data;
            copyState.provinceData = action.data.provinceData.data;
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.GET_DOCTOR_INFROMATION_ALLCODE_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.GET_DOCTOR_INFORMATIONS_START:
            return {
                ...state
            }
        case actionTypes.GET_DOCTOR_INFORMATIONS_SUCCESS:
            copyState = { ...state }

            copyState.doctorInfors = action.data;
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.GET_DOCTOR_INFORMATIONS_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.CREATE_SPECIALTY_START:
            copyState = { ...state }
            return {
                ...state
            }
        case actionTypes.CREATE_SPECIALTY_SUCCESS:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.CREATE_SPECIALTY_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.GET_ALL_SPECIALTY_START:
            copyState = { ...state }
            return {
                ...copyState
            }
        case actionTypes.GET_ALL_SPECIALTY_SUCCESS:
            copyState = { ...state }
            copyState.allSpecialty = action.data
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.GET_ALL_SPECIALTY_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.CREATE_SPECIALTY_START:
            copyState = { ...state }
            return {
                ...state
            }
        case actionTypes.CREATE_SPECIALTY_SUCCESS:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.CREATE_SPECIALTY_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.GET_ALL_SPECIALTY_START:
            copyState = { ...state }
            return {
                ...copyState
            }
        case actionTypes.GET_ALL_SPECIALTY_SUCCESS:
            copyState = { ...state }
            copyState.allSpecialty = action.data
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.GET_ALL_SPECIALTY_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.CREATE_CLINIC_START:
            copyState = { ...state }
            return {
                ...state
            }
        case actionTypes.CREATE_CLINIC_SUCCESS:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.CREATE_CLINIC_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.GET_ALL_CLINIC_START:
            copyState = { ...state }
            return {
                ...copyState
            }
        case actionTypes.GET_ALL_CLINIC_SUCCESS:
            copyState = { ...state }
            copyState.allClinic = action.data
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.GET_ALL_CLINIC_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.GET_BOOKING_START:
            copyState = { ...state }
            return {
                ...copyState
            }
        case actionTypes.GET_BOOKING_SUCCESS:
            copyState = { ...state }
            copyState.allBooking = action.data
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.GET_BOOKING_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.SEND_BILL_START:
            copyState = { ...state }
            return {
                ...copyState
            }
        case actionTypes.SEND_BILL_SUCCESS:
            copyState = { ...state }

            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.SEND_BILL_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.CREATE_CLINIC_START:
            copyState = { ...state }
            return {
                ...state
            }
        case actionTypes.CREATE_CLINIC_SUCCESS:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.CREATE_CLINIC_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.GET_DATA_HANDBOOK_START:
            copyState = { ...state }
            return {
                ...copyState
            }
        case actionTypes.GET_DATA_HANDBOOK_SUCCESS:
            copyState = { ...state }
            copyState.allHandbook = action.data
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.GET_DATA_HANDBOOK_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        case actionTypes.DELETE_BILL_START:
            copyState = { ...state }
            return {
                ...copyState
            }
        case actionTypes.DELETE_BILL_SUCCESS:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.DELETE_BILL_FAIL:
            copyState = { ...state }
            copyState.isLoading = false;
            return {
                ...copyState
            }

        default:
            return { state }

    }
}

export default appReducer;