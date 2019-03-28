const course = require("../Controllers/course.controller");

module.exports = router => {
    router.route("/course").post(course.createCourse);

    router.route("/course/:id").patch(course.updateCourse);

    router.route("/course").get(course.getCourses);

    router.route("/course/:id").get(course.getCourse);

    router.route("/course/:id/addq").post(course.addQuestion);
};
