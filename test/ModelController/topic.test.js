process.env.NODE_ENV = "test";

let Topic = require("../../server/Models/topic.model");
let Question = require("../../server/Models/question.model");
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

describe("Topic", () => {
    beforeEach(done => {
        Topic.deleteMany({}, err => {
            Question.deleteMany({}, err => {
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

    describe("Create topic /POST", () => {
        it("it should create a topic", done => {
            let topic = {
                topicName: "Test"
            };
            chai.request(server)
                .post("/api/topic")
                .set("Authentication", "Bearer " + idToken)
                .send(topic)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("topicName").eql("Test");
                    done();
                });
        });

        it("it should fail to create a topic", done => {
            chai.request(server)
                .post("/api/topic")
                .set("Authentication", "Bearer " + idToken)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe("Update Topic /POST", () => {
        it("it should update a topic", done => {
            let topic = new Topic({
                topicName: "Test"
            });
            var id;
            topic.save((err, topic) => {
                topic.should.have.property("topicName").eql("Test");
                id = topic._id;

                let newTopicName = { topicName: "Updated Topic" };
                chai.request(server)
                    .patch(`/api/topic/${id}`)
                    .set("Authentication", "Bearer " + idToken)
                    .send(newTopicName)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have
                            .property("topicName")
                            .eql("Updated Topic");
                        done();
                    });
            });
        });

        it("it should fail to update a topic", done => {
            chai.request(server)
                .patch(`/api/topic/1`)
                .set("Authentication", "Bearer " + idToken)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to update a topic", done => {
            let topic = new Topic({
                topicName: "Test"
            });
            var id;
            topic.save((err, topic) => {
                id = topic._id;
                Topic.findByIdAndDelete(id, err => {
                    let newTopicName = { topicName: "Updated Topic" };
                    chai.request(server)
                        .patch(`/api/topic/${id}`)
                        .set("Authentication", "Bearer " + idToken)
                        .send(newTopicName)
                        .end((err, res) => {
                            res.should.have.status(500);
                            done();
                        });
                });
            });
        });
    });
    describe("Get topics /GET", () => {
        it("it should get a list of all topics", done => {
            new Topic({
                topicName: "Test"
            }).save((err, topic) => {
                new Topic({
                    topicName: "Test1"
                }).save((err, topic1) => {
                    chai.request(server)
                        .get("/api/topic")
                        .set("Authentication", "Bearer " + idToken)
                        .end((err, res) => {
                            res.should.have.status(200);
                            let topics = res.body;
                            topics.length.should.eql(2);
                            done();
                        });
                });
            });
        });
    });

    describe("Get Topic /GET", () => {
        it("it should get a topic", done => {
            let topic = new Topic({
                topicName: "Test"
            });

            var id;
            topic.save((err, topic) => {
                id = topic._id;

                chai.request(server)
                    .get(`/api/topic/${id}`)
                    .set("Authentication", "Bearer " + idToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property("topicName").eql("Test");
                        done();
                    });
            });
        });

        it("it should fail to get a topic", done => {
            chai.request(server)
                .get(`/api/topic/1`)
                .set("Authentication", "Bearer " + idToken)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to get a topic", done => {
            let topic = new Topic({
                topicName: "Test"
            });

            var id;
            topic.save((err, topic) => {
                id = topic._id;
                Topic.findByIdAndDelete(id, err => {
                    chai.request(server)
                        .get(`/api/topic/${id}`)
                        .set("Authentication", "Bearer " + idToken)
                        .end((err, res) => {
                            res.should.have.status(500);
                            done();
                        });
                });
            });
        });
    });

    describe("Add Question /POST", () => {
        it("it should add a question to a topic", done => {
            let topic = new Topic({
                topicName: "Test"
            });

            var topic_id;
            topic.save((err, topic) => {
                topic_id = topic._id;
                let question = new Question({
                    name: "Question 1",
                    content: "Content is here."
                });

                var question_id;
                question.save((err, question) => {
                    question_id = question._id;

                    chai.request(server)
                        .post(`/api/topic/${topic_id}/addq`)
                        .set("Authentication", "Bearer " + idToken)
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
                .post(`/api/topic/1/addq`)
                .set("Authentication", "Bearer " + idToken)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to add the question", done => {
            let topic = new Topic({
                topicName: "Test"
            });

            var topic_id;
            topic.save((err, topic) => {
                topic_id = topic._id;
                Topic.findByIdAndDelete(topic_id, err => {
                    chai.request(server)
                        .post(`/api/topic/${topic_id}/addq`)
                        .set("Authentication", "Bearer " + idToken)
                        .end((err, res) => {
                            res.should.have.status(500);
                            done();
                        });
                });
            });
        });
    });
});
