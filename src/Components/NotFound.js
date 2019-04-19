import React, { Component } from "react";

class NotFound extends Component {
    render() {
        document.title = "404 Not Found";
        return (
            <main>
                <h1 style={{ alignContent: "center" }}>404 Page Not Found</h1>
            </main>
        );
    }
}

export default NotFound;
