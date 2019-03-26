const Course = require("../Models/course.model");

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
        Courses.find({}).exec((err, courses) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.send(courses);
            }
        });
    },
    getCourse: (req, res) => {
        Courses.findById(req.params.id)
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
        Courses.findById(req.params.id, (err, course) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!course) {
                res.status(500);
                res.send(err);
            } else {
                course.addQuestion((err, course) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.send(course);
                    }
                });
            }
        });
    }
};
