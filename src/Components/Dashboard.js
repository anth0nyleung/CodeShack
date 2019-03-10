import React, { Component } from "react";
import { Button } from "reactstrap";

class Dashboard extends Component {
    state = {};
    render() {
        return (
            <div
                style={{
                    padding: "16px",
                    marginLeft: "10%",
                    marginRight: "10%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Button
                    style={{ padding: "40px" }}
                    color="uw-red"
                    size="lg"
                    block
                >
                    Interview
                </Button>
                <Button
                    style={{ padding: "40px" }}
                    color="uw-red"
                    size="lg"
                    block
                >
                    Courses
                </Button>
                <Button
                    style={{ padding: "40px" }}
                    color="uw-red"
                    size="lg"
                    block
                >
                    Topic
                </Button>
            </div>
        );
    }
}

export default Dashboard;
