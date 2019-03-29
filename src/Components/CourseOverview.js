import React, { Component } from "react";
import { loadAllCourses } from "../redux/actions/actions";
import { connect } from "react-redux";
import { chunk } from "lodash";
import { Row, Col, Button, Jumbotron, Container } from "reactstrap";
import PropTypes from "prop-types";

const mapStateToProps = state => {
    return {
        courses: state.course.courses
    };
};

/**
 * Dashboard page component
 */
class CourseOverview extends Component {
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
        console.log(event.target.id);
        this.context.router.history.push(`/courses/${event.target.id}`);
    };

    render() {
        const course_groups_array = chunk(this.props.courses, 2);
        console.log(this.props.courses);
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
                        {course_groups_array.map(course_group => {
                            return (
                                <Row style={{ marginTop: "16px" }}>
                                    {course_group.map(course => {
                                        return (
                                            <Col className="span-2, offset-2">
                                                <h2>{course.courseNumber}</h2>
                                                <p>{course.courseName}</p>
                                                <Button
                                                    id={course._id}
                                                    onClick={this.onRedirect}
                                                    color="primary"
                                                >
                                                    Click Here &raquo;
                                                </Button>
                                            </Col>
                                        );
                                    })}
                                </Row>
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
