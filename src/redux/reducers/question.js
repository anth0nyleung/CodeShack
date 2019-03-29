const initialState = {
    questions: [],
    currentQuestion: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_QUESTIONS":
            return {
                ...state,
                questions: action.questions
            };
        case "LOAD_QUESTION":
            return {
                ...state,
                currentQuestion: action.question
            };
        default:
            return state;
    }
};
