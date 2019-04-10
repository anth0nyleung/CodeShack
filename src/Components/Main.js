import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    
} from "reactstrap";

const mainStyles = {
    backgroundColor: "#9b0000",
    width: "100%",
    height: "100%",
    borderRadius: "0px"
};
const firstJumbotronStyles = {
    backgroundColor: "#9b0000",
    width: "100%",
    height: "100%",
    borderRadius: "0px"
};

const secondJumbotronStyles = {
    backgroundColor: "#d85050",
    width: "100%",
    height: "100%",
    borderRadius: "0px"
};

const thirdJumbotronStyles = {
    backgroundColor: "#ff4f4f",
    width: "100%",
    height: "100%",
    borderRadius: "0px"
};

const fontStyles = {
    color: "#f7f7f7"
};

const mapStateToProps = state => {
    return {
        user: state.authUser.user,
        isAuth: state.authUser.isAuth,
        authError: state.authUser.authError
    };
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return(
            <div>
                <main style={mainStyles}>
                    
                    <Jumbotron style={firstJumbotronStyles}>
                        <Container>
                            <Row>
                                <Col><h3 className="display-3" style={fontStyles}>
                                    CodeShack
                                </h3></Col>
                                <Col xs="auto"><Jumbotron></Jumbotron></Col>
                            </Row>
                        </Container>  
                    </Jumbotron>
                    
                    <Jumbotron style={secondJumbotronStyles}>
                        <Container>
                            <h4 style={fontStyles}>
                                What is CodeShack?
                            </h4>
                            <p> xxxxx </p>
                        </Container>
                    </Jumbotron>
                    <Jumbotron style={thirdJumbotronStyles}>
                        <Container>
                            <h4 style={fontStyles}>
                                About us 
                            </h4>
                            <p> xxxxx </p>
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

Main.propTypes = {
    classes: PropTypes.object.isRequired
};

Main.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(Main);
