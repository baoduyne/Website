import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoading: true,
    genders: [],
    roles: [],
    positions: [],
    times: [],
    status: [],
    users: [],
    topDoctors: []
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
        default:
            return { state }

    }
}

export default appReducer;