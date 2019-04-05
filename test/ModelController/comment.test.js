process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Comment = require("../../src/Backend/Models/comment.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../src/Backend/server");
let should = chai.should();

chai.use(chaiHttp);
describe("Comments", () => {
    beforeEach(done => {
        Comment.deleteMany({}, err => {
            done();
        });
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
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("deleted").eql(true);
                        done();
                    });
            });
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
                    .end((err, res) => {
                        res.should.have.status(500);
                        done();
                    });
            });
        });
    });
});
