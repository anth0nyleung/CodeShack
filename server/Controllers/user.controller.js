const User = require("../Models/user.model");
const ObjectId = require("mongodb").ObjectId;
module.exports = {
    /**
     * Creates a user in the database
     */
    createUser: (req, res) => {
        var user = new User({
            username: req.body.username,
            firebase_id: req.body.firebase_id,
            email: req.body.email,
            name: req.body.name,
            year: req.body.year,
            courses: req.body.courses
        });

        user.save(function(err, newUser) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.send(newUser);
            }
        });
    },
    /**
     * Updates a user in the database
     */
    updateUser: (req, res) => {
        User.findOne({ firebase_id: req.firebase_id }, (err, user) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!user) {
                res.status(500);
                res.send();
            } else {
                Object.assign(user, req.body).save((err, user) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.send(user);
                    }
                });
            }
        });
    },

    /**
     * Gets a user from the database
     */
    getUser: (req, res) => {
        User.findOne({ firebase_id: req.firebase_id })
            .populate("history")
            .populate("courses")
            .populate("favCompanies")
            .exec(function(err, user) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (user) {
                    res.send(user);
                } else {
                    res.status(600);
                    res.send(err);
                }
            });
    },

    /**
     * Adds a question to the users history
     */
    addHistory: (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (!user) {
                res.status(600);
                res.send(err);
            } else {
                user.addHistory(req.body.question_id, (err, user) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        User.update(
                            { "history.9": { $exists: true } },
                            { $pop: { history: 1 } },
                            () => {
                                res.send(user);
                            }
                        );
                    }
                });
            }
        });
    }
};
