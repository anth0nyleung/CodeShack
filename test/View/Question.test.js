import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import { Question } from "../../src/Components/Question";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const props = {
    question: { comments: [] },
    username: "Test",
    user_id: "123"
};

describe("Question", () => {
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
    it("it should render Question correctly", done => {
        const wrapper = shallow(<Question question={props.question} />, {
            disableLifecycleMethods: true
        });
        expect(wrapper.find("Jumbotron").length).to.equal(1);
        done();
    });
});
