import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    {/* Insert Routing here */}
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </div>
        );
    }
}

export default App;
