import React, { Component } from "react";
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";
import { EditorState, convertToRaw } from "draft-js";
import {
    Container,
    Input,
    Button,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalFooter
} from "reactstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import InfoPopover from "./InfoPopover";
import {
    loadAllCompanies,
    loadAllCourses,
    loadAllTopics,
    createQuestion,
    saveQuestionToUserHistory
} from "../redux/actions/actions";
import { connect } from "react-redux";
import PrismDecorator from "./utils/PrismDecorator.js";
import Footer from "./Footer";

const mapStateToProps = state => {
    return {
        user: state.authUser.user,
        courses: state.course.courses,
        topics: state.topic.topics,
        companies: state.company.companies
    };
};

/**
 * Component for adding a question
 */
export class AddQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            content: convertToRaw(
                EditorState.createEmpty().getCurrentContent()
            ),
            solution: convertToRaw(
                EditorState.createEmpty().getCurrentContent()
            ),
            courses: [],
            companies: [],
            topics: [],
            error: false,
            decorator: new PrismDecorator({ defaultLanguage: "javascript" })
        };
    }

    /**
     * Loads the options for selecting tags; used by react-select
     */
    loadOptions = () => {
        var courseGroup = {
            label: "Courses",
            options: []
        };

        this.props.courses.forEach(course => {
            var courseOption = {
                value: ["course", course._id],
                label: course.courseNumber + ": " + course.courseName
            };
            courseGroup.options.push(courseOption);
        });

        var topicGroup = {
            label: "Topics",
            options: []
        };

        this.props.topics.forEach(topic => {
            var topicOption = {
                value: ["topic", topic._id],
                label: topic.topicName
            };
            topicGroup.options.push(topicOption);
        });

        var companyGroup = {
            label: "Companies",
            options: []
        };

        this.props.companies.forEach(company => {
            var companyOption = {
                value: ["company", company._id],
                label: company.companyName
            };
            companyGroup.options.push(companyOption);
        });
        return [courseGroup, topicGroup, companyGroup];
    };

    componentDidMount() {
        document.title = "Create Question";
        this._isMounted = true;
        this.props.loadAllCompanies();
        this.props.loadAllCourses();
        this.props.loadAllTopics();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Saves the content of the question
     */
    onSaveContent = content => {
        this.setState({ content: content });
    };

    /**
     * Saves the solution of the question
     */
    onSaveSolution = content => {
        this.setState({ solution: content });
    };

    /**
     * Handles the change of any basic input form
     */
    onChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    /**
     * Handles selecting of the tags
     */
    handleTagChange = event => {
        var courses = [];
        var topics = [];
        var companies = [];
        event.forEach(element => {
            switch (element.value[0]) {
                case "course":
                    if (courses.indexOf(element.value[1]) === -1) {
                        courses.push(element.value[1]);
                    }
                    break;
                case "topic":
                    if (topics.indexOf(element.value[1]) === -1) {
                        topics.push(element.value[1]);
                    }

                    break;
                case "company":
                    if (companies.indexOf(element.value[1]) === -1) {
                        companies.push(element.value[1]);
                    }
                    break;
                default:
                    break;
            }
        });

        this.setState({
            courses: courses,
            topics: topics,
            companies: companies
        });
    };

    /**
     * Handles setting the button to disabled when inputs are blank
     */
    handleDisable = () => {
        return (
            this.state.content !== null &&
            this.state.solution !== null &&
            this.state.name !== "" &&
            (this.state.courses.length > 0 ||
                this.state.topics.length > 0 ||
                this.state.companies.length > 0)
        );
    };

    /**
     * Handles when submit is clicked
     */
    onSubmit = event => {
        const question = {
            poster: this.props.user._id,
            name: this.state.name,
            content: JSON.stringify(this.state.content),
            solution: JSON.stringify(this.state.solution),
            courses: this.state.courses,
            topics: this.state.topics,
            companies: this.state.companies
        };

        this.props.createQuestion(question, (err, newQuestion) => {
            if (err) {
                console.log("error");
                this.setState({ error: true });
            } else {
                this.setState({ error: false });
                this.props.saveQuestionToUserHistory(
                    { question_id: newQuestion._id },
                    this.props.user._id
                );
                this.context.router.history.push(
                    `/question/${newQuestion._id}`
                );
            }
        });
    };

    render() {
        return (
            <main>
                <Container>
                    <h2
                        style={{
                            paddingTop: "16px",
                            paddingBottom: "16px"
                        }}
                    >
                        Question Title{" "}
                        <span style={{ color: "#c5050c" }}>
                            <small>*</small>
                        </span>
                    </h2>

                    <Input id="name" onChange={this.onChange} />

                    <Row className="d-flex align-items-center">
                        <Col>
                            <h2
                                style={{
                                    paddingTop: "16px",
                                    paddingBottom: "16px"
                                }}
                            >
                                Question Content{" "}
                                <span style={{ color: "#c5050c" }}>
                                    <small>*</small>
                                </span>
                            </h2>
                        </Col>
                        <Col xs="auto">
                            <InfoPopover
                                id="content"
                                buttonText="?"
                                popoverBodyText={
                                    "Type in the description of the question here, including any background info or code that goes along with it. " +
                                    "Note that code defaults to JavaScript - we are working on adding more language support!"
                                }
                                popoverHeaderText="Question Content"
                            />
                        </Col>
                    </Row>

                    <DraftailEditor
                        style={{ margin: "16px", "user-select": "text" }}
                        rawContentState={this.state.content || null}
                        onSave={this.onSaveContent}
                        blockTypes={[
                            { type: BLOCK_TYPE.HEADER_THREE },
                            { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
                            { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
                            { type: BLOCK_TYPE.CODE }
                        ]}
                        inlineStyles={[
                            { type: INLINE_STYLE.BOLD },
                            { type: INLINE_STYLE.ITALIC },
                            { type: INLINE_STYLE.UNDERLINE },
                            { type: INLINE_STYLE.CODE }
                        ]}
                        spellCheck
                        decorators={[this.state.decorator]}
                    />

                    <Row className="d-flex align-items-center">
                        <Col>
                            <h2
                                style={{
                                    paddingTop: "16px",
                                    paddingBottom: "16px"
                                }}
                            >
                                Solution{" "}
                                <span style={{ color: "#c5050c" }}>
                                    <small>*</small>
                                </span>
                            </h2>
                        </Col>
                        <Col xs="auto">
                            <InfoPopover
                                id="solution"
                                buttonText="?"
                                popoverBodyText={
                                    'Enter the solution to your question here. If you don\'t have or cannot provide a solution, feel free to enter "No Solution" or something simalar. ' +
                                    "Note that code defaults to JavaScript - we are working on adding more language support!"
                                }
                                popoverHeaderText="Solution"
                            />
                        </Col>
                    </Row>

                    <DraftailEditor
                        style={{ margin: "16px", "user-select": "text" }}
                        rawContentState={this.state.solution || null}
                        onSave={this.onSaveSolution}
                        blockTypes={[
                            { type: BLOCK_TYPE.HEADER_THREE },
                            { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
                            { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
                            { type: BLOCK_TYPE.CODE }
                        ]}
                        inlineStyles={[
                            { type: INLINE_STYLE.BOLD },
                            { type: INLINE_STYLE.ITALIC },
                            { type: INLINE_STYLE.UNDERLINE },
                            { type: INLINE_STYLE.CODE }
                        ]}
                        decorators={[this.state.decorator]}
                    />

                    <Row className="d-flex align-items-center">
                        <Col>
                            <h2
                                style={{
                                    paddingTop: "16px",
                                    paddingBottom: "16px"
                                }}
                            >
                                Tags{" "}
                                <span style={{ color: "#c5050c" }}>
                                    <small>*</small>
                                </span>
                            </h2>
                        </Col>
                        <Col xs="auto">
                            <InfoPopover
                                id="tags"
                                buttonText="?"
                                popoverBodyText={
                                    "Select the tags in which you want your question to be associated with. " +
                                    "For each of the tags you select, your question will be added to it's respective page for others to view."
                                }
                                popoverHeaderText="Tags"
                            />
                        </Col>
                    </Row>
                    <Select
                        isMulti
                        isSearchable
                        name="courses"
                        options={this.loadOptions()}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={this.handleTagChange}
                    />
                    <Button
                        disabled={!this.handleDisable()}
                        style={{ marginTop: "16px", marginBottom: "16px" }}
                        color="primary"
                        onClick={this.onSubmit}
                    >
                        Submit
                    </Button>
                    <Row>
                        <Col>
                            <span style={{ color: "#c5050c" }}>*</span>
                            <span> - Required</span>
                        </Col>
                    </Row>
                </Container>
                <Modal
                    isOpen={this.state.error}
                    toggle={() => {
                        this.setState({ error: !this.state.error });
                    }}
                >
                    <ModalBody>
                        There was an error adding your question, please try
                        again.
                    </ModalBody>
                    <ModalFooter
                        onClick={() => {
                            this.setState({ error: !this.state.error });
                        }}
                    >
                        <Button>Close</Button>
                    </ModalFooter>
                </Modal>
                <Footer />
            </main>
        );
    }
}
AddQuestion.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(
    mapStateToProps,
    {
        loadAllCompanies,
        loadAllCourses,
        loadAllTopics,
        createQuestion,
        saveQuestionToUserHistory
    }
)(AddQuestion);
