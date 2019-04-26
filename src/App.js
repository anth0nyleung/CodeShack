import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import CourseOverview from "./Components/CourseOverview";
import CompanyOverview from "./Components/CompanyOverview";
import TopicOverview from "./Components/TopicOverview";
import EnsureAuthContainer from "./Components/EnsureAuthContainer";
import NotFound from "./Components/NotFound";
import CourseQuestions from "./Components/CourseQuestions";
import CompanyQuestions from "./Components/CompanyQuestions";
import TopicQuestions from "./Components/TopicQuestions";
import NavBar from "./Components/NavBar";
import UserProfile from "./Components/UserProfile";
import Question from "./Components/Question";
import Main from "./Components/Main";
import AddQuestion from "./Components/AddQuestion";
import AllQuestions from "./Components/AllQuestions";
import Logout from "./Components/Logout";
import HelpPage from "./Components/HelpPage";

class App extends Component {
    render() {
        return (
            <div>
                <NavBar color="red" />
                <Switch>
                    {/* Insert Routing here */}
                    <Route exact path="/" component={Main} />
                    <Route
                        exact
                        path="/dashboard"
                        component={EnsureAuthContainer(Dashboard)}
                    />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route
                        exact
                        path="/courses"
                        component={EnsureAuthContainer(CourseOverview)}
                    />
                    <Route
                        exact
                        path="/profile"
                        component={EnsureAuthContainer(UserProfile)}
                    />
                    <Route
                        exact
                        path="/company"
                        component={EnsureAuthContainer(CompanyOverview)}
                    />
                    <Route
                        exact
                        path="/topic"
                        component={EnsureAuthContainer(TopicOverview)}
                    />
                    <Route
                        exact
                        path="/company/:id"
                        component={EnsureAuthContainer(CompanyQuestions)}
                    />
                    <Route
                        exact
                        path="/courses/:id"
                        component={EnsureAuthContainer(CourseQuestions)}
                    />
                    <Route
                        exact
                        path="/topic/:id"
                        component={EnsureAuthContainer(TopicQuestions)}
                    />
                    <Route
                        exact
                        path="/question/:id"
                        component={EnsureAuthContainer(Question)}
                    />
                    <Route
                        exact
                        path="/createquestion"
                        component={EnsureAuthContainer(AddQuestion)}
                    />
                    <Route
                        exact
                        path="/questions"
                        component={EnsureAuthContainer(AllQuestions)}
                    />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/help" component={HelpPage} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
