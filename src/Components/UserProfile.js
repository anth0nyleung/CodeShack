import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Jumbotron, Container, ListGroup, ListGroupItem } from "reactstrap";

const mapStateToProps = state => {
    return {
        user: state.authUser.user
    };
};

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        document.title = "CodeShack - User Profile";
    }

    render() {
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3 className="display-3">
                                UserProfile
                            </h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
                </main>
                <footer>
                    <Container>
                        <hr />
                        <p>&copy; CodeShack 2019</p>
                    </Container>
                </footer>
            </div>
        );
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

UserProfile.contextTypes = {
    router: PropTypes.object.isRequired
};


export default connect(mapStateToProps)(UserProfile);
