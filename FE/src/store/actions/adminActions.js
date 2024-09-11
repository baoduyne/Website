import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";
export const fetchAllCodeStart = () =>{
    return async (dispatch,getState) =>{
        try{
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

