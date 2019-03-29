const User = require("../Models/user.model");

module.exports = {
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

    getUser: (req, res) => {
        User.findOne({email: req.body.email}, function(err, user){
            if (err) {
                res.status(500);
                res.send(err);               
            }

            else if (user) {
                res.send(user);
            }
            else {
                res.status(600);
                res.send(err);
                
            }
        });
    }
};
