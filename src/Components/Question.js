import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
    loadQuestion,
    loadComment,
    createCommentAndReply,
    saveQuestionToUserHistory
} from "../redux/actions/actions";
import BarLoader from "react-spinners/BarLoader";
import "./Question.css";
import {
    convertFromRaw,
    Editor,
    EditorState,
    CompositeDecorator
} from "draft-js";
import Reply from "./Reply";
import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container,
    Card,
    Collapse,
    CardBody,
    Fade
} from "reactstrap";
import LazyLoad from "react-lazyload";
import Comment from "./Comment";
import PrismDecorator from "./utils/PrismDecorator";

const compositeDecorator = new CompositeDecorator([
    new PrismDecorator({ defaultLanguage: "javascript" })
]);
/**
 * Maps the state of the redux store to the properties of the component
 *
 * @param state The state of the application
 */
const mapStateToProps = state => {
    return {
        question: state.question.currentQuestion,
        isLoading: state.loading.isLoading,
        username: state.authUser.user.username,
        user_id: state.authUser.user._id
    };
};

/**
 * A component which renders an individual question
 */
export class Question extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            reply: null,
            collapseComment: false,
            didAddToHistory: false
        };
    }

    componentDidMount() {
        // Sets the title of the page
        document.title = "Question";

        this.props.loadQuestion(this.props.match.params.id);
    }

    componentDidUpdate() {
        if (!this.props.isLoading) {
            this.props.saveQuestionToUserHistory(
                { question_id: this.props.question._id },
                this.props.user_id
            );
        }
    }

    /**
     * Custom code block rendering for draft-js editor
     */
    codeBlockStyle = contentBlock => {
        const type = contentBlock.getType();
        if (type === "code-block") {
            return "blockCode";
        }
    };

    /**
     * Toggles the collapse component for the solution
     */
    toggle = () => {
        var curr = this.state.collapse;
        this.setState({ collapse: !curr });
    };

    /**
     * Toggles the collapse component for posting a comment
     */
    toggleComment = () => {
        var curr = this.state.collapseComment;
        this.setState({ collapseComment: !curr });
    };

    /**
     * Returns a sorted array of the comments
     */
    sortedComments = () => {
        return this.props.question.comments.sort((a, b) => {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        });
    };

    /**
     * Returns the quesiton content in a readable format
     */
    getContent = () => {
        if (this.props.question.content) {
            var content = convertFromRaw(
                JSON.parse(this.props.question.content)
            );
            return EditorState.createWithContent(content, compositeDecorator);
        } else {
            return EditorState.createEmpty();
        }
    };

    /**
     * Returns the question solution in a readable format
     */
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
     * Handles disalbing the button when the reply is empty
     */
    handleReplyDisable = () => {
        return this.state.reply !== null;
    };

    /**
     * Saves the current content of the editor
     */
    onSave = content => {
        this.setState({ reply: content });
    };

    /**
     * Handles replying to the question
     */
    onReply = () => {
        this.props.createCommentAndReply(
            {
                content: JSON.stringify(this.state.reply),
                poster: this.props.username,
                posterID: this.props.user_id,
                parent: null
            },
            this.props.question._id,
            () => {
                window.location.reload();
            }
        );
        this.toggleComment();
    };

    render() {
        // While the question is being loaded, display loading bar
        if (this.props.isLoading) {
            return (
                <main>
                    <BarLoader
                        width={100}
                        widthUnit={"%"}
                        color={"#c5050c"}
                        loading={true}
                    />
                </main>
            );
        }
        return (
            <div>
                <Fade in={!this.props.isLoading}>
                    <main>
                        <Jumbotron>
                            <Container>
                                <h3 className="display-3">
                                    {this.props.question.name}
                                </h3>
                                <hr className="my-2" />
                                <p>
                                    Posted by{" "}
                                    {this.props.question.poster
                                        ? this.props.question.poster.username
                                        : ""}
                                </p>
                            </Container>
                        </Jumbotron>
                        <Container>
                            <Row>
                                <Col xs="2" className="text-danger">
                                    <strong>Description</strong>
                                </Col>
                                <Col xs="10">
                                    <Editor
                                        editorState={this.getContent()}
                                        readOnly
                                        blockStyleFn={this.codeBlockStyle}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col xs="2">
                                    <Button
                                        color="primary"
                                        onClick={this.toggle}
                                    >
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
                                                    blockStyleFn={
                                                        this.codeBlockStyle
                                                    }
                                                />
                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                </Col>
                            </Row>

                            <hr />
                            <Row>
                                <Col>
                                    <h3>Comments</h3>
                                </Col>
                                <Fade in={this.state.collapseComment}>
                                    <Col xs="auto">
                                        <Button
                                            size="sm"
                                            color="primary"
                                            disabled={
                                                !this.handleReplyDisable()
                                            }
                                            onClick={this.onReply}
                                        >
                                            Post
                                        </Button>
                                    </Col>
                                </Fade>
                                <Col xs="auto">
                                    <Button
                                        onClick={this.toggleComment}
                                        color="primary"
                                        size="sm"
                                    >
                                        {!this.state.collapseComment
                                            ? "Post a Comment"
                                            : "Cancel"}
                                    </Button>
                                </Col>
                            </Row>
                            <Collapse isOpen={this.state.collapseComment}>
                                <Row>
                                    <Col>
                                        <Reply onSave={this.onSave} />
                                    </Col>
                                </Row>
                            </Collapse>

                            {this.sortedComments().map(comment => {
                                return (
                                    <LazyLoad
                                        key={comment._id}
                                        height={100}
                                        once
                                    >
                                        <Comment
                                            key={comment._id}
                                            loadComment={this.props.loadComment}
                                            comment_id={comment._id}
                                            indent={0}
                                        />
                                    </LazyLoad>
                                );
                            })}
                        </Container>
                    </main>
                    <footer>
                        <Container>
                            <hr />
                            <p>&copy; CodeShack 2019</p>
                        </Container>
                    </footer>
                </Fade>
            </div>
        );
    }
}

Question.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    {
        loadQuestion,
        loadComment,
        createCommentAndReply,
        saveQuestionToUserHistory
    }
)(Question);
