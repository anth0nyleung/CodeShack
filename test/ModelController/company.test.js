process.env.NODE_ENV = "test";
let sinon = require("sinon");
let Company = require("../../server/Models/company.model");
let Question = require("../../server/Models/question.model");
let User = require("../../server/Models/user.model");
let admin = require("../../server/Firebase/admin");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server/server");
let should = chai.should();

let idToken = "";

const rp = require("request-promise");
const API_KEY = "AIzaSyArrokhuYfs5rPYBjqQmY3K9DeRHxLThBg";
const UID = "hW9mWRQ6RePiVcCuV6wF4Dd28mE3";

/**
 * Converts a custom Token into an idToken used for mock validation
 * @param {*} customToken
 * @param {*} callback
 */
function getIdTokenFromCustomToken(customToken, callback) {
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${API_KEY}`;
    const data = {
        token: customToken,
        returnSecureToken: true
    };

    var options = {
        method: "POST",
        uri: url,
        body: data,
        json: true // Automatically stringifies the body to JSON
    };

    return (
        rp(options)
            // idToken is the firebase id token that can be used with verifyIdToken
            .then(parsedBody => {
                idToken = parsedBody.idToken;
                callback();
            })
            .catch(function(err) {
                // POST failed...
            })
    );
}

chai.use(chaiHttp);

describe("Company", () => {
    var error, warn, info;
    beforeEach(done => {
        error = sinon.stub(console, "error");
        warn = sinon.stub(console, "warn");
        info = sinon.stub(console, "info");
        Company.deleteMany({}, err => {
            Question.deleteMany({}, err => {
                User.deleteMany({}, err => {
                    admin
                        .auth()
                        .createCustomToken(UID)
                        .then(token => {
                            getIdTokenFromCustomToken(token, () => {
                                done();
                            });
                        });
                });
            });
        });
    });
    afterEach(done => {
        error.restore();
        warn.restore();
        info.restore();
        done();
    });
    describe("Create Company /POST", () => {
        it("it should fail to create a company ", done => {
            let company = {
                companyName: "Test"
            };
            new User({
                username: "test",
                firebase_id: UID,
                name: "test",
                year: "test",
                email: "test"
            }).save((err, user) => {
                console.log(err);
                chai.request(server)
                    .post("/api/company")
                    .set("Authorization", "Bearer " + idToken)
                    .send(company)
                    .end((err, res) => {
                        res.should.have.status(403);
                        done();
                    });
            });
        });

        it("it should fail to create a company", done => {
            chai.request(server)
                .post("/api/company")
                .set("Authorization", "Bearer " + idToken)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe("Update Company /POST", () => {
        it("it should fail to update a company", done => {
            let company = new Company({
                companyName: "Test"
            });
            var id;
            company.save((err, company) => {
                company.should.have.property("companyName").eql("Test");
                id = company._id;

                let newCompanyName = { companyName: "Updated Company" };
                chai.request(server)
                    .patch(`/api/company/${id}`)
                    .set("Authorization", "Bearer " + idToken)
                    .send(newCompanyName)
                    .end((err, res) => {
                        res.should.have.status(500);
                        done();
                    });
            });
        });

        it("it should fail to update a company", done => {
            chai.request(server)
                .patch(`/api/company/1`)
                .set("Authorization", "Bearer " + idToken)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to update a company", done => {
            let company = new Company({
                companyName: "Test"
            });
            var id;
            company.save((err, company) => {
                id = company._id;
                Company.findByIdAndDelete(id, err => {
                    let newCompanyName = { companyName: "Updated Company" };
                    chai.request(server)
                        .patch(`/api/company/${id}`)
                        .set("Authorization", "Bearer " + idToken)
                        .send(newCompanyName)
                        .end((err, res) => {
                            res.should.have.status(500);
                            done();
                        });
                });
            });
        });
    });

    describe("Get companies /GET", () => {
        it("it should get a list of all companies", done => {
            new Company({
                companyName: "Test"
            }).save((err, company) => {
                new Company({
                    companyName: "Test1"
                }).save((err, company1) => {
                    chai.request(server)
                        .get("/api/company")
                        .set("Authorization", "Bearer " + idToken)
                        .end((err, res) => {
                            res.should.have.status(200);
                            let companies = res.body;
                            companies.length.should.eql(2);
                            done();
                        });
                });
            });
        });
    });

    describe("Get company /GET", () => {
        it("it should get a company", done => {
            let company = new Company({
                companyName: "Test"
            });

            var id;
            company.save((err, company) => {
                id = company._id;

                chai.request(server)
                    .get(`/api/company/${id}`)
                    .set("Authorization", "Bearer " + idToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have
                            .property("companyName")
                            .eql("Test");
                        done();
                    });
            });
        });

        it("it should fail to get a company", done => {
            chai.request(server)
                .get(`/api/company/1`)
                .set("Authorization", "Bearer " + idToken)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to get a company", done => {
            let company = new Company({
                companyName: "Test"
            });

            var id;
            company.save((err, company) => {
                id = company._id;
                Company.findByIdAndDelete(id, err => {
                    chai.request(server)
                        .get(`/api/company/${id}`)
                        .set("Authorization", "Bearer " + idToken)
                        .end((err, res) => {
                            res.should.have.status(500);
                            done();
                        });
                });
            });
        });
    });

    describe("Add Question /POST", () => {
        it("it should add a question to a company", done => {
            let company = new Company({
                companyName: "Test"
            });

            var company_id;
            company.save((err, company) => {
                company_id = company._id;
                let question = new Question({
                    name: "Question 1",
                    content: "Content is here.",
                    poster: "5cab70541930e60d68e908d2"
                });

                var question_id;
                question.save((err, question) => {
                    question_id = question._id;

                    chai.request(server)
                        .post(`/api/company/${company_id}/addq`)
                        .set("Authorization", "Bearer " + idToken)
                        .send({ question_id: question_id })
                        .end((err, res) => {
                            res.should.have.status(200);
                            let questions = res.body.questions;
                            questions.length.should.eql(1);
                            done();
                        });
                });
            });
        });

        it("it should fail to add the question", done => {
            chai.request(server)
                .post(`/api/company/1/addq`)
                .set("Authorization", "Bearer " + idToken)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to add the question", done => {
            let company = new Company({
                companyName: "Test"
            });

            var company_id;
            company.save((err, company) => {
                company_id = company._id;
                Company.findByIdAndDelete(company_id, err => {
                    chai.request(server)
                        .post(`/api/company/${company_id}/addq`)
                        .set("Authorization", "Bearer " + idToken)
                        .end((err, res) => {
                            res.should.have.status(500);
                            done();
                        });
                });
            });
        });
    });
});
