const question = require("../Controllers/question.controller");

module.exports = router => {
    router.route("/question").post(question.createQuestion);

    router.route("/question/:id").patch(question.updateQuestion);

    router.route("/question/:id").get(question.getQuestion);

    router.route("/question/:id/addcompany").post(question.addCompany);

    router.route("/question/:id/addcourse").post(question.addCourse);

    router.route("/question/:id/addtopic").post(question.addTopic);

    router.route("/question/:id/addcomment").post(question.addComment);
};
