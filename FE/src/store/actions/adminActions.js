import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';
export const fetchGenderStart = () =>{
    return async (dispatch,getState) => {
    try{
        let res = await getAllCodeService('GENDER');
        if(res &&res.data.errCode === 0){
            dispatch(fetchGenderSuccess(res.data.errMessage));
        }
        else{
            dispatch(fetchGenderFail());
        }
    }
    catch(e){
        console.log(e);
    }
    }
}

export const fetchGenderSuccess = (genderData) =>({
   
        type : actionTypes.FETCH_GENDER_SUCCESS,
        data : genderData
})

export const fetchGenderFail = () =>({
  
        type : actionTypes.FETCH_GENDER_FAIL
    
})