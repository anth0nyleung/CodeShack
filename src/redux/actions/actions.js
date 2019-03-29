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

export function loginUser(user_data) {
    console.log("login");
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
