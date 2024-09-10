import actionTypes from "../actions/actionTypes";

const initialState = {
    genders :[],
    roles :[],
    positions:[]
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log("check admin redux state",action);
            
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log("check admin redux state",action);
            let copyState = {...initialState};
            copyState.genders = action.data;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAIL:
            console.log("check admin redux state",action);
            return {
                ...state
            }
        default :
            return state;
    }
}

export default appReducer;