import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoading : true,
    genders: [],
    roles: [],
    positions: [],
    times: [],
    status: []
}

const appReducer = (state = initialState, action) => {
    let copyState = {...state};
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
          
            copyState = {...state};
            copyState.isLoading = false;
            return {
                ...copyState,
            }
        default:
            return { state }

    }
}

export default appReducer;