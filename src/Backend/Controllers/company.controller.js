const Company = require("../Models/company.model");
const Question = require("../Models/question.model");

module.exports = {
    createCompany: (req, res) => {
        var company = new Company(req.body);

        company.save(function(err, company) {
            if (err) {
                res.status(500);
                res.send();
            } else {
                res.send(company);
            }
        });
    },
    updateCompany: (req, res) => {
        Company.findById(req.params.id, (err, company) => {
            if (err) {
                res.status(500);
                res.send();
            } else if (!company) {
                res.status(500);
                res.send();
            } else {
                Object.assign(company, req.body).save((err, company) => {
                    if (err) {
                        res.status(500);
                        res.send();
                    } else {
                        res.send(company);
                    }
                });
            }
        });
    },
    getCompanies: (req, res) => {
        Company.find({}).exec((err, companies) => {
            if (err) {
                res.status(500);
                res.send();
            } else {
                res.send(companies);
            }
        });
    },
    getCompany: (req, res) => {
        Company.findById(req.params.id)
            .populate("questions")
            .exec((err, company) => {
                if (err) {
                    res.status(500);
                    res.send();
                } else if (!company) {
                    res.status(500);
                    res.send();
                } else {
                    res.send(company);
                }
            });
    },
    addQuestion: (req, res) => {
        Company.findById(req.params.id, (err, company) => {
            if (err) {
                res.status(500);
                res.send();
            } else if (!company) {
                res.status(500);
                res.send();
            } else {
                Question.findById(req.body.question_id, (err, question) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else if (!question) {
                        res.status(500);
                        res.send(err);
                    } else {
                        company.addQuestion(
                            req.body.question_id,
                            (err, company) => {
                                if (err) {
                                    res.status(500);
                                    res.send(err);
                                } else {
                                    res.send(company);
                                }
                            }
                        );
                    }
                });
            }
        });
    }
};
