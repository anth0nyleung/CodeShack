import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    {/* Insert Routing here */}
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </div>
        );
    }
}

export default App;
