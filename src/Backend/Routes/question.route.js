const question = require("../Controllers/question.controller");

module.exports = router => {
    router.route("/question").post(question.createQuestion);
};
