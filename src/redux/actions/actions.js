//Here is where all the action creators will be
import axios from "axios";
import Firebase from '../../Backend/Firebase/firebase'
const url = "http://localhost:8080/api/";

export function loadAllQuestions() {
    return dispatch => {
        axios
            .get(`${url}questions`)
            .then(res => {
                let questions = res.questions;
                dispatch({ type: "LOAD_QUESTIONS", questions });
            })
            .catch(err => {
                console.log("Error: Unable to get questions,", err);
            });
    };
}

export function loginUser(user_data) {
    console.log("login " + user_data);
    
    return dispatch => {
        axios
            .post(`${url}getUser/`, user_data)
            .then(res=> {
                let user = res.data;
                localStorage.setItem("Auth", user._id);
                dispatch({ type: "SET_USER", user});
            })
            .catch(err => {
                console.log(err);
                dispatch({type: "AUTH_ERROR"});
            });
    };
}

export function signupUser(user_data) {
    console.log("create new user " + user_data);

    return dispatch => {
        axios
            .post(`${url}user`, user_data)
            .then(res => {
                let user = res.data;
                localStorage.setItem("Auth", user._id);
                dispatch({ type: "SET_USER", user});
            })
            .catch(err => {
                console.log(err);
                dispatch({type: "AUTH_ERROR"});
            });
    };
}

