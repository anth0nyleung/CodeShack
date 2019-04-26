import React, { Component } from "react";
import {
    Jumbotron,
    Container,
    UncontrolledCollapse,
    Button,
    Row,
    Col
} from "reactstrap";
import Footer from "./Footer";

class HelpPage extends Component {
    state = {};
    render() {
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3 className="display-3">FAQ</h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <Button color="link" id="first">
                                    <h3>What is CodeShack? &#9662;</h3>
                                </Button>
                                <UncontrolledCollapse toggler="#first">
                                    <p
                                        style={{
                                            marginLeft: "14px",
                                            marginRight: "14px"
                                        }}
                                    >
                                        CodeShack is a website designed to help
                                        you prepare for technical interviews.
                                        While there are many, more established
                                        sites out there that do this same thing,
                                        CodeShack is intended specifically for
                                        UW-Madison students to help narrow down
                                        their preparation. We sort all questions
                                        into categories such as courses, topics,
                                        and companies which allows even the most
                                        beginner CS student to practice with the
                                        knowledge they have. We also provide a
                                        way for users to add questions
                                        themselves, which means our content is
                                        constantly evolving and updating.
                                    </p>
                                </UncontrolledCollapse>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color="link" id="second">
                                    <h3>
                                        Why do I need a wisc.edu email? &#9662;
                                    </h3>
                                </Button>
                                <UncontrolledCollapse toggler="#second">
                                    <p
                                        style={{
                                            marginLeft: "14px",
                                            marginRight: "14px"
                                        }}
                                    >
                                        We built CodeShack around the needs of
                                        students at UW-Madison, so it is mainly
                                        suited for them. This means a lot of the
                                        content available is specific to courses
                                        offered at UW-Madison. Because of this,
                                        we felt that limiting the user base
                                        would help keep CodeShack aligned with
                                        it's purpose.
                                    </p>
                                </UncontrolledCollapse>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color="link" id="third">
                                    <h3>How can I contribute? &#9662;</h3>
                                </Button>
                                <UncontrolledCollapse toggler="#third">
                                    <p
                                        style={{
                                            marginLeft: "14px",
                                            marginRight: "14px"
                                        }}
                                    >
                                        To contribute,{" "}
                                        <a href="/signup">create an account</a>,
                                        then navigate to the{" "}
                                        <a href="/createquestion">
                                            create a question
                                        </a>{" "}
                                        page. You can submit any question you
                                        can think of, but try and keep it
                                        related to technical interviews. Some
                                        examples of appropriate questions would
                                        be a question you were asked on a recent
                                        interview, or a question that you came
                                        up with based on some of your
                                        coursework.
                                        <br />
                                        <br />
                                        If you have a solution for the question,
                                        great! You can submit the solution along
                                        with the question. If you don't have a
                                        solution and are asking, feel free to
                                        put "No solution". That way, yourself
                                        and other users can discuss possible
                                        solutions in the comments of the
                                        question.
                                    </p>
                                </UncontrolledCollapse>
                            </Col>
                        </Row>
                    </Container>
                </main>
                <Footer />
            </div>
        );
    }
}

export default HelpPage;
