import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import CourseOverview from "./Components/CourseOverview";
import EnsureAuthContainer from "./Components/EnsureAuthContainer";
import NotFound from "./Components/NotFound";
import CourseQuestions from "./Components/CourseQuestions";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    {/* Insert Routing here */}
                    <Route
                        exact
                        path="/dashboard"
                        // component={EnsureAuthContainer(Dashboard)} FOR WHEN WE GET AUTHENTICATION WORKING
                        component={Dashboard}
                    />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/courses" component={CourseOverview} />
                    <Route
                        exact
                        path="/courses/:id"
                        component={CourseQuestions}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
