import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import App from "../../src/App";
import Adapter from "enzyme-adapter-react-16";

const JSDOM = require("mocha-jsdom");
const Storage = require("dom-storage");
global.localStorage = new Storage(null, { strict: true });
global.sessionStorage = new Storage(null, { strict: true });
global.document = JSDOM("", { url: "http://localhost" });

configure({ adapter: new Adapter() });

describe("App component testing", () => {
    it("it should render one div", done => {
        const wrapper = shallow(<App />);
        expect(wrapper.find("div").length).to.equal(1);
        done();
    });
});
