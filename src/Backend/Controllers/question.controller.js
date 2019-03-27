const Question = require("../Models/question.model");

module.exports = {
    createQuestion: (req, res) => {
        var quesion = new Question(req.body);

        question.save(function(err, question) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.send(question);
            }
        });
    },
    updateQuestion: (req, res) => {
        Question.findById(req.params.id, (err, question) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!question) {
                res.status(500);
                res.send(err);
            } else {
                Object.assign(question, req.body).save(function(err, question) {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.send(question);
                    }
                });
            }
        });
    },
    getQuestion: (req, res) => {
        Questions.findById(req.params.id)
            .populate("questions")
            .exec((err, question) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.send(question);
                }
            });
    },
    addCompany: (req, res) => {
        Questions.findById(req.params.id, (err, question) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!question) {
                res.status(500);
                res.send(err);
            } else {
                question.addCompany(req.body.company_id, (err, question) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.send(question);
                    }
                });
            }
        });
    },
    addTopic: (req, res) => {
        Questions.findById(req.params.id, (err, question) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!question) {
                res.status(500);
                res.send(err);
            } else {
                question.addTopic(req.body.topic_id, (err, question) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.send(question);
                    }
                });
            }
        });
    },
    addCourse: (req, res) => {
        Questions.findById(req.params.id, (err, question) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!question) {
                res.status(500);
                res.send(err);
            } else {
                question.addCourse(req.body.course_id, (err, question) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.send(question);
                    }
                });
            }
        });
    },
    addComment: (req, res) => {
        Questions.findById(req.params.id, (err, question) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!question) {
                res.status(500);
                res.send(err);
            } else {
                question.addCompany(req.body.comment_id, (err, question) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.send(question);
                    }
                });
            }
        });
    }
};
