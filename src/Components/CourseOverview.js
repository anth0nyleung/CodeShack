import React, { Component } from "react";
import { loadAllCourses } from "../redux/actions/actions";
import { connect } from "react-redux";
import { Jumbotron, Container } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { BarLoader } from "react-spinners";
import PropTypes from "prop-types";

const mapStateToProps = state => {
    return {
        courses: state.course.courses,
        isLoading: state.loading.isLoading
    };
};

/**
 * Course Overview page component
 */
export class CourseOverview extends Component {
    componentDidMount() {
        // Sets the title of the page
        document.title = "Course Overview";

        this.props.loadAllCourses();
    }

    /**
     * Redirects to the corresponding course page
     *
     * @param event.target.id The name of the page to redirect to
     */
    onRedirect = event => {
        console.log(event.target);
        this.context.router.history.push(`/courses/${event.target.id}`);
        event.preventDefault();
    };

    /**
     * Counts the number of quesions a course has
     */
    countNumber = (cell, row) => {
        return cell.length;
    };

    /**
     * Handles clicking on a course
     */
    onRowClick = row => {
        this.context.router.history.push(`/courses/${row._id}`);
    };

    render() {
        // Renders a loading bar while waiting
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

        const options = {
            onRowClick: this.onRowClick
        };
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3 className="display-3">Courses</h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
                    <Container>
                        <BootstrapTable
                            data={this.props.courses.sort(function(a, b) {
                                return b.questions.length - a.questions.length;
                            })}
                            striped
                            hover
                            bordered={false}
                            options={options}
                        >
                            <TableHeaderColumn
                                isKey={true}
                                thStyle={{
                                    whiteSpace: "normal"
                                }}
                                dataField="courseNumber"
                                width="auto"
                                dataSort={true}
                            >
                                Course Number
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="courseName"
                                width="50%"
                            >
                                CourseName
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataSort={true}
                                dataField="questions"
                                thStyle={{
                                    whiteSpace: "normal"
                                }}
                                dataFormat={this.countNumber}
                                width="auto"
                            >
                                Num. Questions
                            </TableHeaderColumn>
                        </BootstrapTable>
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

CourseOverview.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loadAllCourses }
)(CourseOverview);
