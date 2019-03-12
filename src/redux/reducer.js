import { combineReducers } from "redux";
import authUser from "./reducers/authUser";
import { connectRouter } from "connected-react-router";

export default history =>
    combineReducers({
        authUser,
        router: connectRouter(history)
    });
