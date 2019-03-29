const comment = require("../Controllers/comment.controller");

module.exports = router => {
    router.route("/comment").post(comment.createComment);

    router.route("/comment/:id").delete(comment.deleteComment);
};
