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
            console.log('test admin action',action);
            copyState.isLoading = true;
            console.log('test admin props',copyState);
            return {
                ...copyState
            }
        case actionTypes.FETCH_ALLCODE_SUCCESS:
            console.log('test admin action',action);
             copyState = {
                ...action.data
            }
            copyState.isLoading = false;
            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALLCODE_FAIL:
            console.log('test admin action',action);
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