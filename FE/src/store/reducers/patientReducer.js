
import actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
    isLoading: true,
    specialtyData: [],
    arrDoctorId: [],
    selectedClinic: []
}

const patientReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.CREATE_BOOKING_START:
            return {
                ...state,
            }
        case actionTypes.CREATE_BOOKING_SUCCESS:

            return {
                ...state,
                isLoading: false

            }
        case actionTypes.CREATE_BOOKING_FAIL:
            return {
                ...state,
            }

        case actionTypes.GET_DETAIL_SPECIALTY_START:
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_SPECIALTY_SUCCESS:

            copyState = { ...state };

            if (action.data.specialtyData && !_.isEmpty(action.data.specialtyData)) {
                copyState.specialtyData = action.data.specialtyData;

            }
            else {
                copyState.arrDoctorId = action.data.doctorData;

            }

            return {
                ...copyState,
                isLoading: false
            }
        case actionTypes.GET_DETAIL_SPECIALTY_FAIL:
            return {
                ...state,
                isLoading: false
            }

        case actionTypes.GET_DETAIL_CLINIC_START:
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_CLINIC_SUCCESS:
            copyState = { ...state };
            copyState.selectedClinic = action.data.clinicData;
            copyState.arrDoctorId = action.data.doctorData;
            console.log('chec redux', copyState)
            return {
                ...copyState,
                isLoading: false
            }
        case actionTypes.GET_DETAIL_CLINIC_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

export default patientReducer;