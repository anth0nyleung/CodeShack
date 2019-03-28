import { combineReducers } from "redux";
import authUser from "./reducers/authUser";
import question from "./reducers/question";
import course from "./reducers/course";
import { connectRouter } from "connected-react-router";

export default history =>
    combineReducers({
        authUser,
        question,
        course,
        router: connectRouter(history)
    });
