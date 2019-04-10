import React, { Component } from "react";
import { auth } from "../Backend/Firebase/firebase";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { logoutUser } from "../redux/actions/actions";
import { connect } from "react-redux";
import { BarLoader } from "react-spinners";
import logo from "../img/icon.png"

const mapStateToProps = state => {
    return {
        isAuth: state.authUser.isAuth,
        username: state.authUser.user.username
    };
};

const imgStyles = { 
    height:  30,
    width: 30,
};

class NavBar extends Component {
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
        return (
            <div>
                <Navbar color="primary">
                    <NavbarBrand style={{ color: "white" }} href="/dashboard">
                        CodeShack
                    </NavbarBrand>
                    <img src={logo} style={imgStyles}/>
                    {this.context.router.history.location.pathname !==
                        "/login" && (
                        <Nav>
                            <NavItem>
                                <NavLink
                                    style={{ color: "white" }}
                                    href="/courses"
                                >
                                    Course
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ color: "white" }}
                                    href="/interview"
                                >
                                    Interview
                                </NavLink>
                            </NavItem>
                        </Nav>
                    )}
                    <Nav className="ml-auto">
                        {this.context.router.history.location.pathname !==
                            "/login" && (
                            <NavItem>
                                <NavLink
                                    style={{ color: "white" }}
                                    href="/createquestion"
                                >
                                    Add Question
                                </NavLink>
                            </NavItem>
                        )}
                        {this.context.router.history.location.pathname !==
                            "/login" && (
                            <NavItem>
                                <NavLink
                                    style={{ color: "white" }}
                                    href="/profile"
                                >
                                    Profile ({this.props.username})
                                </NavLink>
                            </NavItem>
                        )}
                        {this.context.router.history.location.pathname !==
                            "/login" && (
                            <NavItem>
                                <NavLink
                                    style={{ color: "white" }}
                                    href="/login"
                                    onClick={this.handleLogOut}
                                >
                                    Log Out
                                </NavLink>
                            </NavItem>
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
