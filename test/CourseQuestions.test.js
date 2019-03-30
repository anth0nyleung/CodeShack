import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { Container } from "reactstrap";
import { CourseQuestions } from "../src/Components/CourseQuestions";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const props = {
    currentCourse: {
        courseName: "Test",
        coureNumber: "123",
        questions: [{ name: "Test q" }, { name: "Test 1" }]
    }
};

describe("CourseQuestions component testing", () => {
    it("it should render correctly", done => {
        const wrapper = shallow(
            <CourseQuestions currentCourse={props.currentCourse} />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("ListGroupItem").length).to.equal(2);
        done();
    });
});
