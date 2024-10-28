case actionTypes.GET_BOOKING_START:
copyState = { ...state }
return {
    ...copyState
}
        case actionTypes.GET_BOOKING_SUCCESS:
copyState = { ...state }
copyState.allBooking = action.data
copyState.isLoading = false;
return {
    ...copyState
}
        case actionTypes.GET_BOOKING_FAIL:
copyState = { ...state }
copyState.isLoading = false;
return {
    ...copyState
}