import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { loadQuestion } from "../redux/actions/actions";
import BarLoader from "react-spinners/BarLoader";
import { convertFromRaw, Editor, EditorState } from "draft-js";
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
        question: state.question.currentQuestion,
        isLoading: state.loading.isLoading
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

    getContent = () => {
        if (this.props.question.content) {
            var content = convertFromRaw(
                JSON.parse(this.props.question.content)
            );
            return EditorState.createWithContent(content);
        } else {
            return EditorState.createEmpty();
        }
    };

    getSolution = () => {
        if (this.props.question.solution) {
            var content = convertFromRaw(
                JSON.parse(this.props.question.solution)
            );
            return EditorState.createWithContent(content);
        } else {
            return EditorState.createEmpty();
        }
    };

    /**
     * Redirects to the corresponding overview page
     *
     * @param event.target.id The name of the page to redirect to
     */
    render() {
        if (this.props.isLoading) {
            return (
                <main>
                    <BarLoader
                        width={100}
                        widthUnit={"%"}
                        color={"#c5050c"}
                        loading={this.props.isLoading}
                    />
                </main>
            );
        }
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
                            <Col xs="10">
                                <Editor
                                    editorState={this.getContent()}
                                    readOnly
                                />
                            </Col>
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
                                            <Editor
                                                editorState={this.getSolution()}
                                                readOnly
                                            />
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
