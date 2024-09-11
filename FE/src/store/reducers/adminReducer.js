import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender : false,
    genders: [],
    roles: [],
    positions: [],
    times: [],
    status: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALLCODE_START:
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SUCCESS:
            let copyState = {
                ...action.data
            }
          
            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALLCODE_FAIL:
            return {
                ...state,

            }
        default:
            return { state }

    }
}

export default appReducer;