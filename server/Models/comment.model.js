const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
        children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        poster: { type: String },
        posterID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        deleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

CommentSchema.methods.addChildComment = function(reply, callback) {
    var index = this.children.findIndex(el => {
        return el.equals(reply);
    });
    if (index !== -1) {
        return callback(null, null);
    } else {
        this.children.push(reply);
        this.save(function(err, comment) {
            if (err) {
                callback(err);
            } else {
                callback(null, comment);
            }
        });
    }
};

module.exports = mongoose.model("Comment", CommentSchema);
