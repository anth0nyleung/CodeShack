import React from "react";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import App from "../src/App";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../src/Components/Dashboard";
import Login from "../src/Components/Login";
import Signup from "../src/Components/Signup";
import CourseOverview from "../src/Components/CourseOverview";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("App component testing", () => {
    it("it renders without crashing", done => {
        const wrapper = shallow(<App />);
        expect(
            wrapper.contains(
                <div>
                    <Switch>
                        {/* Insert Routing here */}
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route
                            exact
                            path="/courses"
                            component={CourseOverview}
                        />
                    </Switch>
                </div>
            )
        ).to.equal(true);
        done();
    });
});
