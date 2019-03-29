import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default function(Component) {
    const mapStateToProps = state => {
        return {
            isAuth: state.authUser.isAuth
        };
    };

    class Authenticate extends Component {
        componentDidMount() {
            if (!this.props.isAuth) {
                // TODO: Implement attemp to read from local storage
                this.context.router.history.push("/");
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    };

    return connect(mapStateToProps)(Authenticate);
}
