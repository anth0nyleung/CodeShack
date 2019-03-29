const initialState = {
    courses: [],
    currentCourse: { questions: [] }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_COURSES":
            return {
                ...state,
                courses: action.courses
            };
        case "LOAD_COURSE":
            return {
                ...state,
                currentCourse: action.course
            };
        default:
            return state;
    }
};
