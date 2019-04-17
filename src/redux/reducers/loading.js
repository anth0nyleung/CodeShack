const initialState = {
    isLoading: false,
    isLoadingComment: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "START_LOADING":
            return {
                ...state,
                isLoading: true
            };
        case "STOP_LOADING":
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};
