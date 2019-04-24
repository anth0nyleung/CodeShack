import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { Container } from "reactstrap";
import { CourseQuestions } from "../../src/Components/CourseQuestions";
import { TopicQuestions } from "../../src/Components/TopicQuestions";
import { CompanyQuestions } from "../../src/Components/CompanyQuestions";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const props = {
    currentCourse: {
        courseName: "Test",
        coureNumber: "123",
        questions: [{ name: "Test q" }, { name: "Test 1" }]
    },
    currentTopic: {
        topicName: "Test",
        questions: []
    },
    currentCompany: {
        companyName: "Test",
        questions: []
    },
    userCourses: []
};

describe("Questions component testing", () => {
    it("it should render CourseQuestions correctly", done => {
        const wrapper = shallow(
            <CourseQuestions
                currentCourse={props.currentCourse}
                userCourses={props.userCourses}
            />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("Container").length).to.equal(2);
        done();
    });

    it("it should render TopicQuestions correctly", done => {
        const wrapper = shallow(
            <TopicQuestions currentTopic={props.currentTopic} />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("Container").length).to.equal(2);
        done();
    });

    it("it should render CompanyQuestions correctly", done => {
        const wrapper = shallow(
            <CompanyQuestions currentCompany={props.currentCompany} />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("Container").length).to.equal(2);
        done();
    });
});
