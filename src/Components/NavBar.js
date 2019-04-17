import React, { Component } from "react";
import { auth } from "./utils/firebase";
import PropTypes from "prop-types";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { logoutUser } from "../redux/actions/actions";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        isAuth: state.authUser.isAuth,
        username: state.authUser.user.username
    };
};

const imgStyles = {
    height: 30,
    width: 30
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
            url: null
        };
    }

    componentDidMount() {
        this.setState({
            url: localStorage.getItem("url")
        });
    }

    handleLogOut = event => {
        auth.signOut()
            .then(() => {
                this.props.logoutUser();
                this.context.router.history.push("/login");
            })
            .catch(err => {
                console.log("Unable to sign out user");
            });
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
            default:
                break;
        }
    };

    render() {
        if (
            this.context.router.history.location.pathname === "/login" ||
            this.context.router.history.location.pathname === "/signup"
        ) {
            return <div />;
        }

        return (
            <div>
                <Navbar color="primary">
                    <img
                        className="d-flex align-items-center"
                        alt="logo"
                        src={process.env.PUBLIC_URL + "/icon.png"}
                        style={imgStyles}
                    />
                    <NavbarBrand
                        className="d-flex align-items-center"
                        style={{ color: "white", marginLeft: "8px" }}
                        href="/dashboard"
                    >
                        CodeShack
                    </NavbarBrand>

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
                            this.context.router.history.location.pathname !==
                                "/" && (
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
                                                    onClick={this.handleClick}
                                                >
                                                    Profile
                                                </DropdownItem>
                                                <DropdownItem
                                                    id="createquestion"
                                                    onClick={this.handleClick}
                                                >
                                                    Add Question
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem
                                                    href="/login"
                                                    onClick={this.handleLogOut}
                                                >
                                                    Log Out
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </NavItem>
                                </Nav>
                            )}
                    </Nav>
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
