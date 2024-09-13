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
        case actionTypes.SAVE_USER_SUCCESS : 
            console.log('check action',action);
            return {
                ...state
            }
        case actionTypes.SAVE_USER_FAIL :
            console.log('check action',action);
            return {
                
                ...state
            }
        default:
            return { state }

    }
}

export default appReducer;