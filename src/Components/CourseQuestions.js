import React, { Component } from "react";
import { connect } from "react-redux";
import { loadCourse } from "../redux/actions/actions";
import { Jumbotron, Container, ListGroup, ListGroupItem } from "reactstrap";

const mapStateToProps = state => {
    return {
        currentCourse: state.course.currentCourse
    };
};

class CourseQuestions extends Component {
    componentDidMount() {
        this.props.loadCourse(this.props.match.params.id);
    }

    handleQuestion = event => {
        console.log(event.target.id);
    };

    render() {
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3 className="display-3">
                                {this.props.currentCourse.courseNumber}
                            </h3>
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
                        <ListGroup
                            style={{
                                overflow: "auto",
                                height: "auto"
                            }}
                        >
                            {this.props.currentCourse.questions.map(
                                question => {
                                    return (
                                        <ListGroupItem
                                            tag="button"
                                            href="#"
                                            action
                                            id={question._id}
                                            onClick={this.handleQuestion}
                                        >
                                            {question.name}
                                        </ListGroupItem>
                                    );
                                }
                            )}
                        </ListGroup>
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

export default connect(
    mapStateToProps,
    { loadCourse }
)(CourseQuestions);
