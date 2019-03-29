const User = require("./user.route");
const Comment = require("./comment.route");
const Course = require("./course.route");
const Question = require("./question.route");

module.exports = router => {
    User(router);
    Comment(router);
    Course(router);
    Question(router);
    // Add the other routes
};
