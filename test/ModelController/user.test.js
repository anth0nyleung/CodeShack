process.env.NODE_ENV = "test";

let User = require("../../src/Backend/Models/user.model");
let admin = require("../../src/Backend/Firebase/admin");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../src/Backend/server");
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

describe("User", () => {
    beforeEach(done => {
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

    describe("Create User /POST", () => {
        it("it should create a user", done => {
            let user = {
                firebase_id: UID,
                email: "test@test.com",
                username: "test",
                year: "Freshman",
                name: "test"
            };

            chai.request(server)
                .post("/api/user")
                .set("Authentication", "Bearer " + idToken)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("firebase_id").eql(UID);
                    done();
                });
        });

        it("it should fail to create a user", done => {
            let user = {
                firebase_id: UID
            };

            chai.request(server)
                .post("/api/user")
                .set("Authentication", "Bearer " + idToken)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe("Get User /POST", () => {
        it("it should get a user", done => {
            let user = {
                firebase_id: UID,
                email: "test@test.com",
                username: "test",
                year: "Freshman",
                name: "test"
            };

            new User(user).save((err, user) => {
                chai.request(server)
                    .get("/api/user")
                    .set("Authentication", "Bearer " + idToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property("firebase_id").eql(UID);
                        done();
                    });
            });
        });

        it("it should fail to get a user", done => {
            chai.request(server)
                .get("/api/user")
                .set("Authentication", "Bearer " + idToken)
                .end((err, res) => {
                    res.should.have.status(600);
                    done();
                });
        });
    });

    describe("Auth Test", () => {
        it("it should fail to authenticate (401)", done => {
            chai.request(server)
                .post("/api/user")
                .set("Authentication", idToken)
                .send({})
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it("it should fail to authenticate (401)", done => {
            chai.request(server)
                .post("/api/user")
                .send({})
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it("it should fail to authenticate (403)", done => {
            chai.request(server)
                .post("/api/user")
                .set("Authentication", "Bearer 123")
                .send({})
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });
});
