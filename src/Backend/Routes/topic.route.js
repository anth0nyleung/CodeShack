const topic = require("../Controllers/topic.controller");
const auth = require("../Controllers/auth.controller");

module.exports = router => {
    router.route("/topic").post(topic.createTopic);

    router.route("/topic/:id").patch(topic.updateTopic);

    router.route("/topic").get(topic.getTopics);

    router.route("/topic/:id").get(topic.getTopic);

    router
        .route("/topic/:id/addq")
        .post(auth.validateFirebaseIdToken, topic.addQuestion);
};
