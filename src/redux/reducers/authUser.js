const initialState = {
    user: { history: [], courses: [], favCompanies: [] },
    isAuth: false,
    authError: false,
    updateError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                isAuth: Object.keys(action.user).length > 0 ? true : false,
                user: action.user
            };

        case "AUTH_ERROR":
            return {
                ...state,
                authError: true
            };
        case "LOGOUT_USER":
            return initialState;
        case "UPDATE_FAIL":
            return {
                ...state,
                updateError: true
            };
        default:
            return state;
    }
};
