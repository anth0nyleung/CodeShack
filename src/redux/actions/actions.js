//Here is where all the action creators will be
import axios from "axios";
import { auth } from "../../Backend/Firebase/firebase";

const url = "http://localhost:8080/api/";

/**
 * Returns the header config containing the idToken used for verification
 * @param {function} callback
 */
const setHeader = callback => {
    auth.onAuthStateChanged(user => {
        if (user) {
            auth.currentUser.getIdToken(true).then(idToken => {
                let config = {
                    headers: {
                        Authentication: "Bearer " + idToken
                    }
                };
                callback(config);
            });
        } else {
            callback({});
        }
    });
};

/**
 * Loads a specific course into the state
 * @param {Object} course_id
 */
export function loadCourse(course_id) {
    return dispatch => {
        setHeader(config => {
            axios
                .get(`${url}course/${course_id}`, config)
                .then(res => {
                    let course = res.data;
                    dispatch({ type: "LOAD_COURSE", course });
                })
                .catch(err => {
                    console.log("Error: Unable to get questions,", err);
                });
        });
    };
}

/**
 * Loads a specific question into the state
 * @param {Object} question_id
 */
export function loadQuestion(question_id) {
    return dispatch => {
        setHeader(config => {
            axios
                .get(`${url}question/${question_id}`, config)
                .then(res => {
                    let question = res.data;
                    dispatch({ type: "LOAD_QUESTION", question });
                })
                .catch(err => {
                    console.log("Error: Unable to get question,", err);
                });
        });
    };
}

/**
 * Loads all courses into the state
 */
export function loadAllCourses() {
    return dispatch => {
        setHeader(config => {
            axios
                .get(`${url}course`, config)
                .then(res => {
                    let courses = res.data;
                    dispatch({ type: "LOAD_COURSES", courses });
                })
                .catch(err => {
                    console.log("Error: Unable to get courses", err);
                });
        });
    };
}

/**
 * Loads the user into the state
 * @param {function} callback
 */
export function loginUser(callback) {
    console.log("login");
    return dispatch => {
        setHeader(config => {
            axios
                .get(`${url}user/`, config)
                .then(res => {
                    let user = res.data;
                    dispatch({ type: "SET_USER", user });
                    callback(null);
                })
                .catch(err => {
                    console.log(err);
                    dispatch({ type: "AUTH_ERROR" });
                    callback(err.response.status);
                });
        });
    };
}

/**
 * Creates a user and loads them into the state
 * @param {Object} user_data
 */
export function signupUser(user_data) {
    console.log("create new user " + user_data);
    return dispatch => {
        setHeader(config => {
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
        });
    };
}

/**
 * Removes user from state
 */
export function logoutUser() {
    return dispatch => {
        dispatch({ type: "LOGOUT_USER" });
    };
}
