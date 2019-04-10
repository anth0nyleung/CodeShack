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

export function loadAllTopics() {
    return dispatch => {
        axios
            .get(`${url}topic`)
            .then(res => {
                let topics = res.data;
                dispatch({ type: "LOAD_TOPICS", topics });
            })
            .catch(err => {
                console.log("Error: Unable to get topics", err);
            });
    };
}

export function loadTopic(topic_id) {
    return dispatch => {
        axios
            .get(`${url}topic/${topic_id}`)
            .then(res => {
                let topic = res.data;
                dispatch({ type: "LOAD_TOPIC", topic });
            })
            .catch(err => {
                console.log("Error: Unable to get topic", err);
            });
    };
}

export function loadAllCompanies() {
    return dispatch => {
        axios
            .get(`${url}company`)
            .then(res => {
                let companies = res.data;
                dispatch({ type: "LOAD_COMPANIES", companies });
            })
            .catch(err => {
                console.log("Error: Unable to get companies", err);
            });
    };
}

export function loadCompany(company_id) {
    return dispatch => {
        axios
            .get(`${url}company/${company_id}`)
            .then(res => {
                let company = res.data;
                dispatch({ type: "LOAD_COMPANY", company });
            })
            .catch(err => {
                console.log("Error: Unable to get company", err);
            });
    };
}
/**
 * Loads a specific question into the state
 * @param {Object} question_id
 */
export function loadQuestion(question_id) {
    return dispatch => {
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .get(`${url}question/${question_id}`, config)
                .then(res => {
                    let question = res.data;
                    dispatch({ type: "LOAD_QUESTION", question });
                    dispatch({ type: "STOP_LOADING" });
                })
                .catch(err => {
                    console.log("Error: Unable to get question,", err);
                    dispatch({ type: "STOP_LOADING" });
                });
        });
    };
}

/**
 * Loads all courses into the state
 */
export function loadAllCourses() {
    return dispatch => {
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .get(`${url}course`, config)
                .then(res => {
                    let courses = res.data;
                    dispatch({ type: "LOAD_COURSES", courses });
                    dispatch({ type: "STOP_LOADING" });
                })
                .catch(err => {
                    console.log("Error: Unable to get courses", err);
                    dispatch({ type: "STOP_LOADING" });
                });
        });
    };
}

/**
 * Loads a specific course into the state
 * @param {Object} course_id
 */
export function loadCourse(course_id) {
    return dispatch => {
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .get(`${url}course/${course_id}`, config)
                .then(res => {
                    let course = res.data;
                    dispatch({ type: "LOAD_COURSE", course });
                    dispatch({ type: "STOP_LOADING" });
                })
                .catch(err => {
                    console.log("Error: Unable to get questions,", err);
                    dispatch({ type: "STOP_LOADING" });
                });
        });
    };
}

export function createQuestion(question_data, callback) {
    return dispatch => {
        setHeader(config => {
            axios
                .post(`${url}question`, question_data, config)
                .then(res => {
                    let question = res.data;
                    callback(null, question);
                })
                .catch(err => {
                    console.log(err);
                    callback(err);
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
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .get(`${url}user/`, config)
                .then(res => {
                    let user = res.data;
                    dispatch({ type: "SET_USER", user});
                    dispatch({ type: "STOP_LOADING" });
                    callback(null);
                })
                .catch(err => {
                    console.log(err);
                    dispatch({ type: "AUTH_ERROR" });
                    dispatch({ type: "STOP_LOADING" });
                    callback(err.response.status);
                });
        });
    };
}

export function createCommentAndReply(comment_data, question_id, callback) {
    return dispatch => {
        setHeader(config => {
            axios
                .post(`${url}comment`, comment_data, config)
                .then(res => {
                    let comment = res.data;
                    if (comment.parent === null) {
                        axios
                            .post(
                                `${url}question/${question_id}/addcomment`,
                                { comment_id: comment._id },
                                config
                            )
                            .then(res => {
                                callback();
                            })
                            .catch(err => {
                                console.log("Error replying comment");
                            });
                    } else {
                        axios
                            .post(
                                `${url}comment/${comment.parent}/reply`,
                                { reply_id: comment._id },
                                config
                            )
                            .then(res => {
                                callback();
                            })
                            .catch(err => {
                                console.log("error replying comment");
                            });
                    }
                })
                .catch(err => {
                    console.log("error creating comment");
                });
        });
    };
}

export function loadComment(comment_id, callback) {
    return dispatch => {
        setHeader(config => {
            axios
                .get(`${url}comment/${comment_id}`, config)
                .then(res => {
                    let comment = res.data;
                    dispatch({ type: "LOAD_COMMENT", comment });
                    callback();
                })
                .catch(err => {});
        });
    };
}

export function deleteComment(comment_id, callback) {
    return dispatch => {
        setHeader(config => {
            axios
                .delete(`${url}comment/${comment_id}`, config)
                .then(res => {
                    callback();
                })
                .catch(err => {
                    console.log("Error deleting comment");
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
                .post(`${url}user`, user_data, config)
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
