import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import App from "../src/App";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("App component testing", () => {
    it("it should render one div", done => {
        const wrapper = shallow(<App />);
        expect(wrapper.find("div").length).to.equal(1);
        done();
    });
});
