import reducer from "./reducer";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export const store = createStore(reducer(history), applyMiddleware(thunk));
