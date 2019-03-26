//Here is where all the action creators will be
import axios from "axios";
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

export function loadAllCourses() {
    return dispatch => {
        axios
            .get(`${url}course`)
            .then(res => {
                let courses = res.courses;
                dispatch({ type: "LOAD_COURSES", courses});

            })
            .catch(err => {
                console.log("Error: Unable to get courses,". err);
            })
    }
}

export function loginUser(user_data) {
    console.log("login")
    return dispatch => {
        const username = user_data.username;
        axios
            .post(`${url}user/${username}`, { password: user_data.password })
            .then(res => {
                let user = res.data;
                localStorage.setItem("Auth", user._id);
                dispatch({ type: "SET_USER", user });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: "LOGIN_ERROR" });
            });
    };
}