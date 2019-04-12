import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { Question } from "../../src/Components/Question";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const props = {
    question: { comments: [] },
    username: "Test",
    user_id: "123"
};

describe("Question", () => {
    it("it should render Question correctly", done => {
        const wrapper = shallow(<Question question={props.question} />, {
            disableLifecycleMethods: true
        });
        expect(wrapper.find("Jumbotron").length).to.equal(1);
        done();
    });
});
