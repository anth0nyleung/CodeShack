import React, { Component } from "react";
import { auth } from "../Backend/Firebase/firebase";
import PropTypes from "prop-types";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { logoutUser } from "../redux/actions/actions";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";

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
                                    <DropdownItem href="/courses">
                                        Courses
                                    </DropdownItem>
                                    <DropdownItem href="/topic">
                                        Topics
                                    </DropdownItem>
                                    <DropdownItem href="company">
                                        Companies
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href="/interview">
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
                                                <DropdownItem href="/profile">
                                                    Profile
                                                </DropdownItem>
                                                <DropdownItem href="/createquestion">
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
