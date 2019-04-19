const initialState = {
    isLoading: 0,
    isLoadingComment: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "START_LOADING":
            return {
                ...state,
                isLoading: state.isLoading + 1
            };
        case "STOP_LOADING":
            return {
                ...state,
                isLoading: state.isLoading - 1
            };
        default:
            return state;
    }
};
