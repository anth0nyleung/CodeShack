const User = require("./user.route");
const Comment = require("./comment.route");
const Course = require("./course.route");
const Question = require("./question.route");
const Topic = require("./topic.route");
const Company = require("./company.route");

module.exports = router => {
    User(router);
    Comment(router);
    Course(router);
    Question(router);
    Topic(router);
    Company(router);
    // Add the other routes
};
