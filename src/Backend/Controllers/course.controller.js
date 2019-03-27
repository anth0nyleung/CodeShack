const Course = require("../Models/course.model");
const Question = require("../Models/question.model");

module.exports = {
    createCourse: (req, res) => {
        var course = new Course(req.body);

        course.save(function(err, course) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.send(course);
            }
        });
    },
    updateCourse: (req, res) => {
        Course.findById(req.params.id, (err, course) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!course) {
                res.status(500);
                res.send(err);
            } else {
                Object.assign(course, req.body).save(function(err, course) {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.send(course);
                    }
                });
            }
        });
    },
    getCourses: (req, res) => {
        Course.find({}).exec((err, courses) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.send(courses);
            }
        });
    },
    getCourse: (req, res) => {
        Course.findById(req.params.id)
            .populate("questions")
            .exec((err, course) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.send(course);
                }
            });
    },
    addQuestion: (req, res) => {
        Course.findById(req.params.id, (err, course) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!course) {
                res.status(500);
                res.send(err);
            } else {
                Question.findById(req.body.question_id, (err, question) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else if (!question) {
                        res.status(500);
                        res.send(err);
                    } else {
                        course.addQuestion(
                            req.body.question_id,
                            (err, course) => {
                                if (err) {
                                    res.status(500);
                                    res.send(err);
                                } else {
                                    res.send(course);
                                }
                            }
                        );
                    }
                });
            }
        });
    }
};
