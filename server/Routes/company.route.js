const company = require("../Controllers/company.controller");
const auth = require("../Controllers/auth.controller");

module.exports = router => {
    router
        .route("/company")
        .post(
            auth.validateFirebaseIdToken,
            auth.requireAdmin,
            company.createCompany
        );

    router
        .route("/company/:id")
        .patch(
            auth.validateFirebaseIdToken,
            auth.requireAdmin,
            company.updateCompany
        );

    router
        .route("/company")
        .get(auth.validateFirebaseIdToken, company.getCompanies);

    router
        .route("/company/:id")
        .get(auth.validateFirebaseIdToken, company.getCompany);

    router
        .route("/company/:id/addq")
        .post(auth.validateFirebaseIdToken, company.addQuestion);
};
