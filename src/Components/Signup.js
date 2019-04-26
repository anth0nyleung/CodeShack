import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    signupUser,
    loadAllCourses,
    removeAuthError
} from "../redux/actions/actions";
import { auth, provider } from "./utils/firebase";
import Select from "react-select";
import Footer from "./Footer";
import { Redirect } from "react-router";

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
            username: "",
            year: "",
            currentCourse: [],
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

        try {
            // Load user to state
            this.props.signupUser({
                firebase_id: this.props.location.state.firebase_id,
                email: this.props.location.state.email,
                username: this.state.username,
                name: this.props.location.state.name,
                year: this.state.year,
                courses: this.state.currentCourse
            });
        } catch (error) {
            console.log("error signing upt");
            this.setState({ usernameAlertVisible: true });
        }
    };

    renderRedirect = e => {
        if (this.props.isAuth) {
            this.context.router.history.push("/dashboard");
        }
    };

    validateForm = () => {
        var exp = /^[a-zA-Z0-9-_]+$/;
        console.log(this.state.username.search(exp));
        var usernameValid =
            this.state.username.length > 0 &&
            this.state.username.search(exp) !== -1;

        var yearValid =
            this.state.year !== "Please Select..." && this.state.year !== "";

        return usernameValid && yearValid;
    };

    onDismiss = e => {
        this.props.removeAuthError();
    };

    // Handle input change
    handleChange = e => {
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
        if (!this.props.location.state) {
            return <Redirect to="/login" />;
        }
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
                                        disabled
                                        value={this.props.location.state.email}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row onChange={this.handleChange}>
                                <Label for="name" sm={2}>
                                    Name
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="name"
                                        name="name"
                                        id="name"
                                        disabled
                                        value={this.props.location.state.name}
                                    />
                                </Col>
                            </FormGroup>
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
                            <Alert
                                color="danger"
                                id="usernameAlert"
                                isOpen={
                                    !this.state.username.match(
                                        /^[a-zA-Z0-9-_]+$/
                                    ) && this.state.username.length !== 0
                                }
                            >
                                Invalid Character detected
                            </Alert>
                            <Alert
                                color="danger"
                                id="usernameAlert"
                                isOpen={this.props.authError}
                                toggle={this.onDismiss}
                            >
                                Duplicate username or email has been registered
                            </Alert>

                            <FormGroup onChange={this.handleChange}>
                                <Label for="year">Year</Label>
                                <Input
                                    type="select"
                                    name="year"
                                    id="year"
                                    defaultValue="Please Select..."
                                >
                                    <option>Please Select...</option>
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
    { signupUser, loadAllCourses, removeAuthError }
)(Signup);
