const company = require("../Controllers/company.controller");
const auth = require("../Controllers/auth.controller");

module.exports = router => {
    router.route("/company").post(company.createCompany);

    router.route("/company/:id").patch(company.updateCompany);

    router.route("/company").get(company.getCompanies);

    router.route("/company/:id").get(company.getCompany);

    router
        .route("/company/:id/addq")
        .post(auth.validateFirebaseIdToken, company.addQuestion);
};
