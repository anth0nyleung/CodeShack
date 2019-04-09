const User = require("../Models/user.model");

module.exports = {
    /**
     * Creates a user in the database
     */
    createUser: (req, res) => {
        var user = new User(req.body);

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
     * Gets a user from the database
     */
    getUser: (req, res) => {
        User.findOne({ firebase_id: req.firebase_id }, function(err, user) {
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
    }
};
