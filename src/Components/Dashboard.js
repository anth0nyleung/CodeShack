import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container,
    ListGroup,
    ListGroupItem
} from "reactstrap";

/**
 * Maps the state of the redux store to the properties of the component
 *
 * @param state The state of the application
 */
const mapStateToProps = state => {
    return {
        questions: null // TODO: Set questions here
    };
};

/**
 * Dashboard page component
 */
export class Dashboard extends Component {
    state = {};

    componentDidMount() {
        // Sets the title of the page
        document.title = "Dashboard";

        // this.props.loadAllQuestions();
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
            case "interview":
                console.log("Redirecting to interview");
                this.context.router.history.push("/interview");
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
                        <Row>
                            <Col className="md-4">
                                <h2>Interview</h2>
                                <p>
                                    View and answer technical questions to help
                                    prepare you for Interviews
                                </p>
                                <Button
                                    id="interview"
                                    onClick={this.onRedirect}
                                    color="primary"
                                >
                                    Click Here &raquo;
                                </Button>
                            </Col>
                            <Col className="md-4">
                                <h2>Topic</h2>
                                <p>
                                    View and answer technical questions sorted
                                    by Topic
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
                                    View and answer technical questions sorted
                                    by Course
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
                        <hr />

                        {/* This is a test list. We would map real questions to list when implementing 
                        <h2 style={{ marginBottom: "16px" }}>Top Questions</h2>
                        <ListGroup
                            style={{
                                overflow: "auto",
                                height: "auto"
                            }}
                        >
                            <ListGroupItem
                                tag="button"
                                href="#"
                                action
                                onClick={this.onQuestionClick}
                            >
                                Question 1
                            </ListGroupItem>
                            <ListGroupItem tag="button" href="#" action>
                                Question 2
                            </ListGroupItem>
                            <ListGroupItem tag="button" href="#" action>
                                Question 3
                            </ListGroupItem>
                            <ListGroupItem tag="button" href="#" action>
                                Question 4
                            </ListGroupItem>
                            <ListGroupItem tag="button" href="#" action>
                                Question 5
                            </ListGroupItem>
                            <ListGroupItem tag="button" href="#" action>
                                Question 6
                            </ListGroupItem>
                            <ListGroupItem tag="button" href="#" action>
                                Question 7
                            </ListGroupItem>
                            <ListGroupItem tag="button" href="#" action>
                                Question 8
                            </ListGroupItem>
                            <ListGroupItem tag="button" href="#" action>
                                Question 9
                            </ListGroupItem>
                        </ListGroup>
                        */}
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
