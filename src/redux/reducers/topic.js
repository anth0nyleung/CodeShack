const initialState = {
    topics: [],
    currentTopic: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_TOPICS":
            return {
                ...state,
                topics: action.topics
            };
        case "LOAD_TOPIC":
            return {
                ...state,
                currentTopic: action.topic
            };
        default:
            return state;
    }
};
