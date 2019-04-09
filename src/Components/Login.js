import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/actions";
import { auth, provider } from "../Backend/Firebase/firebase";

import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container,
    Form,
    Alert
} from "reactstrap";

/* ~~~~~~~~~~~~~~~~~~~~ Styles for Log In page ~~~~~~~~~~~~~~~~~~~~*/
const buttonStyles = {
    marginTop: "10px"
};

const mainStyles = {
    backgroundColor: "#9b0000",
    width: "100%",
    height: "100%",
    borderRadius: "0px"
};

const fontStyles = {
    color: "#f7f7f7"
};

const containerStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: "5px"
};

const formGroupStyle = {
    padding: "20px",
    backgroundColor: "white"
};
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const mapStateToProps = state => {
    return {
        user: state.authUser.user,
        isAuth: state.authUser.isAuth,
        authError: state.authUser.authError
    };
};

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            loginError: false,
            alertVisible: true,
            userExist: false
        };
    }

    componentDidMount() {
        document.title = "CodeShack - Login";
    }

    // Handle sign up button pressed - Bug
    pressSignUp = () => {
        console.log("Pressed Sign up");
        this.context.router.history.push("/signup");
    };

    // Handle submit button pressed
    onSubmit = e => {
        console.log("Pressed Submit");

        auth.signOut(); // Need to be remove

        // Sign in with Google
        auth.signInWithPopup(provider)
            .then(result => {
                // The signed-in user info.
                var user = result.user;

                console.log("Callback email: " + user.email);
                if (user.email.includes("@wisc.edu")) {
                    this.props.loginUser(err => {
                        if (err === 404) {
                            this.setState({ userExist: true });
                            user.delete();
                        } else if (err === 403) {
                            console.log("Invalid token");
                        } else if (err === 401) {
                            console.log("Invalid request");
                        } else if (err === 500) {
                            console.log("error");
                        }
                    });
                    // Load user to state
                }
                // Reject and require to log in with wisc edu email again
                else {
                    // Show an alert
                    this.setState({ loginError: true });
                }
            })
            .catch(error => {
                if (error.code !== "auth/popup-closed-by-user") {
                    this.setState({ loginError: true });
                }
            });
        e.preventDefault();
    };

    // Save state change i.e. save current entered email to state
    handleChange = e => {
        console.log("Handle change");
        this.setState({
            [e.target.id]: e.target.value
        });
        console.log(this.state.email);
    };

    renderRedirect = e => {
        if (this.props.isAuth) {
            this.context.router.history.push("/dashboard");
        }
    };

    // Dismiss Alert
    onDismiss = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <div>
                <main>
                    {this.renderRedirect()}
                    <Jumbotron style={mainStyles}>
                        <Container>
                            <h3 className="display-3" style={fontStyles}>
                                CodeShack - Log In
                            </h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Container style={containerStyle}>
                                <Form style={formGroupStyle}>
                                    {(this.state.loginError ||
                                        this.props.authError) && (
                                        <Alert
                                            color="danger"
                                            isOpen={this.state.visible}
                                            toggle={this.onDismiss}
                                        >
                                            Please use a valid wisc.edu email to
                                            login
                                        </Alert>
                                    )}
                                    {this.state.userExist && (
                                        <Alert
                                            color="danger"
                                            isOpen={this.state.visible}
                                            toggle={this.onDismiss}
                                        >
                                            User is not registered, please sign
                                            up
                                        </Alert>
                                    )}
                                    <Col>
                                        <Button
                                            outline
                                            color="danger"
                                            size="lg"
                                            block
                                            style={buttonStyles}
                                            onClick={this.onSubmit}
                                        >
                                            Sign in with Google
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            outline
                                            color="danger"
                                            size="lg"
                                            block
                                            style={buttonStyles}
                                            onClick={this.pressSignUp}
                                        >
                                            Sign up
                                        </Button>
                                    </Col>
                                </Form>
                            </Container>
                        </Col>
                    </Row>
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

Login.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
