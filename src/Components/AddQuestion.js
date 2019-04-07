import React, { Component } from "react";
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";
import { Container, Input, Button } from "reactstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import {
    loadAllCompanies,
    loadAllCourses,
    loadAllTopics,
    createQuestion
} from "../redux/actions/actions";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        courses: state.course.courses,
        topics: state.topic.topics,
        companies: state.company.companies
    };
};

class AddQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            content: null,
            solution: null,
            courses: [],
            companies: [],
            topics: []
        };
    }

    loadOptions = () => {
        console.log("here");
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
        this.props.loadAllCompanies();
        this.props.loadAllCourses();
        this.props.loadAllTopics();
    }

    onSaveContent = content => {
        this.setState({ content: content });
    };

    onSaveSolution = content => {
        this.setState({ solution: content });
    };

    onChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleTagChange = event => {
        var courses = [];
        var topics = [];
        var companies = [];
        event.forEach(element => {
            switch (element.value[0]) {
                case "course":
                    courses.push(element.value[1]);
                    break;
                case "topic":
                    topics.push(element.value[1]);
                    break;
                case "company":
                    companies.push(element.value[1]);
                    break;
                default:
                    break;
            }
        });
        console.log({ courses, topics, companies });
        this.setState({
            courses: courses,
            topics: topics,
            companies: companies
        });
    };

    handleDisable = () => {
        return this.state.content !== null && this.state.name !== "";
    };

    onSubmit = event => {
        const question = {
            name: this.state.name,
            content: JSON.stringify(this.state.content),
            solution: JSON.stringify(this.state.solution),
            courses: this.state.courses,
            topics: this.state.topics,
            companies: this.state.companies
        };
        console.log(question);
        this.props.createQuestion(question, (err, newQuestion) => {
            if (err) {
                console.log("error");
            } else {
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
                    <h2 style={{ paddingTop: "16px", paddingBottom: "16px" }}>
                        Question Title
                    </h2>
                    <Input id="name" onChange={this.onChange} />
                    <h2 style={{ paddingTop: "16px", paddingBottom: "16px" }}>
                        Question Content
                    </h2>
                    <DraftailEditor
                        style={{ margin: "16px" }}
                        rawContentState={null}
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
                            { type: INLINE_STYLE.UNDERLINE }
                        ]}
                        plugins={this.state.plugins}
                    />
                    <h2 style={{ paddingTop: "16px", paddingBottom: "16px" }}>
                        Solution (Optional)
                    </h2>
                    <DraftailEditor
                        style={{ margin: "16px" }}
                        rawContentState={null}
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
                            { type: INLINE_STYLE.UNDERLINE }
                        ]}
                    />
                    <h2 style={{ paddingTop: "16px", paddingBottom: "16px" }}>
                        Tags
                    </h2>
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
                </Container>
            </main>
        );
    }
}
AddQuestion.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(
    mapStateToProps,
    { loadAllCompanies, loadAllCourses, loadAllTopics, createQuestion }
)(AddQuestion);
