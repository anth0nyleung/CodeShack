import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Button, Jumbotron, Container } from "reactstrap";
import { Default, Mobile } from "./utils/Responsive";

const mainStyles = {
    backgroundColor: "#9b0000",
    width: "100%",
    height: "100%",
    borderRadius: "0px"
};
const firstJumbotronStyles = {
    backgroundColor: "#9b0000",
    width: "100%",
    height: "100%",
    borderRadius: "0px"
};

const secondJumbotronStyles = {
    backgroundColor: "#d85050",
    width: "100%",
    height: "100%",
    borderRadius: "0px"
};

const thirdJumbotronStyles = {
    backgroundColor: "#ff4f4f",
    width: "100%",
    height: "100%",
    borderRadius: "0px"
};

const fontStyles = {
    color: "#f7f7f7"
};

const buttonStyles = {
    margin: "10px",
    width: 120,
    backgroundColor: "#9b0000",
    borderColor: "#9b0000"
};

const mapStateToProps = state => {
    return {
        user: state.authUser.user,
        isAuth: state.authUser.isAuth,
        authError: state.authUser.authError
    };
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        document.title = "CodeShack";
    }

    onClickLogin = () => {
        this.context.router.history.push("/login");
    };

    onClickSignup = () => {
        this.context.router.history.push("/signup");
    };

    render() {
        return (
            <div>
                <main style={mainStyles}>
                    <Jumbotron style={firstJumbotronStyles}>
                        <Container>
                            <Default>
                                <Row>
                                    <Col>
                                        <h3
                                            className="display-3"
                                            style={fontStyles}
                                        >
                                            CodeShack
                                        </h3>
                                    </Col>
                                    <Col xs="auto">
                                        <Jumbotron
                                            style={{
                                                backgroundColor: "#d85050"
                                            }}
                                        >
                                            <Row>
                                                {" "}
                                                <h4
                                                    style={{
                                                        width: 140,
                                                        textAlign: "center",
                                                        color: "black"
                                                    }}
                                                >
                                                    Join us!
                                                </h4>
                                            </Row>
                                            <Row>
                                                <Button
                                                    style={buttonStyles}
                                                    onClick={this.onClickLogin}
                                                >
                                                    Login
                                                </Button>
                                            </Row>
                                            <Row>
                                                <Button
                                                    style={buttonStyles}
                                                    onClick={this.onClickSignup}
                                                >
                                                    Sign up
                                                </Button>
                                            </Row>
                                        </Jumbotron>
                                    </Col>
                                </Row>
                            </Default>
                            <Mobile>
                                <Row className="justify-content-center">
                                    <Col xs="auto">
                                        <h3
                                            className="display-3"
                                            style={fontStyles}
                                        >
                                            CodeShack
                                        </h3>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs="12">
                                        <Jumbotron
                                            style={{
                                                backgroundColor: "#d85050"
                                            }}
                                        >
                                            <Row className="justify-content-center">
                                                <h4
                                                    style={{
                                                        textAlign: "center",
                                                        color: "black"
                                                    }}
                                                >
                                                    Join us!
                                                </h4>
                                            </Row>
                                            <Row className="justify-content-center">
                                                <Col xs="12">
                                                    <Button
                                                        style={{
                                                            marginTop: "10px",
                                                            marginBottom:
                                                                "10px",
                                                            width: "100%",
                                                            backgroundColor:
                                                                "#9b0000",
                                                            borderColor:
                                                                "#9b0000"
                                                        }}
                                                        onClick={
                                                            this.onClickLogin
                                                        }
                                                    >
                                                        Login
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row className="justify-content-center">
                                                <Col>
                                                    <Button
                                                        style={{
                                                            marginTop: "10px",
                                                            width: "100%",
                                                            backgroundColor:
                                                                "#9b0000",
                                                            borderColor:
                                                                "#9b0000"
                                                        }}
                                                        onClick={
                                                            this.onClickSignup
                                                        }
                                                    >
                                                        Sign up
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Jumbotron>
                                    </Col>
                                </Row>
                            </Mobile>
                        </Container>
                    </Jumbotron>

                    <Jumbotron style={secondJumbotronStyles}>
                        <Container>
                            <h4 style={fontStyles}>What is CodeShack?</h4>
                            <p style={fontStyles}>
                                CodeShack is a website designed to help you
                                prepare for technical interviews. While there
                                are many, more established sites out there that
                                do this same thing, CodeShack is intended
                                specifically for UW-Madison students to help
                                narrow down their preparation. We sort all
                                questions into categories such as courses,
                                topics, and companies which allows even the most
                                beginner CS student to practice with the
                                knowledge they have. We also provide a way for
                                users to add questions themselves, which means
                                our content is constantly evolving and updating.
                            </p>
                        </Container>
                    </Jumbotron>
                    <Jumbotron style={thirdJumbotronStyles}>
                        <Container>
                            <h4 style={fontStyles}>About us</h4>
                            <p style={fontStyles}>
                                {" "}
                                We are 6 students from UW-Madison who made this
                                website for CS 506 Software Engineering. We put
                                a lot of time and effort into this project, so
                                we hope that you enjoy it and find it useful!
                            </p>
                        </Container>
                    </Jumbotron>
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

Main.propTypes = {
    classes: PropTypes.object.isRequired
};

Main.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(Main);
