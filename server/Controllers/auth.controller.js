const admin = require("../Firebase/admin");
const User = require("../Models/user.model");
module.exports = {
    /**
     * Reads idToken from the header, verifies it, then sends the id to next route
     */
    validateFirebaseIdToken: (req, res, next) => {
        if (req.header("Authorization")) {
            let authentication = req.header("Authorization").split(" ");
            if (authentication[0] !== "Bearer") {
                return res.status(401).send();
            } else {
                admin
                    .auth()
                    .verifyIdToken(authentication[1])
                    .then(decodedToken => {
                        req.firebase_id = decodedToken.uid;
                        console.info("Firebase idToken verified");
                        return next();
                    })
                    .catch(err => {
                        return res.status(403).send();
                    });
            }
        } else {
            return res.status(401).send();
        }
    },
    requireAdmin: (req, res, next) => {
        User.findOne({ firebase_id: req.firebase_id }, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            } else if (!user) {
                return res.status(500).send();
            } else {
                if (user.role !== "admin") {
                    return res.status(403).send(new Error("Not authorized"));
                } else {
                    return next();
                }
            }
        });
    }
};
