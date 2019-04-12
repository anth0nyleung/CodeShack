const course = require("../Controllers/course.controller");
const auth = require("../Controllers/auth.controller");

module.exports = router => {
    router.route("/course").post(course.createCourse);

    router.route("/course/:id").patch(course.updateCourse);

    router.route("/course").get(course.getCourses);

    router.route("/course/:id").get(course.getCourse);

    router
        .route("/course/:id/addq")
        .post(auth.validateFirebaseIdToken, course.addQuestion);
};
