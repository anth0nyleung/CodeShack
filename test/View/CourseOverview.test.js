import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { Container } from "reactstrap";
import { CourseOverview } from "../../src/Components/CourseOverview";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("CourseOverview component testing", () => {
    it("it should render correctly", done => {
        const wrapper = shallow(
            <CourseOverview
                courses={[{ courseName: "Test", courseNumber: "123" }]}
            />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("BootstrapTable").length).to.equal(1);
        done();
    });
});
