const course = require("../Controllers/course.controller");
const auth = require("../Controllers/auth.controller");

module.exports = router => {
    router
        .route("/course")
        .post(
            auth.validateFirebaseIdToken,
            auth.requireAdmin,
            course.createCourse
        );

    router
        .route("/course/:id")
        .patch(
            auth.validateFirebaseIdToken,
            auth.requireAdmin,
            course.updateCourse
        );

    router
        .route("/course")
        .get(auth.validateFirebaseIdToken, course.getCourses);

    router
        .route("/course/:id")
        .get(auth.validateFirebaseIdToken, course.getCourse);

    router
        .route("/course/:id/addq")
        .post(auth.validateFirebaseIdToken, course.addQuestion);
};
