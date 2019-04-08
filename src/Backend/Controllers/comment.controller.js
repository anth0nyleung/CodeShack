const Comment = require("../Models/comment.model");

module.exports = {
    createComment: (req, res) => {
        var comment = new Comment(req.body);

        comment.save(function(err, comment) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.send(comment);
            }
        });
    },
    deleteComment: (req, res) => {
        Comment.findById(req.params.id, (err, comment) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                comment.deleted = true;
                comment.content = "deleted";
                comment.poster = "";
                comment.posterID = null;
                comment.save(function(err, comment) {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.send(comment);
                    }
                });
            }
        });
    },
    reply: (req, res) => {
        Comment.findById(req.params.id, (err, comment) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!comment) {
                res.status(500);
                res.send(err);
            } else if (comment.deleted) {
                res.status(401);
                res.send("Invalid request");
            } else {
                comment.addChildComment(req.body.reply_id, (err, comment) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.send(comment);
                    }
                });
            }
        });
    },
    getComment: (req, res) => {
        Comment.findById(req.params.id, (err, comment) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!comment) {
                res.status(500);
                res.send(err);
            } else {
                res.send(comment);
            }
        });
    }
};
