import * as actions from "../../src/redux/actions/actions";
import { expect } from "chai";
import sinon from "sinon";
import Axios from "axios";
import UserProfile from "../../src/Components/UserProfile";

let Course = require("../../server/Models/course.model");
let Topic = require("../../server/Models/topic.model");
let Company = require("../../server/Models/company.model");
let User = require("../../server/Models/user.model");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server/server");
var axios = require("axios");
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

describe("Integration Tests", () => {
    beforeEach(done => {
        admin
            .auth()
            .createCustomToken(UID)
            .then(token => {
                getIdTokenFromCustomToken(token, () => {
                    axios.defaults.headers.common["Authorization"] =
                        "Bearer " + idToken;
                    done();
                });
            });
    });

    describe("User", () => {
        before(done => {
            User.deleteMany({}, err => {
                done();
            });
        });
        it("it should create a user", done => {
            const test = actions.signupUser({
                firebase_id: UID,
                email: "test",
                username: "test",
                name: "test",
                year: "test",
                courses: []
            });

            test(action => {
                action.type.should.eql("SET_USER");
                action.user.name.should.eql("test");
                done();
            });
        });

        it("it should update a user", done => {
            const test = actions.updateUser({
                name: "new"
            });

            test(action => {
                if (action.type === "SET_USER") {
                    action.user.name.should.eql("new");
                    done();
                }
            });
        });
    });
    describe("Course", () => {
        before(done => {
            Course.deleteMany({}, err => {
                done();
            });
        });

        it("it should get a course", done => {
            new Course({ courseName: "Test", courseNumber: "1" }).save(
                (err, course) => {
                    const test = actions.loadCourse(course._id);
                    test(action => {
                        if (action.type === "LOAD_COURSE") {
                            action.course.courseName.should.eql("Test");
                            done();
                        }
                    });
                }
            );
        });

        it("it should get all courses", done => {
            const test = actions.loadAllCourses();
            test(action => {
                if (action.type === "LOAD_COURSES") {
                    action.courses.length.should.eql(1);
                    done();
                }
            });
        });
    });

    describe("Topic", done => {
        before(done => {
            Topic.deleteMany({}, err => {
                done();
            });
        });

        it("it should get a topic", done => {
            new Topic({ topicName: "Test" }).save((err, topic) => {
                const test = actions.loadTopic(topic._id);
                test(action => {
                    if (action.type === "LOAD_TOPIC") {
                        action.topic.topicName.should.eql("Test");
                        done();
                    }
                });
            });
        });

        it("it should get all topics", done => {
            const test = actions.loadAllTopics();
            test(action => {
                if (action.type === "LOAD_TOPICS") {
                    action.topics.length.should.eql(1);
                    done();
                }
            });
        });
    });
    describe("Company", done => {
        before(done => {
            Company.deleteMany({}, err => {
                done();
            });
        });

        it("it should get a company", done => {
            new Company({ companyName: "Test" }).save((err, company) => {
                const test = actions.loadCompany(company._id);
                test(action => {
                    if (action.type === "LOAD_COMPANY") {
                        action.company.companyName.should.eql("Test");
                        done();
                    }
                });
            });
        });

        it("it should get all companies", done => {
            const test = actions.loadAllCompanies();
            test(action => {
                if (action.type === "LOAD_COMPANIES") {
                    action.companies.length.should.eql(1);
                    done();
                }
            });
        });
    });
});
