import React, { Component } from "react";
import { Row, Col, Button, Jumbotron, Container } from "reactstrap";

const footer = {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    textAlign: "center"
};

class Dashboard extends Component {
    state = {};

    componentDidMount() {
        document.title = "Dashboard";
    }

    render() {
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3 className="display-3">Dashboard</h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
                    <Container>
                        <Row>
                            <Col className="md-4">
                                <h2>Interview</h2>
                                <p>
                                    View and answer technical questions to help
                                    prepare you for Interviews
                                </p>
                                <Button color="primary">
                                    Click Here &raquo;
                                </Button>
                            </Col>
                            <Col className="md-4">
                                <h2>Topic</h2>
                                <p>
                                    View and answer technical questions sorted
                                    by Topic
                                </p>
                                <Button color="primary">
                                    Click Here &raquo;
                                </Button>
                            </Col>
                            <Col className="md-4">
                                <h2>Course</h2>
                                <p>
                                    View and answer technical questions sorted
                                    by Course
                                </p>
                                <Button color="primary">
                                    Click Here &raquo;
                                </Button>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <p>Idea: Place history here as well</p>
                            </Col>
                        </Row>
                    </Container>
                </main>
                <footer
                    style={{
                        width: "100%",
                        position: "absolute",
                        bottom: "0",
                        paddingBottom: "16px",
                        height: "96px"
                    }}
                >
                    <Container>
                        <hr />
                        <p>&copy; CodeShack 2019</p>
                    </Container>
                </footer>
            </div>
        );
    }
}

export default Dashboard;
