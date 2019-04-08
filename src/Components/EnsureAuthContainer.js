import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/actions";

/**
 * Wrapper class for components requiring authentication
 * Attempts to log in the user from Firebase's local storage and redirects
 * if attempt failed
 * @param {Component} ChildComponent
 */
export default function(ChildComponent) {
    const mapStateToProps = state => {
        return {
            isAuth: state.authUser.isAuth
        };
    };

    class Authenticate extends Component {
        componentDidMount() {
            // If the user is not authenticated, attempt to log in
        }

        render() {
            if (!this.props.isAuth) {
                this.props.loginUser(err => {
                    if (err) {
                        this.context.router.history.push("/login");
                    }
                });
            }
            return <ChildComponent {...this.props} />;
        }
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    };

    return connect(
        mapStateToProps,
        { loginUser }
    )(Authenticate);
}
