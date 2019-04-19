import React, { Component } from "react";
import { connect } from "react-redux";
import {
    loadCourse,
    saveQuestionToUserHistory,
    updateUser
} from "../redux/actions/actions";
import { Jumbotron, Container, Row, Col, Button } from "reactstrap";
import { BarLoader } from "react-spinners";
import { PropTypes } from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { convertFromRaw } from "draft-js";
import { Default, Mobile } from "./utils/Responsive";

const { SearchBar } = Search;
const columns = [
    {
        dataField: "name",
        text: "Question Name",
        sort: "true"
    },
    {
        dataField: "content",
        text: "Description",
        style: {
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden"
        },
        formatter: (cell, row) => {
            return cell
                ? convertFromRaw(JSON.parse(cell)).getPlainText()
                : null;
        }
    }
];

const mapStateToProps = state => {
    return {
        currentCourse: state.course.currentCourse,
        isLoading: state.loading.isLoading,
        user_id: state.authUser.user._id,
        userCourses: state.authUser.user.courses
    };
};

/**
 * Component which lists all questions for a course
 */
export class CourseQuestions extends Component {
    componentDidMount() {
        document.title = "Questions";
        this.props.loadCourse(this.props.match.params.id);
    }

    onAddToCourses = () => {
        this.props.updateUser({
            courses: [...this.props.userCourses, this.props.currentCourse._id]
        });
    };

    isUserCourse = () => {
        var index = this.props.userCourses.findIndex(element => {
            return element._id === this.props.currentCourse._id;
        });
        return index !== -1;
    };

    /**
     * Formats the description of a question to be readable
     */
    formatDescription = (cell, row) => {
        return convertFromRaw(JSON.parse(cell)).getPlainText();
    };

    /**
     * Handles clicking on a question
     */
    onRowClick = (e, row, index) => {
        //this.props.saveQuestionToUserHistory({question_id: row._id}, this.props.user_id)
        this.context.router.history.push(`/question/${row._id}`);
    };

    render() {
        // While quesitons are being fetched, loading
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
        const rowEvents = {
            onClick: this.onRowClick
        };
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col>
                                    <h3 className="display-3">
                                        {this.props.currentCourse.courseNumber}
                                    </h3>
                                </Col>
                                <Default>
                                    <Col
                                        xs="auto"
                                        className="d-flex align-items-center"
                                    >
                                        {!this.isUserCourse() && (
                                            <Button
                                                color="primary"
                                                onClick={this.onAddToCourses}
                                            >
                                                + Current Courses
                                            </Button>
                                        )}
                                    </Col>
                                </Default>
                                <Mobile>
                                    <Col
                                        xs="4"
                                        className="d-flex align-items-center"
                                    >
                                        {!this.isUserCourse() && (
                                            <Button
                                                color="primary"
                                                onClick={this.onAddToCourses}
                                            >
                                                + Current Courses
                                            </Button>
                                        )}
                                    </Col>
                                </Mobile>
                            </Row>

                            <hr className="my-2" />
                            <p className="leading">
                                {this.props.currentCourse.courseName}
                            </p>
                        </Container>
                    </Jumbotron>
                    <Container>
                        <h2 style={{ marginTop: "16px", marginBottom: "16px" }}>
                            Questions
                        </h2>
                        <ToolkitProvider
                            keyField="_id"
                            data={this.props.currentCourse.questions}
                            columns={columns}
                            search
                        >
                            {props => (
                                <div>
                                    <SearchBar {...props.searchProps} />
                                    <BootstrapTable
                                        {...props.baseProps}
                                        pagination={paginationFactory()}
                                        hover
                                        bordered={false}
                                        rowEvents={rowEvents}
                                        bootstrap4
                                        striped
                                    />
                                </div>
                            )}
                        </ToolkitProvider>
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

CourseQuestions.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loadCourse, saveQuestionToUserHistory, updateUser }
)(CourseQuestions);
