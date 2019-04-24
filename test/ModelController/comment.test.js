process.env.NODE_ENV = "test";

let sinon = require("sinon");

let mongoose = require("mongoose");
let Comment = require("../../server/Models/comment.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server/server");
let should = chai.should();

let idToken = "";

let admin = require("../../server/Firebase/admin");
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

describe("Comments", () => {
    var error, warn, info;
    beforeEach(done => {
        error = sinon.stub(console, "error");
        warn = sinon.stub(console, "warn");
        info = sinon.stub(console, "info");
        Comment.deleteMany({}, err => {
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
    afterEach(done => {
        error.restore();
        warn.restore();
        info.restore();
        done();
    });
    /* Test the /POST route */
    describe("Create comment /POST", () => {
        it("it should create a comment", done => {
            let comment = {
                parent: null,
                poster: null,
                content: "Test comment"
            };
            chai.request(server)
                .post("/api/comment")
                .set("Authorization", "Bearer " + idToken)
                .send(comment)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have
                        .property("content")
                        .eql("Test comment");
                    done();
                });
        });
    });

    describe("Delete comment /DELETE", () => {
        it("it should set deleted to true", done => {
            let comment = new Comment({
                parent: null,
                poster: null,
                content: "Test comment"
            });
            comment.save((err, comment) => {
                comment.should.have.property("deleted").eql(false);
                chai.request(server)
                    .delete(`/api/comment/${comment._id}`)
                    .set("Authorization", "Bearer " + idToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("deleted").eql(true);
                        done();
                    });
            });
        });
    });

    describe("Reply /POST", () => {
        it("it should reply to a comment", done => {
            new Comment({ content: "parent", poster: "test" }).save(
                (err, parent) => {
                    new Comment({
                        content: "child",
                        poster: "test",
                        parent: parent
                    }).save((err, child) => {
                        chai.request(server)
                            .post(`/api/comment/${parent._id}/reply`)
                            .set("Authorization", "Bearer " + idToken)
                            .send({ reply_id: child._id })
                            .end((err, res) => {
                                res.should.have.status(200);
                                let children = res.body.children;
                                children.length.should.eql(1);
                                done();
                            });
                    });
                }
            );
        });

        it("it should fail to reply to a comment", done => {
            chai.request(server)
                .post(`/api/comment/1/reply`)
                .set("Authorization", "Bearer " + idToken)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to reply to a comment", done => {
            new Comment({ content: "parent", poster: "test" }).save(
                (err, parent) => {
                    Comment.findByIdAndDelete(parent._id, (err, comment) => {
                        chai.request(server)
                            .post(`/api/comment/${parent._id}/reply`)
                            .set("Authorization", "Bearer " + idToken)
                            .end((err, res) => {
                                res.should.have.status(500);
                                done();
                            });
                    });
                }
            );
        });
    });

    describe("Get a comment /GET", () => {
        it("it should get a comment", done => {
            new Comment({ content: "parent", poster: "test" }).save(
                (err, comment) => {
                    chai.request(server)
                        .get(`/api/comment/${comment._id}`)
                        .set("Authorization", "Bearer " + idToken)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                }
            );
        });
    });

    describe("Error testing", () => {
        it("it should fail to create a comment", done => {
            let comment = {
                parent: null,
                poster: null
            };
            chai.request(server)
                .post("/api/comment")
                .set("Authorization", "Bearer " + idToken)
                .send(comment)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to delete a comment", done => {
            let comment = new Comment({
                parent: null,
                poster: null,
                content: "Test comment"
            });
            comment.save((err, comment) => {
                comment.should.have.property("deleted").eql(false);
                chai.request(server)
                    .delete(`/api/comment/1`)
                    .set("Authorization", "Bearer " + idToken)
                    .end((err, res) => {
                        res.should.have.status(500);
                        done();
                    });
            });
        });
    });
});
