import React from "react";
import { auth } from "./utils/firebase";
import { logoutUser } from "../redux/actions/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Logout extends React.Component {
    componentDidMount() {
        auth.signOut()
            .then(() => {
                this.props.logoutUser();
                this.context.router.history.push("/login");
            })
            .catch(err => {
                console.log("Unable to sign out user");
                this.context.router.history.push("/login");
            });
    }
    render() {
        return <div />;
    }
}

Logout.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    null,
    { logoutUser }
)(Logout);
