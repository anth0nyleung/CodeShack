import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/actions";

export default function(ChildComponent) {
    const mapStateToProps = state => {
        return {
            isAuth: state.authUser.isAuth
        };
    };

    class Authenticate extends Component {
        componentDidMount() {
            if (!this.props.isAuth) {
                // TODO: Implement attemp to read from local storage
                const user = localStorage.getItem("Auth");
                this.props.loginUser({ email: user }, err => {
                    if (err) {
                        this.context.router.history.push("/login");
                    }
                });
            }
        }

        render() {
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
