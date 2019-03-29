import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar color="primary">
                    <NavbarBrand style={{ color: "white" }} href="/dashboard">
                        CodeShack
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink
                                style={{ color: "white" }}
                                href="/profile"
                                onClick={this.handleClick}
                            >
                                Profile
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;
