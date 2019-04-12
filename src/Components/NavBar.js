import React, { Component } from "react";
import { auth } from "../Backend/Firebase/firebase";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink,
         UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { logoutUser } from "../redux/actions/actions";
import { connect } from "react-redux";
import { BarLoader } from "react-spinners";

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
        if (this.context.router.history.location.pathname === "/login") {
            return <div />;
        }
        return (
            <div>
                <Navbar color="primary">
                    <NavbarBrand style={{ color: "white" }} href="/dashboard">
                        CodeShack
                    </NavbarBrand>
                    <img
                        src={process.env.PUBLIC_URL + "/icon.png"}
                        style={imgStyles}
                    />
                    {this.context.router.history.location.pathname !==
                        "/login" &&
                        this.context.router.history.location.pathname !==
                            "/" && (
                    <UncontrolledDropdown >
                        <DropdownToggle nav caret style={{color : 'white'}}>
                            Category
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href="/courses">
                                Course
                            </DropdownItem>
                            <DropdownItem href="/topic">
                                Topic
                            </DropdownItem>
                            <DropdownItem href="company">
                                Company
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem href="/interview">
                                All Question
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>)}

                    <Nav className="ml-auto">
                        {this.context.router.history.location.pathname !==
                            "/login" &&
                            this.context.router.history.location.pathname !==
                                "/" && (
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
                            "/login" &&
                            this.context.router.history.location.pathname !==
                                "/" && (
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
                            "/login" &&
                            this.context.router.history.location.pathname !==
                                "/" && (
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
