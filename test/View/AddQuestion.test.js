import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { AddQuestion } from "../../src/Components/AddQuestion";

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
    user: {}
};

describe("Add Question", () => {
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
});
