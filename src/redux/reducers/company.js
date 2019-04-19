const initialState = {
    companies: [],
    currentCompany: { questions: [] }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_COMPANIES":
            return {
                ...state,
                companies: action.companies
            };
        case "LOAD_COMPANY":
            return {
                ...state,
                currentCompany: action.company
            };
        default:
            return state;
    }
};
