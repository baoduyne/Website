import actionTypes from "./actionTypes";
import { getAllCodeService ,createNewUserService,getAllUsers,deleteUserService} from "../../services/userService";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
                dispatch(fetchUsersStart());
                toast.success('Done!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
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

export const fetchUsersStart = () =>{
    return async (dispatch,getState) => {
        try{
          
            dispatch({type:actionTypes.FETCH_ALLCODE_START})
            let res = await getAllUsers('ALL');
            if(res && res.errCode === 0){
                dispatch(fetchUsersSuccess(res.users.reverse()))
              
            }
        }

        catch(e){
            dispatch(fetchUsersFail())
            console.log(e);
        }
    }

}

export const fetchUsersSuccess = (data) =>{
    return {
        type : actionTypes.FETCH_USERS_SUCCESS,
        data : data
    }
}


export const fetchUsersFail = () =>{
    return {
        type : actionTypes.FETCH_USERS_FAIL
    }
}


export const deleteUserStart = (id) =>{
    return async (dispatch,getState) => {
        try{
            console.log('step 1');
            dispatch({type:actionTypes.DELETE_USER_START})
            let res = await deleteUserService(id);
            if(res && res.errCode === 0){
                dispatch(fetchUsersStart())
            }
        }

        catch(e){
            dispatch(fetchUsersFail())
            console.log(e);
        }
    }

}

