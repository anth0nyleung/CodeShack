import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { Container } from "reactstrap";
import { Signup } from "../../src/Components/Signup";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Signup component testing", () => {
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
        const wrapper = shallow(<Signup courses={[]} />, {
            disableLifecycleMethods: true
        });
        expect(wrapper.find("Button").length).to.equal(1);
        expect(wrapper.find("Input").length).to.equal(4);
        done();
    });
});
