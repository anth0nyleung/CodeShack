import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container,
    Card,
    Collapse,
    CardBody
} from "reactstrap";

/**
 * Maps the state of the redux store to the properties of the component
 *
 * @param state The state of the application
 */
const mapStateToProps = state => {
    return {
        questions: null // TODO: Set questions here
    };
};

/**
 * Dashboard page component
 */
export class Question extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true };
    }

    componentDidMount() {
        // Sets the title of the page
        document.title = "Question";

        // this.props.loadAllQuestions();
    }
    toggle = () => {
        var curr = this.state.collapse
        this.setState({collapse : !curr});
    }

    /**
     * Redirects to the corresponding question page
     *
     * @param event.target.id The id of the questions to view
     */
    onQuestionClick = event => {
        // Redirect to specific question
    };

    /**
     * Redirects to the corresponding overview page
     *
     * @param event.target.id The name of the page to redirect to
     */
    render() {
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3 className="display-3">Question</h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
                    <Container>
                        <Row>
                            <Col className="md-4">
                                <p>
                                    Question
                                </p>
                            </Col>
                            <Col className="md-8">
                                <p>
                                    Name of question
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="md-4">
                                <p>
                                    Description
                                </p>
                            </Col>
                            <Col className="md-8">
                                <p>
                                    Description of question
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="md-8">
                                <Collapse isOpen = {this.state.collapse}>
                                    <Card>
                                        <CardBody>
                                            Solution of question (yay)!!!
                                        </CardBody>
                                    </Card>
                                </Collapse>    
                            </Col>
                            <Col className="md-4">
                                <Button
                                    color = "primary"
                                    onClick = {this.toggle}> 
                                    Show Solution
                               </Button> 
                            </Col>
                        </Row>
                        <hr />
                    </Container>
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

Question.propTypes = {
    classes: PropTypes.object.isRequired
}

Question.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Question);