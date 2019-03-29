//Here is where all the action creators will be
import axios from "axios";
const url = "http://localhost:8080/api/";

export function loadCourse(course_id) {
    return dispatch => {
        axios
            .get(`${url}course/${course_id}`)
            .then(res => {
                let course = res.data;
                dispatch({ type: "LOAD_COURSE", course });
            })
            .catch(err => {
                console.log("Error: Unable to get questions,", err);
            });
    };
}

export function loadQuestion(question_id) {
    return dispatch => {
        axios
            .get(`${url}question/${question_id}`)
            .then(res => {
                let question = res.data;
                dispatch({ type: "LOAD_QUESTION", question });
            })
            .catch(err => {
                console.log("Error: Unable to get question,", err);
            });
    };
}

export function loadAllCourses() {
    return dispatch => {
        axios
            .get(`${url}course`)
            .then(res => {
                let courses = res.data;
                dispatch({ type: "LOAD_COURSES", courses });
            })
            .catch(err => {
                console.log("Error: Unable to get courses", err);
            });
    };
}

export function loginUser(user_data, callback) {
    console.log("login");
    return dispatch => {
        axios
            .post(`${url}getUser/`, user_data)
            .then(res => {
                let user = res.data;
                localStorage.setItem("Auth", user.email);
                dispatch({ type: "SET_USER", user });
                callback(null);
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: "AUTH_ERROR" });
                callback(err);
            });
    };
}

export function userExist(user_data, callback) {
    console.log("user exist");

    return () => {
        axios
            .post(`${url}getUser/`, user_data)
            .then(res => {
                console.log("no err");
                let user = res.data;
                callback(null);
            })
            .catch(err => {
                console.log(err);
                callback(err);
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
                localStorage.setItem("Auth", user.email);
                dispatch({ type: "SET_USER", user });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: "AUTH_ERROR" });
            });
    };
}
