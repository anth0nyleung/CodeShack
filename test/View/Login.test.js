import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { Container } from "reactstrap";
import { Login } from "../../src/Components/Login";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Login component testing", () => {
    it("it should render correctly", done => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find("Button").length).to.equal(2);
        expect(wrapper.find("Form").length).to.equal(1);
        done();
    });
});
