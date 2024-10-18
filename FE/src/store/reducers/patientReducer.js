
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: true
}

const patientReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export default patientReducer;