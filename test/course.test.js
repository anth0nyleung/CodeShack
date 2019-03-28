process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Course = require("../src/Backend/Models/course.model");
let Question = require("../src/Backend/Models/question.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/Backend/server");
let should = chai.should();

chai.use(chaiHttp);
describe("Course", () => {
    beforeEach(done => {
        Course.deleteMany({}, err => {
            done();
        });
    });

    /* Test the /POST route */
    describe("Create course /POST", () => {
        it("it should create a course", done => {
            let course = {
                courseName: "CS 506"
            };
            chai.request(server)
                .post("/api/course")
                .send(course)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("courseName").eql("CS 506");
                    done();
                });
        });
        it("it should fail to create a course", done => {
            chai.request(server)
                .post("/api/course")
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe("Update course /PATCH", () => {
        it("it should update a course", done => {
            let course = new Course({
                courseName: "Test Course"
            });

            var id;
            course.save((err, course) => {
                course.should.have.property("courseName").eql("Test Course");
                id = course._id;

                let newCourseName = { courseName: "Updated Course" };
                chai.request(server)
                    .patch(`/api/course/${id}`)
                    .send(newCourseName)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have
                            .property("courseName")
                            .eql("Updated Course");
                        done();
                    });
            });
        });
    });

    describe("Get courses /GET", () => {
        it("it should get a list of all courses", done => {
            new Course({ courseName: "Course 1" }).save((err, course1) => {
                new Course({ courseName: "Course 2" }).save((err, course2) => {
                    chai.request(server)
                        .get("/api/course")
                        .end((err, res) => {
                            res.should.have.status(200);
                            let courses = res.body;
                            courses.length.should.eql(2);

                            done();
                        });
                });
            });
        });
    });

    describe("Get course /GET", () => {
        it("it should get a single course", done => {
            let course = new Course({
                courseName: "Test Course"
            });

            var id;
            course.save((err, course) => {
                course.should.have.property("courseName").eql("Test Course");
                id = course._id;

                chai.request(server)
                    .get(`/api/course/${id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have
                            .property("courseName")
                            .eql("Test Course");
                        done();
                    });
            });
        });
    });

    describe("Add Question /POST", () => {
        it("it should add a question to a course", done => {
            let course = new Course({
                courseName: "Test Course"
            });

            var course_id;
            course.save((err, course) => {
                course_id = course._id;
                let question = new Question({
                    name: "Question 1",
                    content: "Content is here."
                });

                var question_id;
                question.save((err, question) => {
                    question_id = question._id;

                    chai.request(server)
                        .post(`/api/course/${course_id}/addq`)
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
            let course = new Course({
                courseName: "New Course"
            });

            var course_id;
            course.save((err, course) => {
                var question_id = "1234";

                chai.request(server)
                    .post(`/api/course/${course_id}/addq`)
                    .send({ question_id: question_id })
                    .end((err, res) => {
                        res.should.have.status(500);
                        done();
                    });
            });
        });
    });
});
