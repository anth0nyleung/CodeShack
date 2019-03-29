import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { loadQuestion } from "../redux/actions/actions";
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
        question: state.question.currentQuestion
    };
};

export class Question extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    componentDidMount() {
        // Sets the title of the page
        document.title = "Question";

        this.props.loadQuestion(this.props.match.params.id);
    }
    toggle = () => {
        var curr = this.state.collapse;
        this.setState({ collapse: !curr });
    };

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
                            <Col xs="2" className="text-danger">
                                <strong>Question name</strong>
                            </Col>
                            <Col xs="10">{this.props.question.name}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="2" className="text-danger">
                                <strong>Description</strong>
                            </Col>
                            <Col xs="10">{this.props.question.content}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="2">
                                <Button color="primary" onClick={this.toggle}>
                                    Show Solution
                                </Button>
                            </Col>
                            <Col xs="10">
                                <Collapse isOpen={this.state.collapse}>
                                    <Card>
                                        <CardBody>
                                            {this.props.question.solution}
                                        </CardBody>
                                    </Card>
                                </Collapse>
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
};

Question.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loadQuestion }
)(Question);
