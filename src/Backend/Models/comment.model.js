const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    parentID : {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
    posterID : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Comment', CommentSchema);