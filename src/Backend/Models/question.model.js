const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    name : {type: String, required: true},
    content : {type: String, required: true},
    solution : {type: String, required: false},
    courses : [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    companies : [{type: mongoose.Schema.Types.ObjectId, ref: 'Company'}],
    topics : [{type: mongoose.Schema.Types.ObjectId, ref: 'Topic'}]
});

QuestionSchema.methods.addCompany = function(company, callback) {
    var index = this.companies.findIndex(el => {
        return el.equals(c._id);
    });
    if (index !== -1) {
        return callback(null, null);
    } else {
        this.companies.push(company);
        this.save(function(err, question) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, this);
            }
        });
    }
};
QuestionSchema.methods.addCourse = function(course, callback) {
    var index = this.courses.findIndex(el => {
        return el.equals(c._id);
    });
    if (index !== -1) {
        return callback(null, null);
    } else {
        this.courses.push(course);
        this.save(function(err, question) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, this);
            }
        });
    }
};
QuestionSchema.methods.addTopic = function(topic, callback) {
    var index = this.topics.findIndex(el => {
        return el.equals(c._id);
    });
    if (index !== -1) {
        return callback(null, null);
    } else {
        this.topics.push(topic);
        this.save(function(err, question) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, this);
            }
        });
    }
};
QuestionSchema.methods.addComment = function(comment, callback) {
    var index = this.comments.findIndex(el => {
        return el.equals(c._id);
    });
    if (index !== -1) {
        return callback(null, null);
    } else {
        this.comments.push(comment);
        this.save(function(err, question) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, this);
            }
        });
    }
};

module.exports = mongoose.model('Question', QuestionSchema);