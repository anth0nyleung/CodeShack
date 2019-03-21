const User = require("./user.route");
const Comment = require("./comment.route");

module.exports = router => {
    User(router);
    Comment(router);
    // Add the other routes
};
