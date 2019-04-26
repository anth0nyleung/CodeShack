import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";

import { Login } from "../../src/Components/Login";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Login component testing", () => {
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
    it("it should render correctly", done => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find("Button").length).to.equal(2);
        expect(wrapper.find("Form").length).to.equal(1);
        done();
    });
});
