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
    }
};
