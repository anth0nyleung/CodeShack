import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    {/* Insert Routing here */}
                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        );
    }
}

export default App;
