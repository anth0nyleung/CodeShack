import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { Container } from "reactstrap";
import { Signup } from "../../src/Components/Signup";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Signup component testing", () => {
    it("it should render correctly", done => {
        const wrapper = shallow(<Signup courses={[]} />, {
            disableLifecycleMethods: true
        });
        expect(wrapper.find("Button").length).to.equal(1);
        expect(wrapper.find("Input").length).to.equal(4);
        done();
    });
});
