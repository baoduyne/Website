import actionTypes from "./actionTypes";
import { getAllCodeService ,createNewUserService } from "../../services/userService";
export const fetchAllCodeStart = () =>{
    return async (dispatch,getState) =>{
        try{
            dispatch({type:actionTypes.FETCH_ALLCODE_START});
           let res = await getAllCodeService('ALL'); 
           let AllCode = res.data;
           let arrAllCode = {
            genders: [],
            roles: [],
            positions: [],
            times: [],
            status: []
           };
           if(res && res.errCode === 0){
            AllCode.map((item,index) =>{
                if(item.type === 'ROLE'){
                    arrAllCode.roles.push(item);
                }
                if(item.type === 'GENDER'){
                    arrAllCode.genders.push(item);
                }
                if(item.type === 'POSITION'){
                    arrAllCode.positions.push(item);
                }
                if(item.type === 'TIME'){
                    arrAllCode.times.push(item);
                }
                if(item.type === 'STATUS'){
                    arrAllCode.status.push(item);
                }
            })
          //  console.log('test data arr allcode',arrAllCode);
            dispatch(fetchAllCodeSuccess(arrAllCode));
           }
           else{
            dispatch(fetchAllCodeFail())
           }
        }
        catch(e){
            console.log(e);
            dispatch(fetchAllCodeFail());
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



export const saveUserAction = (data) => {
    return async (dispatch,getState) =>{
        try{
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                dispatch(saveUserSuccess())
            }
        }

        catch(e){
            dispatch(saveUserFail())
            console.log(e);
        }
    }
}


export const saveUserSuccess = () =>{
    return {
        type : actionTypes.SAVE_USER_SUCCESS
    }
}

export const saveUserFail= () =>{
    return {
        type : actionTypes.SAVE_USER_FAIL
    }
}