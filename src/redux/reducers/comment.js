const initialState = {
    comments: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_COMMENT":
            let index = state.comments.findIndex(el => {
                return el._id === action.comment._id;
            });
            if (index === -1) {
                return {
                    ...state,
                    comments: [...state.comments, action.comment]
                };
            }
            return state;

        default:
            return state;
    }
};
