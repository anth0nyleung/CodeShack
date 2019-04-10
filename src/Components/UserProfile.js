import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Jumbotron, Container } from "reactstrap";

const mapStateToProps = state => {
    return {
        username: state.authUser.user.username,
    };
};

const imgStyles = {
    width: 50,
    height: 50
}

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url : null
        };
    }

    componentDidMount() {
        document.title = "CodeShack - User Profile";
        this.setState({url: localStorage.getItem("url")});
    }

    render() {
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3>{this.props.username}</h3>
                            <img src={this.state.url} style={imgStyles}/>
                            <hr/>
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
