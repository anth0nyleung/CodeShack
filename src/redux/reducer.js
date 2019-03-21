import { combineReducers } from "redux";
import authUser from "./reducers/authUser";
import question from "./reducers/question";
import { connectRouter } from "connected-react-router";

export default history =>
    combineReducers({
        authUser,
        question,
        router: connectRouter(history)
    });
