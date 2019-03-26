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

module.exports = mongoose.model('Question', QuestionSchema);