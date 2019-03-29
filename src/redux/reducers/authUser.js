
const initialState = {
    user: {},
    isAuth: false,
    authError : false
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
            }
        default:
            return state;
    }
};
