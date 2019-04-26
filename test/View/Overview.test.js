import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { CourseOverview } from "../../src/Components/CourseOverview";
import { TopicOverview } from "../../src/Components/TopicOverview";
import { CompanyOverview } from "../../src/Components/CompanyOverview";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Overview component testing", () => {
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
    it("it should render CourseOverview correctly", done => {
        const wrapper = shallow(
            <CourseOverview
                courses={[{ courseName: "Test", courseNumber: "123" }]}
            />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("Container").length).to.equal(2);
        done();
    });

    it("it should render TopicOverview correctly", done => {
        const wrapper = shallow(
            <TopicOverview topics={[{ topicName: "Test" }]} />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("Container").length).to.equal(2);
        done();
    });

    it("it should render CompanyOverview correctly", done => {
        const wrapper = shallow(
            <CompanyOverview companies={[{ companyName: "Test" }]} />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("Container").length).to.equal(2);
        done();
    });
});
