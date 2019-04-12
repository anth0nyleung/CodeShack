import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { CourseOverview } from "../../src/Components/CourseOverview";
import { TopicOverview } from "../../src/Components/TopicOverview";
import { CompanyOverview } from "../../src/Components/CompanyOverview";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Overview component testing", () => {
    it("it should render CourseOverview correctly", done => {
        const wrapper = shallow(
            <CourseOverview
                courses={[{ courseName: "Test", courseNumber: "123" }]}
            />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("BootstrapTable").length).to.equal(1);
        done();
    });

    it("it should render TopicOverview correctly", done => {
        const wrapper = shallow(
            <TopicOverview topics={[{ topicName: "Test" }]} />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("BootstrapTable").length).to.equal(1);
        done();
    });

    it("it should render CompanyOverview correctly", done => {
        const wrapper = shallow(
            <CompanyOverview companies={[{ companyName: "Test" }]} />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("BootstrapTable").length).to.equal(1);
        done();
    });
});
