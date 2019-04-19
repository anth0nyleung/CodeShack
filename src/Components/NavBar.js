import React, { Component } from "react";
import { auth } from "./utils/firebase";
import PropTypes from "prop-types";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { logoutUser } from "../redux/actions/actions";
import { connect } from "react-redux";
import { Default, Mobile } from "./utils/Responsive";

const mapStateToProps = state => {
    return {
        isAuth: state.authUser.isAuth,
        username: state.authUser.user.username
    };
};

const imgStyles = {
    height: 30,
    width: 30,
    "pointer-events": "all"
};

const circleImgStyles = {
    height: 30,
    width: 30,
    borderRadius: 30
};

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: null,
            collapsed: false
        };
    }

    componentDidMount() {
        this.setState({
            url: localStorage.getItem("url")
        });
    }

    handleLogOut = event => {
        console.log("here");
        return <Redirect to="/logout" />;
    };

    handleClick = event => {
        switch (event.target.id) {
            case "courses":
                this.context.router.history.push("/courses");
                break;
            case "topics":
                this.context.router.history.push("/topic");
                break;
            case "companies":
                this.context.router.history.push("/company");
                break;
            case "all":
                this.context.router.history.push("/questions");
                break;
            case "profile":
                this.context.router.history.push("/profile");
                break;
            case "createquestion":
                this.context.router.history.push("/createquestion");
                break;
            case "logo":
                this.context.router.history.push("/dashboard");
                break;
            default:
                break;
        }
    };

    render() {
        if (
            this.context.router.history.location.pathname === "/login" ||
            this.context.router.history.location.pathname === "/signup" ||
            this.context.router.history.location.pathname === "/logout"
        ) {
            return <div />;
        }

        return (
            <div>
                <Navbar color="primary" className="navbar-light">
                    <Link to="/dashboard">
                        <img
                            id="logo"
                            className="d-flex align-items-center"
                            alt="logo"
                            src={process.env.PUBLIC_URL + "/icon.png"}
                            style={imgStyles}
                        />
                    </Link>

                    <NavbarBrand
                        className="d-flex align-items-center"
                        style={{ color: "white", marginLeft: "8px" }}
                        href="/dashboard"
                    >
                        CodeShack
                    </NavbarBrand>
                    <Default>
                        {this.context.router.history.location.pathname !==
                            "/login" &&
                            this.context.router.history.location.pathname !==
                                "/" && (
                                <UncontrolledDropdown className="d-flex align-items-center">
                                    <DropdownToggle
                                        nav
                                        caret
                                        style={{ color: "white" }}
                                    >
                                        Categories
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem
                                            onClick={this.handleClick}
                                            id="courses"
                                        >
                                            Courses
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={this.handleClick}
                                            id="topics"
                                        >
                                            Topics
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={this.handleClick}
                                            id="companies"
                                        >
                                            Companies
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem
                                            onClick={this.handleClick}
                                            id="all"
                                        >
                                            All Questions
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            )}

                        <Nav className="ml-auto">
                            {this.context.router.history.location.pathname !==
                                "/login" &&
                                this.context.router.history.location
                                    .pathname !== "/" && (
                                    <Nav>
                                        <NavItem className="d-flex align-items-center">
                                            <img
                                                alt="profile-pic"
                                                src={this.state.url}
                                                style={circleImgStyles}
                                            />
                                        </NavItem>
                                        <NavItem className="d-flex align-items-center">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    nav
                                                    caret
                                                    style={{ color: "white" }}
                                                >
                                                    {this.props.username}
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem
                                                        id="profile"
                                                        onClick={
                                                            this.handleClick
                                                        }
                                                    >
                                                        Profile
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        id="createquestion"
                                                        onClick={
                                                            this.handleClick
                                                        }
                                                    >
                                                        Add Question
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem href="/logout">
                                                        Log Out
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </NavItem>
                                    </Nav>
                                )}
                        </Nav>
                    </Default>
                    <Mobile>
                        <NavbarToggler
                            onClick={() =>
                                this.setState({
                                    collapsed: !this.state.collapsed
                                })
                            }
                            className="navbar-toggler-right"
                        />
                        <Collapse isOpen={this.state.collapsed} navbar>
                            <Nav navbar>
                                <NavLink
                                    href="/courses"
                                    style={{
                                        textDecoration: "none",
                                        color: "white"
                                    }}
                                >
                                    Courses
                                </NavLink>

                                <NavLink
                                    href="/topic"
                                    style={{
                                        textDecoration: "none",
                                        color: "white"
                                    }}
                                >
                                    Topics
                                </NavLink>
                                <NavLink
                                    href="/company"
                                    style={{
                                        textDecoration: "none",
                                        color: "white"
                                    }}
                                >
                                    Companies
                                </NavLink>
                                <NavLink
                                    href="/questions"
                                    style={{
                                        textDecoration: "none",
                                        color: "white"
                                    }}
                                >
                                    All Questions
                                </NavLink>
                                <DropdownItem divider />
                                <NavLink
                                    href="/profile"
                                    style={{
                                        textDecoration: "none",
                                        color: "white"
                                    }}
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    href="/createquestion"
                                    style={{
                                        textDecoration: "none",
                                        color: "white"
                                    }}
                                >
                                    Add Question
                                </NavLink>
                                <DropdownItem divider />
                                <NavLink
                                    href="/logout"
                                    style={{
                                        textDecoration: "none",
                                        color: "white"
                                    }}
                                >
                                    Logout
                                </NavLink>
                            </Nav>
                        </Collapse>
                    </Mobile>
                </Navbar>
            </div>
        );
    }
}

NavBar.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { logoutUser }
)(NavBar);
