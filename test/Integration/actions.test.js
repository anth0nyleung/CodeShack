import * as actions from "../../src/redux/actions/actions";
import { expect } from "chai";
import sinon from "sinon";

process.env.NODE_ENV = "test";
var MockAdapter = require("axios-mock-adapter");
var axios = require("axios");

var mock;

describe("Actions", () => {
    var warn, error, info;
    beforeEach(done => {
        mock = new MockAdapter(axios);
        error = sinon.stub(console, "error");
        warn = sinon.stub(console, "warn");
        info = sinon.stub(console, "info");
        done();
    });
    afterEach(done => {
        error.restore();
        warn.restore();
        info.restore();
        mock.restore();
        done();
    });
    it("it should send action to load topics", done => {
        mock.onGet("http://localhost:8080/api/topic").reply(200, {});
        const test = actions.loadAllTopics();
        var total = 0;
        test(action => {
            total++;
            switch (total) {
                case 1:
                    action.type.should.eql("START_LOADING");
                    break;
                case 2:
                    action.type.should.eql("LOAD_TOPICS");
                    break;
                case 3:
                    action.type.should.eql("STOP_LOADING");
                    done();
                    break;
                default:
                    break;
            }
        });
    });

    it("it should send actino to load a specific topic", done => {
        mock.onGet("http://localhost:8080/api/topic/123").reply(200, {});
        const test = actions.loadTopic("123");
        var total = 0;
        test(action => {
            total++;
            switch (total) {
                case 1:
                    action.type.should.eql("START_LOADING");
                    break;
                case 2:
                    action.type.should.eql("LOAD_TOPIC");
                    break;
                case 3:
                    action.type.should.eql("STOP_LOADING");
                    done();
                    break;
                default:
                    break;
            }
        });
    });

    it("it should send a LOAD_COMPANIES action", done => {
        mock.onGet("http://localhost:8080/api/company").reply(200, {});
        const test = actions.loadAllCompanies();
        var total = 0;
        test(action => {
            total++;
            switch (total) {
                case 1:
                    action.type.should.eql("START_LOADING");
                    break;
                case 2:
                    action.type.should.eql("LOAD_COMPANIES");
                    break;
                case 3:
                    action.type.should.eql("STOP_LOADING");
                    done();
                    break;
                default:
                    break;
            }
        });
    });

    it("it should send a LOAD_COMPANY aciton", done => {
        mock.onGet("http://localhost:8080/api/company/123").reply(200, {});

        const test = actions.loadCompany("123");
        var total = 0;
        test(action => {
            total++;
            switch (total) {
                case 1:
                    action.type.should.eql("START_LOADING");
                    break;
                case 2:
                    action.type.should.eql("LOAD_COMPANY");
                    break;
                case 3:
                    action.type.should.eql("STOP_LOADING");
                    done();
                    break;
                default:
                    break;
            }
        });
    });

    it("it should send a START_LOADING and LOAD_QUESITON action", done => {
        mock.onGet("http://localhost:8080/api/question/123").reply(200, {});
        const test = actions.loadQuestion("123");
        var total = 0;
        test(action => {
            total++;
            switch (total) {
                case 1:
                    action.type.should.eql("START_LOADING");
                    break;
                case 2:
                    action.type.should.eql("LOAD_QUESTION");
                    break;
                case 3:
                    action.type.should.eql("STOP_LOADING");
                    done();
                    break;
                default:
                    break;
            }
        });
    });

    it("it should fail to send a LOAD_QUESITON", done => {
        mock.onGet("http://localhost:8080/api/question/error").reply(500, {});
        const test = actions.loadQuestion("error");
        var total = 0;
        test(action => {
            total++;
            switch (total) {
                case 1:
                    action.type.should.eql("START_LOADING");
                    break;
                case 2:
                    action.type.should.eql("STOP_LOADING");
                    done();
                    break;
                default:
                    break;
            }
        });
    });

    it("it should send LOAD_COURSES", done => {
        mock.onGet("http://localhost:8080/api/course").reply(200, {});
        const test = actions.loadAllCourses();
        var total = 0;
        test(action => {
            total++;
            switch (total) {
                case 1:
                    action.type.should.eql("START_LOADING");
                    break;
                case 2:
                    action.type.should.eql("LOAD_COURSES");
                    break;
                case 3:
                    action.type.should.eql("STOP_LOADING");
                    done();
                    break;
                default:
                    break;
            }
        });
    });

    it("it should send a LOAD_COURSE action", done => {
        mock.onGet("http://localhost:8080/api/course/123").reply(200, {});
        const test = actions.loadCourse("123");
        var total = 0;
        test(action => {
            total++;
            switch (total) {
                case 1:
                    action.type.should.eql("START_LOADING");
                    break;
                case 2:
                    action.type.should.eql("LOAD_COURSE");
                    break;
                case 3:
                    action.type.should.eql("STOP_LOADING");
                    done();
                    break;
                default:
                    break;
            }
        });
    });

    it("it should callback", done => {
        mock.onPost("http://localhost:8080/api/question").reply(200, {
            succeeded: true
        });
        const test = actions.createQuestion({}, (err, data) => {
            data.succeeded.should.eql(true);
            done();
        });
        test(() => {});
    });

    it("it should send SET_USER", done => {
        mock.onGet("http://localhost:8080/api/user/").reply(200, {});
        const test = actions.loginUser();
        var total = 0;
        test(action => {
            total++;
            switch (total) {
                case 1:
                    action.type.should.eql("START_LOADING");
                    break;
                case 2:
                    action.type.should.eql("SET_USER");
                    break;
                case 3:
                    action.type.should.eql("STOP_LOADING");
                    done();
                    break;
                default:
                    break;
            }
        });
    });

    it("it should callback", done => {
        mock.onPost("http://localhost:8080/api/comment").reply(200, {
            parent: null
        });
        mock.onPost("http://localhost:8080/api/question/1/addcomment").reply(
            200,
            {
                succeeded: true
            }
        );
        const test = actions.createCommentAndReply({}, 1, () => {
            done();
        });
        test();
    });

    it("it should callback", done => {
        mock.onPost("http://localhost:8080/api/comment").reply(200, {
            parent: "1"
        });
        mock.onPost("http://localhost:8080/api/comment/1/reply").reply(200, {
            succeeded: true
        });
        const test = actions.createCommentAndReply({}, null, () => {
            done();
        });
        test();
    });

    it("it should LOAD_COMMENT action", done => {
        mock.onGet("http://localhost:8080/api/comment/123").reply(200, {});
        const test = actions.loadComment("123", () => {});
        test(action => {
            action.type.should.eql("LOAD_COMMENT");
            done();
        });
    });

    it("it should callback", done => {
        mock.onDelete("http://localhost:8080/api/comment/123").reply(200, {});
        const test = actions.deleteComment("123", () => {
            done();
        });
        test();
    });

    it("it should SET_USER action", done => {
        mock.onPost("http://localhost:8080/api/user").reply(200, {});
        const test = actions.signupUser({});
        test(action => {
            action.type.should.eql("SET_USER");
            done();
        });
    });

    it("it should AUTH_ERROR action", done => {
        mock.onPost("http://localhost:8080/api/user").reply(500, {});
        const test = actions.signupUser({});
        test(action => {
            action.type.should.eql("AUTH_ERROR");
            done();
        });
    });

    it("it should SET_USER action", done => {
        mock.onPost("http://localhost:8080/api/user/123/history").reply(
            200,
            {}
        );
        const test = actions.saveQuestionToUserHistory({}, "123");
        test(action => {
            action.type.should.eql("SET_USER");
            done();
        });
    });

    it("it should send a LOAD_QUESITONS and LOAD_TAGS", done => {
        mock.onGet("http://localhost:8080/api/question").reply(200, []);
        var total = 0;
        const test = actions.loadAllQuestions();
        test(action => {
            total++;
            switch (total) {
                case 1:
                    action.type.should.eql("START_LOADING");
                    break;
                case 2:
                    action.type.should.eql("LOAD_QUESTIONS");
                    break;
                case 3:
                    action.type.should.eql("LOAD_TAGS");
                    break;
                case 4:
                    action.type.should.eql("STOP_LOADING");
                    done();
                    break;
                default:
                    break;
            }
        });
    });
});
