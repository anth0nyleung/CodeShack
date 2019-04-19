const Course = require("../Models/course.model");
const Question = require("../Models/question.model");

module.exports = {
    /**
     * Creates a course in the database
     * POST /course
     *
     * @param req.body The object containing all info for course
     */
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
    /**
     * Updates a course in the database
     * PATCH /course/:id
     *
     * @param req.params.id The id of the course to update
     * @param req.body      The object containing all the new info
     */
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
    /**
     * Gets all courses from database
     * GET /course
     */
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
    /**
     * Gets a single course from the database. Populates all questions
     * GET /course/:id
     *
     * @param req.params.id The id of the course to get
     */
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
    /**
     * Adds a question to a course
     * POST /course/:id/addq
     *
     * @param req.params.id         The id of the course
     * @param req.body.question_id  The id of the question to add
     */
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
