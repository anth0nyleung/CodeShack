const User = require("../Models/user.model");

module.exports = {
    createUser: (req, res) => {
        var user = new User(req.body);

        user.save(function(err, user) {
            if (err) {
                res.json({
                    err: err,
                    message: "There is an error saving user"
                });
            } else {
                res.send(user);
            }
        });
    },
    getUsers: (req, res) => {
        User.find({}, function(err, users) {
            if (err) {
                res.json({
                    err: err,
                    message: "Unable to get users"
                });
            } else {
                res.send(users);
            }
        });
    }
};
