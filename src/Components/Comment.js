import React, { Component } from "react";
import { Collapse, Row, Col, Button, Fade } from "reactstrap";
import { connect } from "react-redux";
import { createCommentAndReply, deleteComment } from "../redux/actions/actions";
import {
    convertFromRaw,
    Editor,
    EditorState,
    CompositeDecorator
} from "draft-js";
import Reply from "./Reply";
import { PulseLoader } from "react-spinners";
import { MdReply, MdDelete, MdCancel } from "react-icons/md";
import PrismDecorator from "./utils/PrismDecorator";
import "./Question.css";

const compositeDecorator = new CompositeDecorator([
    new PrismDecorator({ defaultLanguage: "javascript" })
]);

const mapStateToProps = state => {
    return {
        comments: state.comment.comments,
        username: state.authUser.user.username,
        user_id: state.authUser.user._id
    };
};

/**
 * Comment component for rendering individual comments
 */
class _Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleText: "Reply",
            reply: null,
            collapse: false
        };
    }

    componentDidMount() {
        // Load the comment once the component mounts
        this.props.loadComment(this.props.comment_id, () => {
            console.log("Callback for:", this.props.comment_id);
        });
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
     * Toggles the collapse component
     */
    toggle = () => {
        var curr = this.state.collapse;
        this.setState({ collapse: !curr, reply: null });
    };

    /**
     * Renders all the children of the comment
     */
    nestedComments = () => {
        let comment = this.props.comments.find(element => {
            return element._id === this.props.comment_id;
        });
        return comment.children.map(comment => {
            return (
                <Comment
                    key={comment._id}
                    loadComment={this.props.loadComment}
                    comment_id={comment}
                    indent={
                        this.props.indent <= 5
                            ? this.props.indent + 1
                            : this.props.indent
                    }
                />
            );
        });
    };

    /**
     * Finds the comment in the list of all comments
     */
    getComment = () => {
        if (this.props.comments) {
            return this.props.comments.find(element => {
                return element._id === this.props.comment_id;
            });
        } else {
            return null;
        }
    };

    /**
     * Converts the content into a format readable by the Editor
     */
    getContent = () => {
        let comment = this.props.comments.find(element => {
            return element._id === this.props.comment_id;
        });
        if (comment) {
            var content = convertFromRaw(JSON.parse(comment.content));
            return EditorState.createWithContent(content, compositeDecorator);
        } else {
            return EditorState.createEmpty();
        }
    };

    /**
     * Saves the content of the Draftail Editor in Reply
     */
    onSave = content => {
        this.setState({ reply: content });
    };

    /**
     * Makes sure that there is a reply before a user can submit
     */
    handleDisable = () => {
        return this.state.reply !== null;
    };

    /**
     * Handles replying to a comment
     */
    onReply = () => {
        const comment = this.getComment();
        this.props.createCommentAndReply(
            {
                content: JSON.stringify(this.state.reply),
                poster: this.props.username,
                posterID: this.props.user_id,
                parent: comment._id
            },
            this.props.question_id,
            () => {
                window.location.reload();
            }
        );
        this.toggle();
    };

    /**
     * Handles deleting a comment
     */
    onDelete = () => {
        const comment = this.getComment();
        this.props.deleteComment(comment._id, () => {
            window.location.reload();
        });
    };

    getPosterId = comment => {
        if (comment.posterID) {
            return comment.posterID;
        } else {
            return {
                _id: null,
                username: "[deleted]"
            };
        }
    };
    render() {
        const comment = this.getComment();
        // If the comment hasn't been fetched yet, don't display anything
        if (!comment) {
            return (
                <div>
                    <PulseLoader color={"#c5050c"} loading={true} />
                </div>
            );
        }
        return (
            <div
                style={{
                    paddingTop: "8px"
                }}
                key={comment._id}
            >
                <div
                    style={{
                        marginLeft: `${this.props.indent * 40}px`
                    }}
                    color={this.props.indent % 2 === 0 ? "white" : "gray-200"}
                >
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <span
                                        color="info"
                                        style={{
                                            marginBottom: "1px",
                                            color: "#0479a8"
                                        }}
                                        size="sm"
                                    >
                                        {!comment.deleted
                                            ? this.getPosterId(comment).username
                                            : "[deleted]"}
                                    </span>
                                    <span size="sm">
                                        <small>
                                            {" "}
                                            -{" "}
                                            {new Date(
                                                comment.createdAt
                                            ).toDateString()}
                                        </small>
                                    </span>{" "}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {!comment.deleted ? (
                                        <Editor
                                            blockStyleFn={this.codeBlockStyle}
                                            editorState={this.getContent()}
                                            readOnly
                                            style={{ marginBorrom: "0px" }}
                                        />
                                    ) : (
                                        <p>deleted</p>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="auto">
                            <Row>
                                <Button
                                    onClick={this.toggle}
                                    size="md"
                                    disabled={comment.deleted}
                                    color="#f7f7f7"
                                    outline={false}
                                >
                                    {!this.state.collapse ? (
                                        <MdReply />
                                    ) : (
                                        <MdCancel />
                                    )}
                                </Button>
                            </Row>
                            <Row>
                                {this.getPosterId(comment)._id ===
                                    this.props.user_id && (
                                    <Button
                                        size="md"
                                        onClick={this.onDelete}
                                        color="#f7f7f7"
                                        outline={false}
                                    >
                                        <MdDelete />
                                    </Button>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </div>
                {!comment.deleted && (
                    <Row>
                        <Col />
                        <Col xs="auto">
                            <Fade in={this.state.collapse} />
                        </Col>
                    </Row>
                )}
                <Collapse isOpen={this.state.collapse}>
                    <Row style={{ marginTop: "8px" }}>
                        <Col>
                            <Reply onSave={this.onSave} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "4px" }}>
                        <Col xs="auto">
                            <Button
                                onClick={this.onReply}
                                disabled={!this.handleDisable()}
                                size="md"
                            >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Collapse>
                <hr style={{ marginTop: "10px" }} />
                {this.nestedComments()}
            </div>
        );
    }
}

const Comment = connect(
    mapStateToProps,
    { createCommentAndReply, deleteComment }
)(_Comment);

export default Comment;
