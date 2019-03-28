import React, { Component } from "react";
import { loadAllCourses } from "../redux/actions/actions"
import { connect } from "react-redux"
import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container
} from "reactstrap";

const mapStateToProps = state => {
    return {
        courses: state.course.courses
    }
}

/**
 * Dashboard page component
 */
class CourseOverview extends Component {
    state = {};

    componentDidMount() {
        // Sets the title of the page
        document.title = "Course Overview";

        this.props.loadAllCourses();
    }

    /**
     * Redirects to the corresponding course page
     *
     * @param event.target.id The name of the page to redirect to
     */
    onRedirect = event => {
        switch (event.target.id) {
            case "CS200":
                console.log("Redirecting to CS200");
                // Redirect to CS200
                break;
            case "CS300":
                console.log("Redirecting to CS300");
                // Redirect to CS300
                break;
            case "CS400":
                console.log("Redirecting to CS400");
                // Redirect to CS400
                break;
            case "CS354":
                console.log("Redirecting to CS354");
                // Redirect to CS354
                break;
            case "CS240":
                console.log("Redirecting to CS240");
                // Redirect to CS240
                break;
            case "CS577":
                console.log("Redirecting to CS577");
                // Redirect to CS577
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
                            <h3 className="display-3">Course</h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
                    <Container>
                        <Row style={{marginTop: "16px"}}>
                            <Col className="span-2, offset-2">
                                <h2>CS200</h2>
                                <p>
                                    Programing I
                                </p>
                                <Button
                                    id="CS200"
                                    onClick={this.onRedirect}
                                    color="primary"
                                >
                                    Click Here &raquo;
                                </Button>
                            </Col>
                            <Col className="span-2, offset-2">
                                <h2>CS300</h2>
                                <p>
                                    Programing II
                                </p>
                                <Button
                                    id="CS300"
                                    onClick={this.onRedirect}
                                    color="primary"
                                >
                                    Click Here &raquo;
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{marginTop: "16px"}}>
                            <Col className="span-2, offset-2">
                                <h2>CS400</h2>
                                <p>
                                    Programing III
                                </p>
                                <Button
                                    id="CS400"
                                    onClick={this.onRedirect}
                                    color="primary"
                                >
                                    Click Here &raquo;
                                </Button>
                            </Col>
                            <Col className="span-2, offset-2">
                                <h2>CS354</h2>
                                <p>
                                    Intro to Computer Systems
                                </p>
                                <Button
                                    id="CS354"
                                    onClick={this.onRedirect}
                                    color="primary"
                                >
                                    Click Here &raquo;
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{marginTop: "16px"}}>
                            <Col className="span-2, offset-2">
                                <h2>CS240</h2>
                                <p>
                                    Discrete Math
                                </p>
                                <Button
                                    id="CS2"
                                    onClick={this.onRedirect}
                                    color="primary"
                                >
                                    Click Here &raquo;
                                </Button>
                            </Col>
                            <Col className="span-2, offset-2">
                                <h2>CS577</h2>
                                <p>
                                    Introduction to Algorithm
                                </p>
                                <Button
                                    id="CS577"
                                    onClick={this.onRedirect}
                                    color="primary"
                                >
                                    Click Here &raquo;
                                </Button>
                            </Col>
                        </Row>
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

export default connect(mapStateToProps, {loadAllCourses})(CourseOverview);