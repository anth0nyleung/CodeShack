const User = require("./user.route");
const Comment = require("./comment.route");
const Course = require("./course.route");

module.exports = router => {
    User(router);
    Comment(router);
    Course(router);
    // Add the other routes
};
