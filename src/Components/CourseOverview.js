import React, { Component } from "react";
import { loadAllCourses, createCourse } from "../redux/actions/actions";
import { connect } from "react-redux";
import {
    Jumbotron,
    Container,
    Button,
    Row,
    Col,
    Collapse,
    Input
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { BarLoader } from "react-spinners";
import PropTypes from "prop-types";
import Footer from "./Footer";

const columns = [
    {
        dataField: "courseNumber",
        text: "Course Num.",
        sort: true,
        headerStyle: (colum, colIndex) => {
            return { width: "20%", textAlign: "left" };
        }
    },
    {
        dataField: "courseName",
        text: "Coruse Name",
        sort: true,
        headerStyle: (colum, colIndex) => {
            return { width: "50%", textAlign: "left" };
        }
    },
    {
        dataField: "questions.length",
        text: "Num. Questions",
        sort: true
    }
];

const defaultSorted = [
    {
        dataField: "questions.length",
        order: "desc"
    }
];

const mapStateToProps = state => {
    return {
        courses: state.course.courses,
        isLoading: state.loading.isLoading,
        userRole: state.authUser.user.role
    };
};

/**
 * Course Overview page component
 */
export class CourseOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseNumber: "",
            courseName: "",
            toggle: false
        };
    }

    componentDidMount() {
        // Sets the title of the page
        document.title = "Courses";

        this.props.loadAllCourses();
    }

    onChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    onAddCourse = event => {
        this.props.createCourse({
            courseNumber: this.state.courseNumber,
            courseName: this.state.courseName
        });
        this.setState({ toggle: false });
    };

    /**
     * Handles clicking on a course
     */
    onRowClick = (e, row, index) => {
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

        const rowEvents = {
            onClick: this.onRowClick
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
                            keyField="_id"
                            data={this.props.courses}
                            columns={columns}
                            striped
                            hover
                            bordered={false}
                            rowEvents={rowEvents}
                            defaultSorted={defaultSorted}
                            bootstrap4
                        />
                        <Row>
                            <Col>
                                {this.props.userRole === "admin" && (
                                    <Button
                                        style={{ marginTop: "16px" }}
                                        onClick={() => {
                                            this.setState({
                                                toggle: !this.state.toggle
                                            });
                                        }}
                                        color="primary"
                                    >
                                        + Course
                                    </Button>
                                )}
                            </Col>
                        </Row>
                        <Collapse isOpen={this.state.toggle}>
                            <Row>
                                <Col>
                                    <Input
                                        id="courseNumber"
                                        placeholder="Course Number..."
                                        onChange={this.onChange}
                                    />
                                    <Input
                                        id="courseName"
                                        placeholder="Course Name..."
                                        onChange={this.onChange}
                                    />
                                    <Button
                                        color="primary"
                                        onClick={this.onAddCourse}
                                        disabled={
                                            this.state.courseName.length ===
                                                0 ||
                                            this.state.courseNumber === 0
                                        }
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Collapse>
                    </Container>
                </main>
                <Footer />
            </div>
        );
    }
}

CourseOverview.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loadAllCourses, createCourse }
)(CourseOverview);
