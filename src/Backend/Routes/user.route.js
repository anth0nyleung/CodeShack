const user = require("../Controllers/user.controller");

module.exports = router => {
    router.route("/user").post(user.createUser);

    router.route("/user").get(user.getUsers);
};
