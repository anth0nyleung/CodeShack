const Question = require("../Models/question.model");
const Course = require("../Models/course.model");
const Comment = require("../Models/comment.model");
const Topic = require("../Models/topic.model");
const Company = require("../Models/company.model");

module.exports = {
    /**
     * Creates a question in the database
     * POST /question
     *
     * @param req.body The info for the new question
     */
    createQuestion: (req, res) => {
        var question = new Question(req.body);

        question.save(function(err, question) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.send(question);
            }
        });
    },
    /**
     * Updates a question in the database
     * PATCH /question/:id
     *
     * @param req.params.id The id of the question
     * @param req.body      The info of the new question
     */
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
    /**
     * Get a question from the database. Populates all fields
     * GET /question/:id
     *
     * @param req.params.id The id of the question
     */
    getQuestion: (req, res) => {
        Question.findById(req.params.id)
            .populate("courses")
            .populate("comments")
            .populate("topics")
            .populate("companies")
            .exec((err, question) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.send(question);
                }
            });
    },
    /**
     * Adds a company to a question
     * POST /question/:id/addcompany
     *
     * @param req.params.id       The id of the question
     * @param req.body.company_id The id of the company
     */
    addCompany: (req, res) => {
        Question.findById(req.params.id, (err, question) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!question) {
                res.status(500);
                res.send(err);
            } else {
                Company.findById(req.body.company_id, (err, company) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else if (!company) {
                        res.status(500);
                        res.send(err);
                    } else {
                        question.addCompany(
                            req.body.company_id,
                            (err, question) => {
                                if (err) {
                                    res.status(500);
                                    res.send(err);
                                } else {
                                    res.send(question);
                                }
                            }
                        );
                    }
                });
            }
        });
    },
    /**
     * Adds a topic to a question
     * POST /question/:id/addtopic
     *
     * @param req.params.id     The id of the question
     * @param req.body.topic_id The id of the topic
     */
    addTopic: (req, res) => {
        Question.findById(req.params.id, (err, question) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!question) {
                res.status(500);
                res.send(err);
            } else {
                Topic.findById(req.body.topic_id, (err, topic) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else if (!topic) {
                        res.status(500);
                        res.send(err);
                    } else {
                        question.addTopic(
                            req.body.topic_id,
                            (err, question) => {
                                if (err) {
                                    res.status(500);
                                    res.send(err);
                                } else {
                                    res.send(question);
                                }
                            }
                        );
                    }
                });
            }
        });
    },
    /**
     * Adds a course to a question
     * POST /question/:id/addcourse
     *
     * @param req.params.id      The id of the question
     * @param req.body.course_id The id of the course
     */
    addCourse: (req, res) => {
        Question.findById(req.params.id, (err, question) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!question) {
                res.status(500);
                res.send(err);
            } else {
                Course.findById(req.body.course_id, (err, course) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else if (!course) {
                        res.status(500);
                        res.send(err);
                    } else {
                        question.addCourse(
                            req.body.course_id,
                            (err, question) => {
                                if (err) {
                                    res.status(500);
                                    res.send(err);
                                } else {
                                    res.send(question);
                                }
                            }
                        );
                    }
                });
            }
        });
    },
    /**
     * Adds a comment to a question
     * POST /question/:id/addcomment
     *
     * @param req.params.id       The id of the question
     * @param req.body.comment_id The id of the comment
     */
    addComment: (req, res) => {
        Question.findById(req.params.id, (err, question) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!question) {
                res.status(500);
                res.send(err);
            } else {
                Comment.findById(req.body.comment_id, (err, comment) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else if (!comment) {
                        res.status(500);
                        res.send(err);
                    } else {
                        question.addCompany(
                            req.body.comment_id,
                            (err, question) => {
                                if (err) {
                                    res.status(500);
                                    res.send(err);
                                } else {
                                    res.send(question);
                                }
                            }
                        );
                    }
                });
            }
        });
    }
};
