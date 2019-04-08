const mongoose = require("mongoose");
const Course = require("../Models/course.model");
const Topic = require("../Models/topic.model");
const Company = require("../Models/company.model");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    solution: { type: String, required: false },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
    numComments: { type: Number, default: 0 }
});

QuestionSchema.post("save", function(next) {
    var question = this;

    question.courses.forEach(element => {
        Course.findById(element, (err, course) => {
            course.addQuestion(question._id, (err, course) => {});
        });
    });

    question.topics.forEach(element => {
        Topic.findById(element, (err, topic) => {
            topic.addQuestion(question._id, (err, topic) => {});
        });
    });

    question.companies.forEach(element => {
        Company.findById(element, (err, company) => {
            company.addQuestion(question._id, (err, company) => {});
        });
    });
});

QuestionSchema.methods.addCompany = function(company, callback) {
    var index = this.companies.findIndex(el => {
        return el.equals(company);
    });
    if (index !== -1) {
        return callback(null, null);
    } else {
        this.companies.push(company);
        this.save(function(err, question) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, question);
            }
        });
    }
};
QuestionSchema.methods.addCourse = function(course, callback) {
    var index = this.courses.findIndex(el => {
        return el.equals(course);
    });
    if (index !== -1) {
        return callback(null, null);
    } else {
        this.courses.push(course);
        this.save(function(err, question) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, question);
            }
        });
    }
};
QuestionSchema.methods.addTopic = function(topic, callback) {
    var index = this.topics.findIndex(el => {
        return el.equals(topic);
    });
    if (index !== -1) {
        return callback(null, null);
    } else {
        this.topics.push(topic);
        this.save(function(err, question) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, question);
            }
        });
    }
};

QuestionSchema.methods.addComment = function(comment, callback) {
    var index = this.comments.findIndex(el => {
        return el.equals(comment);
    });
    if (index !== -1) {
        return callback(null, null);
    } else {
        this.comments.push(comment);
        this.numComments++;
        this.save(function(err, question) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, question);
            }
        });
    }
};

module.exports = mongoose.model("Question", QuestionSchema);
