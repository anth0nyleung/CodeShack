import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { AddQuestion } from "../../src/Components/AddQuestion";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const JSDOM = require("mocha-jsdom");
const Storage = require("dom-storage");
global.localStorage = new Storage(null, { strict: true });
global.sessionStorage = new Storage(null, { strict: true });
global.document = JSDOM("", { url: "http://localhost" });

const props = {
    companies: [
        {
            companyName: "Test1"
        },
        {
            companyName: "Test2"
        }
    ],
    topics: [{ topicName: "Topic1" }],
    courses: [{ courseName: "ASDF", courseNumber: "CS1234" }],
    user: { _id: "1" }
};

describe("Add Question", () => {
    var warn, error;
    beforeEach(done => {
        error = sinon.stub(console, "error");
        warn = sinon.stub(console, "warn");
        done();
    });
    afterEach(done => {
        error.restore();
        warn.restore();
        done();
    });
    it("it should render Add Question correctly", done => {
        const wrapper = shallow(
            <AddQuestion
                companies={props.companies}
                topics={props.topics}
                courses={props.courses}
                user={props.user}
            />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("DraftailEditor").length).to.equal(2);
        done();
    });

    it("it should handle tag correctly", done => {
        const wrapper = shallow(
            <AddQuestion
                companies={props.companies}
                topics={props.topics}
                courses={props.courses}
                user={props.user}
            />,
            { disableLifecycleMethods: true }
        );
        wrapper
            .instance()
            .handleTagChange([
                { value: ["course", "1"] },
                { value: ["topic", "1"] },
                { value: ["company", "1"] }
            ]);
        expect(wrapper.instance().state.courses.length.should.eql(1));
        done();
    });
    it("it should handle onSubmit correctly", done => {
        var createQuestion = sinon.spy();
        var saveQuestionToUserHistory = sinon.spy();
        const wrapper = shallow(
            <AddQuestion
                companies={props.companies}
                topics={props.topics}
                courses={props.courses}
                user={props.user}
                createQuestion={createQuestion}
                saveQuestionToUserHistory={saveQuestionToUserHistory}
            />,
            { disableLifecycleMethods: true }
        );

        wrapper.instance().state = {
            name: "test",
            content: "{test: 1}",
            solution: "{test: 1}",
            courses: ["123"],
            topics: [],
            companies: []
        };
        wrapper.update();
        wrapper
            .find("Button")
            .at(0)
            .simulate("click", {});
        expect(createQuestion.called.should.eql(true));
        done();
    });
});
