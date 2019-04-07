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
 * Dashboard page component
 */
export class CourseOverview extends Component {
    state = {};

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

    countNumber = (cell, row) => {
        return cell.length;
    };

    onRowClick = row => {
        this.context.router.history.push(`/courses/${row._id}`);
    };

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

        const options = {
            onRowClick: this.onRowClick
        };
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3 className="display-3">Course</h3>
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
                                dataField="courseNumber"
                                width="15%"
                            >
                                Course Number
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="courseName"
                                width="70%"
                            >
                                CourseName
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="questions"
                                dataFormat={this.countNumber}
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
