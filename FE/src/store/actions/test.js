case actionTypes.CREATE_CLINIC_START:
copyState = { ...state }
return {
    ...state
}
        case actionTypes.CREATE_CLINIC_SUCCESS:
copyState = { ...state }
copyState.isLoading = false;
return {
    ...copyState
}
        case actionTypes.CREATE_CLINIC_FAIL:
copyState = { ...state }
copyState.isLoading = false;
return {
    ...copyState
}

        case actionTypes.GET_ALL_CLINIC_START:
copyState = { ...state }
return {
    ...copyState
}
        case actionTypes.GET_ALL_CLINIC_SUCCESS:
copyState = { ...state }
copyState.allClinic = action.data
copyState.isLoading = false;
return {
    ...copyState
}
        case actionTypes.GET_ALL_CLINIC_FAIL:
copyState = { ...state }
copyState.isLoading = false;
return {
    ...copyState
}