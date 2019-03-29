import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, userExist } from "../redux/actions/actions";
import Firebase from "../Backend/Firebase";
import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
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
    color: "black"
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

        this.props.userExist({ email: this.state.email }, err => {
            if (err == null) {
                // Firebase authentication
                const firebase = Firebase.getFirebase();

                firebase.logOut(); // Need to be remove
                firebase.logInWithWiscID(user => {
                    console.log("Callback email: " + user.email);

                    // Save user to state if authenticate with @wisc.edu
                    if (user.email.includes("@wisc.edu")) {
                        // Load user to state
                        this.props.loginUser({ email: user.email });
                    }
                    // Reject and require to log in with wisc edu email again
                    else {
                        // Show an alert
                        this.setState({ loginError: true });
                    }
                });
            } else {
                console.log("here");
                this.setState({ userExist: true });
            }
        });
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

    // Validate login form
    validateForm = () => {
        return (
            this.state.email.length > 0 &&
            this.state.email.includes("@wisc.edu")
        );
    };

    // Dismiss Alert
    onDismiss = () => {
        this.setState({ visible: false });
    };

    render() {
        const { classes } = this.props;

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
                                    <FormGroup row onChange={this.handleChange}>
                                        <Label for="email" sm={2}>
                                            Email
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Enter your wisc email"
                                            />
                                        </Col>
                                    </FormGroup>
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
                                            disabled={!this.validateForm()}
                                        >
                                            Submit
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

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

Login.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(
    mapStateToProps,
    { loginUser, userExist }
)(Login);
