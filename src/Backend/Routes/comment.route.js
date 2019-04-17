const comment = require("../Controllers/comment.controller");
const auth = require("../Controllers/auth.controller");

module.exports = router => {
    router
        .route("/comment")
        .post(auth.validateFirebaseIdToken, comment.createComment);

    router
        .route("/comment/:id")
        .delete(auth.validateFirebaseIdToken, comment.deleteComment);

    router
        .route("/comment/:id/reply")
        .post(auth.validateFirebaseIdToken, comment.reply);

    router
        .route("/comment/:id")
        .get(/*auth.validateFirebaseIdToken,*/ comment.getComment);
};
