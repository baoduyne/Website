case actionTypes.SEND_BILL_START:
copyState = { ...state }
return {
    ...copyState
}
case actionTypes.SEND_BILL_SUCCESS:
copyState = { ...state }

copyState.isLoading = false;
return {
    ...copyState
}
case actionTypes.SEND_BILL_FAIL:
copyState = { ...state }
copyState.isLoading = false;
return {
    ...copyState
}