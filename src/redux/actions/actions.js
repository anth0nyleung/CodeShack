//Here is where all the action creators will be
import axios from "axios";
import { auth } from "../../Components/utils/firebase";

const url =
    process.env.NODE_ENV === "production"
        ? "https://codeshack.herokuapp.com/api/"
        : "http://localhost:8080/api/";

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
                        Authorization: "Bearer " + idToken
                    }
                };
                //console.log(config);
                callback(config);
            });
        } else {
            callback({});
        }
    });
};

/**
 * Loads all topics into the state
 */
export function loadAllTopics() {
    return dispatch => {
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .get(`${url}topic`, config)
                .then(res => {
                    let topics = res.data;
                    dispatch({ type: "LOAD_TOPICS", topics });
                    dispatch({ type: "STOP_LOADING" });
                })
                .catch(err => {
                    console.error("Error: Unable to get topics", err);
                    dispatch({ type: "STOP_LOADING" });
                });
        });
    };
}

/**
 * Loads a specific topic into the state
 */
export function loadTopic(topic_id) {
    return dispatch => {
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .get(`${url}topic/${topic_id}`, config)
                .then(res => {
                    let topic = res.data;
                    dispatch({ type: "LOAD_TOPIC", topic });
                    dispatch({ type: "STOP_LOADING" });
                })
                .catch(err => {
                    console.error("Error: Unable to get topic", err);
                    dispatch({ type: "STOP_LOADING" });
                });
        });
    };
}

/**
 * Loads all companies into the state
 */
export function loadAllCompanies() {
    return dispatch => {
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .get(`${url}company`, config)
                .then(res => {
                    let companies = res.data;
                    dispatch({ type: "LOAD_COMPANIES", companies });
                    dispatch({ type: "STOP_LOADING" });
                })
                .catch(err => {
                    console.error("Error: Unable to get companies", err);
                    dispatch({ type: "STOP_LOADING" });
                });
        });
    };
}

/**
 * Loads a specific company into the state
 */
export function loadCompany(company_id) {
    return dispatch => {
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .get(`${url}company/${company_id}`, config)
                .then(res => {
                    let company = res.data;
                    dispatch({ type: "LOAD_COMPANY", company });
                    dispatch({ type: "STOP_LOADING" });
                })
                .catch(err => {
                    console.error("Error: Unable to get company", err);
                    dispatch({ type: "STOP_LOADING" });
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
                    console.error("Error: Unable to get question,", err);
                    dispatch({ type: "STOP_LOADING" });
                });
        });
    };
}

const formatQuestionTags = (questions, callback) => {
    var questionTags = [[]];
    questions.forEach(question => {
        questionTags[question._id] = [];
        question.courses.forEach(course => {
            questionTags[question._id] += course.courseName + ", ";
        });
        question.topics.forEach(topic => {
            questionTags[question._id] += topic.topicName + ", ";
        });
        question.companies.forEach(company => {
            questionTags[question._id] += company.companyName + ", ";
        });
    });
    return callback(questionTags);
};

export function loadAllQuestions() {
    return dispatch => {
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .get(`${url}question`, config)
                .then(res => {
                    let questions = res.data;
                    dispatch({ type: "LOAD_QUESTIONS", questions });
                    formatQuestionTags(questions, questionTags => {
                        dispatch({ type: "LOAD_TAGS", questionTags });
                        dispatch({ type: "STOP_LOADING" });
                    });
                })
                .catch(err => {
                    console.error(err);
                    dispatch({ type: "STOP_LOADING" });
                });
        });
    };
}

/**
 * Saves a specific question into user's history
 *
 * @param {Object} question_id
 *
 */

export function saveQuestionToUserHistory(question_data, user_id) {
    return dispatch => {
        setHeader(config => {
            axios
                .post(`${url}user/${user_id}/history`, question_data, config)
                .then(res => {
                    let user = res.data;
                    dispatch({ type: "SET_USER", user });
                })
                .catch(err => {
                    console.error(
                        "Error: Unable to save question to user history",
                        err
                    );
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
                    console.error("Error: Unable to get courses", err);
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
                    console.error("Error: Unable to get questions,", err);
                    dispatch({ type: "STOP_LOADING" });
                });
        });
    };
}

/**
 * Creates a question in the database
 *
 * @param {Object} question_data
 * @param {function} callback
 */
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
                    console.error(err);
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
    console.info("login");
    return dispatch => {
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .get(`${url}user/`, config)
                .then(res => {
                    let user = res.data;
                    dispatch({ type: "SET_USER", user });
                    dispatch({ type: "STOP_LOADING" });
                    callback(null);
                })
                .catch(err => {
                    console.error(err);
                    dispatch({ type: "AUTH_ERROR" });
                    dispatch({ type: "STOP_LOADING" });
                    if (err.response) {
                        callback(err.response.status);
                    } else {
                        callback(err);
                    }
                });
        });
    };
}

/**
 * Creates a comment and reply to parent comment
 *
 * @param {Object} comment_data
 * @param {String} question_id
 * @param {function} callback
 */
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
                                console.error("Error replying comment");
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
                                console.error("error replying comment");
                            });
                    }
                })
                .catch(err => {
                    console.error("error creating comment");
                });
        });
    };
}

/**
 * Loads a comment into the state
 */
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

/**
 * Deletes a comment
 *
 * @param {String} comment_id
 * @param {function} callback
 */
export function deleteComment(comment_id, callback) {
    return dispatch => {
        setHeader(config => {
            axios
                .delete(`${url}comment/${comment_id}`, config)
                .then(res => {
                    callback();
                })
                .catch(err => {
                    console.error("Error deleting comment");
                });
        });
    };
}

export function createCourse(course_data) {
    return dispatch => {
        setHeader(config => {
            axios
                .post(`${url}course`, course_data, config)
                .then(res => {
                    loadAllCourses()(dispatch);
                })
                .catch(err => {
                    console.error(err);
                });
        });
    };
}

export function createCompany(company_data) {
    return dispatch => {
        setHeader(config => {
            axios
                .post(`${url}company`, company_data, config)
                .then(res => {
                    loadAllCompanies()(dispatch);
                })
                .catch(err => {
                    console.error(err);
                });
        });
    };
}

export function createTopic(topic_data) {
    return dispatch => {
        setHeader(config => {
            axios
                .post(`${url}topic`, topic_data, config)
                .then(res => {
                    loadAllTopics()(dispatch);
                })
                .catch(err => {
                    console.error(err);
                });
        });
    };
}
/**
 * Creates a user and loads them into the state
 * @param {Object} user_data
 */
export function signupUser(user_data) {
    console.info("create new user " + user_data);
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
                    console.error(err);
                    dispatch({ type: "AUTH_ERROR" });
                });
        });
    };
}

export function updateUser(user_data) {
    return dispatch => {
        dispatch({ type: "START_LOADING" });
        setHeader(config => {
            axios
                .patch(`${url}user`, user_data, config)
                .then(res => {
                    loginUser(() => {})(dispatch);
                    dispatch({ type: "STOP_LOADING" });
                })
                .catch(err => {
                    console.error(err);
                    dispatch({ type: "UPDATE_FAIL" });
                    dispatch({ type: "STOP_LOADING" });
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
