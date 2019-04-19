const initialState = {
    questions: [],
    currentQuestion: { comments: [] },
    questionTags: [[]]
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
        case "LOAD_TAGS":
            return {
                ...state,
                questionTags: action.questionTags
            };
        default:
            return state;
    }
};
