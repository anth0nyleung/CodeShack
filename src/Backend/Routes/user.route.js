const user = require("../Controllers/user.controller");
const auth = require("../Controllers/auth.controller");

module.exports = router => {
    router.route("/user").post(auth.validateFirebaseIdToken, user.createUser);

    router.route("/user").get(auth.validateFirebaseIdToken, user.getUser);
};
