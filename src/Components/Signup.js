import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signupUser, loadAllCourses } from "../redux/actions/actions";
import { auth, provider } from "./utils/firebase";
import Select from "react-select";
import Footer from "./Footer";

import {
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

/* ~~~~~~~~~~~~~~~~~~~~ Styles for Sign Up page ~~~~~~~~~~~~~~~~~~~~*/
const mainStyles = {
    backgroundColor: "#9b0000",
    width: "100%",
    height: "100%",
    borderRadius: "0px"
};

const fontStyles = {
    color: "white"
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
        authError: state.authUser.authError,
        courses: state.course.courses
    };
};

export class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            name: "",
            year: "",
            currentCourse: [],
            invalidEmailError: false,
            invalidUsernameError: false,
            emailAlertVisible: true,
            usernameAlertVisible: true
        };
    }

    componentDidMount() {
        // Sets the title of the page
        document.title = " CodeShack - Signup";
        this.props.loadAllCourses();
    }

    //Handle sign up button pressed
    onSubmit = e => {
        console.log("Handle Submit");

        auth.signOut(); // Need to be remove
        auth.signInWithPopup(provider)
            .then(result => {
                // The signed-in user info.
                var user = result.user;
                console.log("Callback email: " + user.email);

                if (user.email.includes("@wisc.edu")) {
                    // Load user to state
                    this.props.signupUser({
                        firebase_id: user.uid,
                        email: user.email,
                        username: this.state.username,
                        name: this.state.name,
                        year: this.state.year,
                        courses: this.state.currentCourse
                    });
                }
                // Reject and require to log in with wisc edu email again
                else {
                    // Show an alert
                    this.setState({ invalidEmailError: true });
                }
            })
            .catch(error => {
                this.setState({ loginError: true });
            });
        e.preventDefault();
    };

    renderRedirect = e => {
        if (this.props.isAuth) {
            this.context.router.history.push("/dashboard");
        }
    };

    validateForm = () => {
        var emailValid =
            this.state.email.length > 0 &&
            this.state.email.includes("@wisc.edu");
        var usernameValid = this.state.username.length > 0;
        var nameValid = this.state.name.length > 0;
        var yearValid = this.state.year !== "";

        return emailValid && usernameValid && nameValid && yearValid;
    };

    onDismiss = e => {
        if (e.target.id === "usernameAlert") {
            this.setState({ invalidUsernameError: false });
        }

        if (e.target.id === "emailAlert") {
            this.setState({ invalidEmailError: false });
        }

        if (e.target.id === "yearAlert") {
            this.setState({ invalidYearError: false });
        }
    };

    // Handle input change
    handleChange = e => {
        console.log("Handle change");
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleTagChange = event => {
        var courses = [];
        event.forEach(element => {
            courses.push(element.value);
        });
        this.setState({ currentCourse: courses });
        console.log(this.state.currentCourse);
    };

    loadOptions = () => {
        var options = [];
        this.props.courses.forEach(course => {
            options.push({
                value: course._id,
                label: course.courseNumber + ": " + course.courseName
            });
        });
        return options;
    };

    render() {
        return (
            <div>
                <main>
                    {this.renderRedirect()}
                    <Jumbotron style={mainStyles}>
                        <Container>
                            <h3 className="display-3" style={fontStyles}>
                                CodeShack - Sign Up
                            </h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
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
                            {this.state.invalidEmailError && (
                                <Alert
                                    color="danger"
                                    id="emailAlert"
                                    isOpen={this.state.visible}
                                    toggle={this.onDismiss}
                                >
                                    Please use a valid wisc.edu email to login
                                </Alert>
                            )}
                            <FormGroup row onChange={this.handleChange}>
                                <Label for="username" sm={2}>
                                    Username
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="username"
                                        name="username"
                                        id="username"
                                        placeholder="Enter a username"
                                    />
                                </Col>
                            </FormGroup>
                            {this.props.authError && (
                                <Alert
                                    color="danger"
                                    id="usernameAlert"
                                    isOpen={this.state.visible}
                                    toggle={this.onDismiss}
                                >
                                    Duplicate username or email has been
                                    registered
                                </Alert>
                            )}
                            <FormGroup row onChange={this.handleChange}>
                                <Label for="name" sm={2}>
                                    Name
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="name"
                                        name="name"
                                        id="name"
                                        placeholder="Enter your name"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup onChange={this.handleChange}>
                                <Label for="year">Year</Label>
                                <Input type="select" name="year" id="year">
                                    <option>Freshman</option>
                                    <option>Sophomore</option>
                                    <option>Junior</option>
                                    <option>Senior</option>
                                    <option>Graduate</option>
                                </Input>
                            </FormGroup>
                            <FormGroup onChange={this.handleChange}>
                                <Label for="currentCourse">
                                    Current Courses
                                </Label>
                                <Select
                                    isMulti
                                    isSearchable
                                    name="courses"
                                    options={this.loadOptions()}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={this.handleTagChange}
                                />
                            </FormGroup>
                            <Button
                                outline
                                color="danger"
                                size="lg"
                                block
                                disabled={!this.validateForm()}
                                onClick={this.onSubmit}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Container>
                </main>
                <Footer />
            </div>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
};

Signup.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { signupUser, loadAllCourses }
)(Signup);
