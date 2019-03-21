const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: { type: String, required: true },
    deleted: { type: Boolean, default: false }
});

CommentSchema.methods.addChildComment = function(reply, callback) {
    this.children.push(reply);
    this.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, this);
        }
    });
};

module.exports = mongoose.model("Comment", CommentSchema);
