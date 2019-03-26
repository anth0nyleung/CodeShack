process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Course = require("../src/Backend/Models/course.model");

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
    });
    /*
    describe("Update course /PATCH", () => {
        it("it should update a course", done => {
            let course = new Course({
                courseName: "Test Course"
            });

            var id;
            course.save((err, course) => {
                course.should.have.property("courseName").eql("Test Course");
                id = course._id;
            });

            let newCourseName = { courseName: "Updated Course" };
            chai.request(server)
                .patch(`api/course/${id}`)
                .send(newCourseName)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have
                        .property("courseName")
                        .eql("Updated Course");
                });
        });
    });*/
});
