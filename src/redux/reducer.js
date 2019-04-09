import { combineReducers } from "redux";
import authUser from "./reducers/authUser";
import question from "./reducers/question";
import course from "./reducers/course";
import topic from "./reducers/topic";
import company from "./reducers/company";
import loading from "./reducers/loading";
import comment from "./reducers/comment";
import { connectRouter } from "connected-react-router";

export default history =>
    combineReducers({
        loading,
        comment,
        authUser,
        question,
        course,
        topic,
        company,
        router: connectRouter(history)
    });
