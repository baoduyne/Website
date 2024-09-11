import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";
export const fetchAllCodeStart = () =>{
    return async (dispatch,getState) =>{
        try{
           let res = await getAllCodeService('ALL'); 
    
           if(res && res.errCode === 0){
            dispatch(fetchAllCodeSuccess(res.data));
           }
           else{
            dispatch(fetchAllCodeFail())
           }
        }
        catch(e){
            console.log(e);
        }
    }
}

export const fetchAllCodeSuccess = (allcode) =>{
    return {
        type:actionTypes.FETCH_ALLCODE_SUCCESS,
        data:allcode
    }
}

export const fetchAllCodeFail = () =>{
    return {
        type:actionTypes.FETCH_ALLCODE_FAIL,
        
    }
}

