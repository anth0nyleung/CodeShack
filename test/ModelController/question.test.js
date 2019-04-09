process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Course = require("../../src/Backend/Models/course.model");
let Question = require("../../src/Backend/Models/question.model");
let Company = require("../../src/Backend/Models/company.model");
let Topic = require("../../src/Backend/Models/topic.model");
let Comment = require("../../src/Backend/Models/comment.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../src/Backend/server");
let should = chai.should();

chai.use(chaiHttp);

describe("Question", () => {
    beforeEach(done => {
        Question.deleteMany({}, err => {
            done();
        });
    });

    describe("Create question /POST", () => {
        it("it should create a question", done => {
            let question = {
                name: "Two-sum",
                content: "Consider an array...",
                solution: "None provided"
            };

            chai.request(server)
                .post("/api/question")
                .send(question)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").eql("Two-sum");
                    res.body.should.have
                        .property("content")
                        .eql("Consider an array...");
                    res.body.should.have
                        .property("solution")
                        .eql("None provided");
                    done();
                });
        });

        it("it should fail to create a question", done => {
            let question = {
                name: "Two-sum"
            };

            chai.request(server)
                .post("/api/question")
                .send(question)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe("Update question /PATCH", () => {
        it("it should update a question", done => {
            new Question({ name: "Old name", content: "Old content" }).save(
                (err, question) => {
                    question.name.should.eql("Old name");
                    question.content.should.eql("Old content");

                    let updateQuestion = {
                        name: "New name",
                        content: "New content"
                    };
                    let id = question._id;

                    chai.request(server)
                        .patch(`/api/question/${id}`)
                        .send(updateQuestion)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a("object");
                            res.body.should.have
                                .property("name")
                                .eql("New name");
                            res.body.should.have
                                .property("content")
                                .eql("New content");
                            done();
                        });
                }
            );
        });

        it("it should fail to update a question", done => {
            chai.request(server)
                .patch(`/api/question/1`)
                .send({})
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to update a question", done => {
            new Question({ name: "Old name", content: "Old content" }).save(
                (err, question) => {
                    question.name.should.eql("Old name");
                    question.content.should.eql("Old content");

                    let id = question._id;
                    Question.findByIdAndDelete(id, err => {
                        chai.request(server)
                            .patch(`/api/question/${id}`)
                            .send({})
                            .end((err, res) => {
                                res.should.have.status(500);
                                done();
                            });
                    });
                }
            );
        });

        it("it should fail to update a question", done => {
            new Question({ name: "Old name", content: "Old content" }).save(
                (err, question) => {
                    question.name.should.eql("Old name");
                    question.content.should.eql("Old content");

                    let updateQuestion = {
                        name: "",
                        content: ""
                    };
                    let id = question._id;

                    chai.request(server)
                        .patch(`/api/question/${id}`)
                        .send(updateQuestion)
                        .end((err, res) => {
                            res.should.have.status(500);
                            done();
                        });
                }
            );
        });
    });

    describe("Get question /GET", () => {
        it("it should get a question", done => {
            new Question({
                name: "Network Flow",
                content: "Construct a...",
                solution: "See this website"
            }).save((err, question) => {
                let id = question._id;

                chai.request(server)
                    .get(`/api/question/${id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have
                            .property("name")
                            .eql("Network Flow");
                        res.body.should.have.property("_id").eql(id.toString());
                        done();
                    });
            });
        });

        it("it should fail to get a question", done => {
            chai.request(server)
                .get("/api/question/1234")
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe("Add a course /POST", () => {
        it("it should add a course to a question", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    new Course({
                        courseName: "Test course",
                        courseNumber: "CS504"
                    }).save((err, course) => {
                        let course_id = course._id;

                        chai.request(server)
                            .post(`/api/question/${question_id}/addcourse`)
                            .send({ course_id: course_id })
                            .end((err, res) => {
                                res.should.have.status(200);
                                let courses = res.body.courses;
                                courses.length.should.eql(1);
                                done();
                            });
                    });
                }
            );
        });

        it("it should fail to add a course to a question", done => {
            chai.request(server)
                .post("/api/question/123345432/addcourse")
                .end((err, res) => {
                    res.should.have.status(500);
                });
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    new Course({
                        courseName: "Test course",
                        courseNumber: "ASDF"
                    }).save((err, course) => {
                        chai.request(server)
                            .post(`/api/question/${question_id}/addcourse`)
                            .send({ course_id: "1234" })
                            .end((err, res) => {
                                res.should.have.status(500);
                                done();
                            });
                    });
                }
            );
        });

        it("it should fail to add a course", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;
                    Question.findByIdAndDelete(question_id, err => {
                        new Course({
                            courseName: "Test course",
                            courseNumber: "ASDF"
                        }).save((err, course) => {
                            chai.request(server)
                                .post(`/api/question/${question_id}/addcourse`)
                                .send({ course_id: course._id })
                                .end((err, res) => {
                                    res.should.have.status(500);
                                    done();
                                });
                        });
                    });
                }
            );
        });

        it("it should fail to add a course", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    new Course({
                        courseName: "Test course",
                        courseNumber: "ASDF"
                    }).save((err, course) => {
                        let course_id = course._id;

                        Course.findByIdAndDelete(course_id, err => {
                            chai.request(server)
                                .post(`/api/question/${question_id}/addcourse`)
                                .send({ course_id: course_id })
                                .end((err, res) => {
                                    res.should.have.status(500);
                                    done();
                                });
                        });
                    });
                }
            );
        });
    });

    describe("Add a Topic /POST", () => {
        it("it should add a Topic", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    new Topic({
                        topicName: "Test course"
                    }).save((err, topic) => {
                        let topic_id = topic._id;

                        chai.request(server)
                            .post(`/api/question/${question_id}/addtopic`)
                            .send({ topic_id: topic_id })
                            .end((err, res) => {
                                res.should.have.status(200);
                                let topics = res.body.topics;
                                topics.length.should.eql(1);
                                done();
                            });
                    });
                }
            );
        });

        it("it should fail to add a topic", done => {
            chai.request(server)
                .post(`/api/question/1/addtopic`)
                .send({})
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to add a topic", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    new Topic({
                        topicName: "Test course"
                    }).save((err, topic) => {
                        let topic_id = topic._id;
                        Question.findByIdAndDelete(question_id, err => {
                            chai.request(server)
                                .post(`/api/question/${question_id}/addtopic`)
                                .send({ topic_id: topic_id })
                                .end((err, res) => {
                                    res.should.have.status(500);
                                    done();
                                });
                        });
                    });
                }
            );
        });

        it("it should fail to add a topic", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    new Topic({
                        topicName: "Test course"
                    }).save((err, topic) => {
                        chai.request(server)
                            .post(`/api/question/${question_id}/addtopic`)
                            .send({ topic_id: "123" })
                            .end((err, res) => {
                                res.should.have.status(500);
                                done();
                            });
                    });
                }
            );
        });

        it("it should fail to add a topic", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    new Topic({
                        topicName: "Test course"
                    }).save((err, topic) => {
                        let topic_id = topic._id;
                        Topic.findByIdAndDelete(topic_id, err => {
                            chai.request(server)
                                .post(`/api/question/${question_id}/addtopic`)
                                .send({ topic_id: topic_id })
                                .end((err, res) => {
                                    res.should.have.status(500);
                                    done();
                                });
                        });
                    });
                }
            );
        });
    });

    describe("Add Comment /POST", () => {
        it("it should add a comment", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    new Comment({
                        content: "Test"
                    }).save((err, comment) => {
                        let comment_id = comment._id;

                        chai.request(server)
                            .post(`/api/question/${question_id}/addcomment`)
                            .send({ comment_id: comment_id })
                            .end((err, res) => {
                                res.should.have.status(200);
                                let comments = res.body.comments;
                                comments.length.should.eql(1);
                                done();
                            });
                    });
                }
            );
        });

        it("it should fail to add a comment", done => {
            chai.request(server)
                .post(`/api/question/1/addcomment`)
                .send({})
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("it should fail to add a comment", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    Question.findByIdAndDelete(question_id, err => {
                        new Comment({
                            content: "Test"
                        }).save((err, comment) => {
                            let comment_id = comment._id;

                            chai.request(server)
                                .post(`/api/question/${question_id}/addcomment`)
                                .send({ comment_id: comment_id })
                                .end((err, res) => {
                                    res.should.have.status(500);
                                    done();
                                });
                        });
                    });
                }
            );
        });

        it("it should fail to add a comment", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    new Comment({
                        content: "Test"
                    }).save((err, comment) => {
                        let comment_id = comment._id;
                        Comment.findByIdAndDelete(comment_id, err => {
                            chai.request(server)
                                .post(`/api/question/${question_id}/addcomment`)
                                .send({ comment_id: comment_id })
                                .end((err, res) => {
                                    res.should.have.status(500);
                                    done();
                                });
                        });
                    });
                }
            );
        });

        it("it should fail to add a comment", done => {
            new Question({ name: "Test", content: "Test" }).save(
                (err, question) => {
                    let question_id = question._id;

                    new Comment({
                        content: "Test"
                    }).save((err, comment) => {
                        chai.request(server)
                            .post(`/api/question/${question_id}/addcomment`)
                            .send({ comment_id: "1" })
                            .end((err, res) => {
                                res.should.have.status(500);
                                done();
                            });
                    });
                }
            );
        });
    });
});