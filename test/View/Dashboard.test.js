import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import { Container } from "reactstrap";
import { Dashboard } from "../../src/Components/Dashboard";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Dashboard component testing", () => {
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
    it("it should render one div", done => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find("div").length).to.equal(1);
        done();
    });
    it("it shouold render one jumbotron", done => {
        const wrapper = shallow(<Dashboard />);
        expect(
            wrapper.contains(
                <Container>
                    <h3 className="display-3">Dashboard</h3>
                    <hr className="my-2" />
                </Container>
            )
        ).to.equal(true);
        done();
    });
    it("it should contain 3 buttons", done => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find("Button").length).to.equal(6);
        done();
    });
});
