import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Button, Jumbotron, Container, Fade } from "reactstrap";
import { Default, Mobile } from "./utils/Responsive";

/**
 * Maps the state of the redux store to the properties of the component
 *
 * @param state The state of the application
 */
const mapStateToProps = state => {
    return {
        isLoading: state.loading.isLoading
    };
};

/**
 * Dashboard page component
 */
export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false
        };
    }
    componentDidMount() {
        // Sets the title of the page
        document.title = "Dashboard";
        this.setState({
            isLoaded: true
        });
    }

    /**
     * Redirects to the corresponding question page
     *
     * @param event.target.id The id of the questions to view
     */
    onQuestionClick = event => {
        // Redirect to specific question
    };

    /**
     * Redirects to the corresponding overview page
     *
     * @param event.target.id The name of the page to redirect to
     */
    onRedirect = event => {
        switch (event.target.id) {
            case "company":
                console.log("Redirecting to company");
                this.context.router.history.push("/company");
                break;
            case "topic":
                console.log("Redirecting to topic");
                this.context.router.history.push("/topic");
                break;
            case "course":
                console.log("Redirecting to course");
                this.context.router.history.push("/courses");
                break;
            default:
                console.error("Unintened redirect");
                break;
        }
    };

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
                        <Default>
                            <Row>
                                <Col className="md-4">
                                    <h2>Company</h2>
                                    <p>
                                        View and answer technical questions
                                        sorted by Company
                                    </p>
                                    <Button
                                        id="company"
                                        onClick={this.onRedirect}
                                        color="primary"
                                    >
                                        Click Here &raquo;
                                    </Button>
                                </Col>
                                <Col className="md-4">
                                    <h2>Topic</h2>
                                    <p>
                                        View and answer technical questions
                                        sorted by Topic
                                    </p>
                                    <Button
                                        id="topic"
                                        onClick={this.onRedirect}
                                        color="primary"
                                    >
                                        Click Here &raquo;
                                    </Button>
                                </Col>
                                <Col className="md-4">
                                    <h2>Course</h2>
                                    <p>
                                        View and answer technical questions
                                        sorted by Course
                                    </p>
                                    <Button
                                        id="course"
                                        onClick={this.onRedirect}
                                        color="primary"
                                    >
                                        Click Here &raquo;
                                    </Button>
                                </Col>
                            </Row>
                        </Default>
                        <Mobile>
                            <Row style={{ marginBottom: "16px" }}>
                                <Col>
                                    <h2>Company</h2>
                                    <p>
                                        View and answer technical questions
                                        sorted by Company
                                    </p>
                                    <Button
                                        id="company"
                                        onClick={this.onRedirect}
                                        color="primary"
                                    >
                                        Click Here &raquo;
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: "16px" }}>
                                <Col>
                                    <h2>Topic</h2>
                                    <p>
                                        View and answer technical questions
                                        sorted by Topic
                                    </p>
                                    <Button
                                        id="topic"
                                        onClick={this.onRedirect}
                                        color="primary"
                                    >
                                        Click Here &raquo;
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: "16px" }}>
                                <Col>
                                    <h2>Course</h2>
                                    <p>
                                        View and answer technical questions
                                        sorted by Course
                                    </p>
                                    <Button
                                        id="course"
                                        onClick={this.onRedirect}
                                        color="primary"
                                    >
                                        Click Here &raquo;
                                    </Button>
                                </Col>
                            </Row>
                        </Mobile>
                        <hr />
                    </Container>
                </main>
                <footer>
                    <Container>
                        <hr />
                        <p>&copy; CodeShack 2019</p>
                    </Container>
                </footer>
            </div>
        );
    }
}

Dashboard.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Dashboard);
