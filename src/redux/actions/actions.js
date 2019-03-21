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
