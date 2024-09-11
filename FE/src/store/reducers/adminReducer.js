import actionTypes from "../actions/actionTypes";

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    times: [],
    status: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALLCODE_START:
            console.log("check action", action);


            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SUCCESS:
            let genders_ = [];
            let roles_ = [];
            let positions_ = [];
            let times_ = [];
            let status_ = [];


            action.data.map((item, index) => {
                if (item.type === "ROLE") {
                    roles_.push(item)
                }
                if (item.type === "GENDER") {
                    genders_.push(item)
                }
                if (item.type === "STATUS") {
                    status_.push(item)
                }
                if (item.type === "TIME") {
                    times_.push(item)
                }
                if (item.type === "POSITION") {
                    positions_.push(item);
                }

            })

            let copyState = {
                roles: roles_,
                genders: genders_,
                positions: positions_,
                times: times_,
                status: status_
            }
            return {
                ...copyState,
                
            }
        case actionTypes.FETCH_ALLCODE_FAIL:
            console.log("check action", action);
            return {
                ...state,
                
            }
        default:
            return { state }

    }
}

export default appReducer;