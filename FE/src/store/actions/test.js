case actionTypes.DELETE_BILL_START:
copyState = { ...state }
return {
    ...copyState
}
case actionTypes.DELETE_BILL_SUCCESS:
copyState = { ...state }
copyState.isLoading = false;
return {
    ...copyState
}
case actionTypes.DELETE_BILL_FAIL:
copyState = { ...state }
copyState.isLoading = false;
return {
    ...copyState
}