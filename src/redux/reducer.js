import { combineReducers } from "redux";
import authUser from "./reducers/authUser";
import question from "./reducers/question";
import course from "./reducers/course";
import topic from "./reducers/topic";
import company from "./reducers/company";
import loading from "./reducers/loading";
import { connectRouter } from "connected-react-router";

export default history =>
    combineReducers({
        loading,
        authUser,
        question,
        course,
        topic,
        company,
        router: connectRouter(history)
    });
