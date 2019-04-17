const topic = require("../Controllers/topic.controller");
const auth = require("../Controllers/auth.controller");

module.exports = router => {
    router
        .route("/topic")
        .post(auth.validateFirebaseIdToken, topic.createTopic);

    router
        .route("/topic/:id")
        .patch(auth.validateFirebaseIdToken, topic.updateTopic);

    router.route("/topic").get(auth.validateFirebaseIdToken, topic.getTopics);

    router
        .route("/topic/:id")
        .get(auth.validateFirebaseIdToken, topic.getTopic);

    router
        .route("/topic/:id/addq")
        .post(auth.validateFirebaseIdToken, topic.addQuestion);
};
