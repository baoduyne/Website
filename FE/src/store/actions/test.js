case actionTypes.GET_HANDBOOK_START:
copyState = { ...state }
return {
    ...copyState
}
case actionTypes.GET_HANDBOOK_SUCCESS:
copyState = { ...state }
copyState.allHandbook = action.data
copyState.isLoading = false;
return {
    ...copyState
}
case actionTypes.GET_HANDBOOK_FAIL:
copyState = { ...state }
copyState.isLoading = false;
return {
    ...copyState
}