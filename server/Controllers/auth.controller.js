const admin = require("../Firebase/admin");

module.exports = {
    /**
     * Reads idToken from the header, verifies it, then sends the id to next route
     */
    validateFirebaseIdToken: (req, res, next) => {
        if (req.header("Authentication")) {
            let authentication = req.header("Authentication").split(" ");
            if (authentication[0] !== "Bearer") {
                return res.status(401).send();
            } else {
                admin
                    .auth()
                    .verifyIdToken(authentication[1])
                    .then(decodedToken => {
                        req.firebase_id = decodedToken.uid;
                        console.log("Firebase idToken verified");
                        return next();
                    })
                    .catch(err => {
                        return res.status(403).send();
                    });
            }
        } else {
            return res.status(401).send();
        }
    }
};
