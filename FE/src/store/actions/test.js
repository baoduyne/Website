case actionTypes.GET_DETAIL_CLINIC_START:
return {
    ...state,
}
case actionTypes.GET_DETAIL_CLINIC_SUCCESS:

let copyState = { ...state };
copyState.selectedClinic = action.data
return {
    ...copyState,
    isLoading: false
}
case actionTypes.GET_DETAIL_CLINIC_FAIL:
return {
    ...state,
    isLoading: false
}