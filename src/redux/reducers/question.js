const initialState = {
    questions: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_QUESTIONS":
            return {
                ...state,
                questions: action.questions
            };
        default:
            return state;
    }
};
