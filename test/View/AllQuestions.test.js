import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";

import { AllQuestions } from "../../src/Components/AllQuestions";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const props = {
    questions: [],
    questionTags: "asdf"
};

describe("Add Question", () => {
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
    it("it should render All Questions correctly", done => {
        const wrapper = shallow(
            <AllQuestions
                questions={props.questions}
                isLoading={false}
                questionTags={props.questionTags}
            />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("Container").length.should.eql(2));
        done();
    });
    it("it should render a loading bar", done => {
        const wrapper = shallow(
            <AllQuestions
                questions={props.questions}
                isLoading={true}
                questionTags={props.questionTags}
            />,
            { disableLifecycleMethods: true }
        );
        expect(wrapper.find("main").length.should.eql(1));
        done();
    });
});
