import React, { Component } from "react";
import { Collapse, Row, Col, Button, Fade } from "reactstrap";
import { connect } from "react-redux";
import { createCommentAndReply, deleteComment } from "../redux/actions/actions";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import Reply from "./Reply";

const mapStateToProps = state => {
    return {
        comments: state.comment.comments,
        username: state.authUser.user.username,
        user_id: state.authUser.user._id
    };
};

class _Comment extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            toggleText: "Reply",
            currentComment: {
                content: null,
                children: []
            },
            reply: null,
            collapse: false
        };
    }

    toggle = () => {
        var curr = this.state.collapse;
        this.setState({ collapse: !curr, reply: null });
    };

    componentDidMount() {
        this.props.loadComment(this.props.comment_id, () => {
            console.log("Callback for:", this.props.comment_id);
        });
    }

    nestedComments = () => {
        let comment = this.props.comments.find(element => {
            return element._id === this.props.comment_id;
        });
        return comment.children.map(comment => {
            return (
                <Comment
                    loadComment={this.props.loadComment}
                    comment_id={comment}
                    indent={this.props.indent + 1}
                />
            );
        });
    };

    getComment = () => {
        if (this.props.comments) {
            return this.props.comments.find(element => {
                return element._id === this.props.comment_id;
            });
        } else {
            return null;
        }
    };

    getContent = () => {
        let comment = this.props.comments.find(element => {
            return element._id === this.props.comment_id;
        });
        if (comment) {
            var content = convertFromRaw(JSON.parse(comment.content));
            return EditorState.createWithContent(content);
        } else {
            return EditorState.createEmpty();
        }
    };

    onSave = content => {
        this.setState({ reply: content });
    };

    handleDisable = () => {
        return this.state.reply !== null;
    };

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

    onDelete = () => {
        const comment = this.getComment();
        this.props.deleteComment(comment._id, () => {
            window.location.reload();
        });
    };

    render() {
        const comment = this.getComment();
        if (!comment) {
            return <div />;
        }
        return (
            <div
                style={{
                    paddingTop: "8px"
                }}
                key={comment._id}
            >
                <Row>
                    <Col>
                        <div
                            style={{
                                marginLeft: `${this.props.indent * 40}px`
                            }}
                            color={
                                this.props.indent % 2 === 0
                                    ? "white"
                                    : "gray-200"
                            }
                        >
                            <span
                                color="info"
                                style={{
                                    marginBottom: "1px",
                                    color: "#0479a8"
                                }}
                                size="sm"
                            >
                                {!comment.deleted
                                    ? comment.poster
                                    : "[deleted]"}
                            </span>
                            <span size="sm">
                                <small>
                                    {" "}
                                    -{" "}
                                    {new Date(comment.createdAt).toDateString()}
                                </small>
                            </span>{" "}
                            {!comment.deleted ? (
                                <Editor
                                    editorState={this.getContent()}
                                    readOnly
                                    style={{ marginBorrom: "0px" }}
                                />
                            ) : (
                                <p>deleted</p>
                            )}
                        </div>
                    </Col>
                </Row>
                {!comment.deleted && (
                    <Row>
                        <Col />
                        <Col xs="auto">
                            <Fade in={this.state.collapse}>
                                <Button
                                    onClick={this.onReply}
                                    disabled={!this.handleDisable()}
                                    size="sm"
                                >
                                    Reply
                                </Button>
                            </Fade>
                        </Col>

                        {comment.posterID === this.props.user_id && (
                            <Col xs="auto">
                                <Button size="sm" onClick={this.onDelete}>
                                    Delete
                                </Button>
                            </Col>
                        )}
                        <Col xs="auto">
                            <Button size="sm" onClick={this.toggle}>
                                {!this.state.collapse ? "Reply" : "Cancel"}
                            </Button>
                        </Col>
                    </Row>
                )}
                <Collapse isOpen={this.state.collapse}>
                    <Row style={{ marginTop: "8px" }}>
                        <Col>
                            <Reply onSave={this.onSave} />
                        </Col>
                    </Row>
                </Collapse>
                <hr style={{ marginTop: "4px" }} />
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
