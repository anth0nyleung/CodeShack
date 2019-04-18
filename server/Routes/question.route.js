const question = require("../Controllers/question.controller");
const auth = require("../Controllers/auth.controller");

module.exports = router => {
    router
        .route("/question")
        .post(auth.validateFirebaseIdToken, question.createQuestion);

    router
        .route("/question/:id")
        .patch(auth.validateFirebaseIdToken, question.updateQuestion);

    router
        .route("/question")
        .get(auth.validateFirebaseIdToken, question.getQuestions);

    router
        .route("/question/:id")
        .get(auth.validateFirebaseIdToken, question.getQuestion);

    router
        .route("/question/:id/addcompany")
        .post(auth.validateFirebaseIdToken, question.addCompany);

    router
        .route("/question/:id/addcourse")
        .post(auth.validateFirebaseIdToken, question.addCourse);

    router
        .route("/question/:id/addtopic")
        .post(auth.validateFirebaseIdToken, question.addTopic);

    router
        .route("/question/:id/addcomment")
        .post(auth.validateFirebaseIdToken, question.addComment);
};
