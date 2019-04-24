import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container,
    Collapse,
    Input,
    Alert
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { BarLoader } from "react-spinners";
import remove from "lodash/remove";
import {
    saveQuestionToUserHistory,
    loginUser,
    updateUser
} from "../redux/actions/actions";
import Footer from "./Footer";

const courseColumns = [
    {
        dataField: "courseNumber",
        text: "Course Num.",
        sort: true
    },
    {
        dataField: "courseName",
        text: "Course Name",
        sort: true
    }
];

const courseDefaultSorted = [
    {
        dataField: "courseNumber",
        order: "asc"
    }
];

const historyColumns = [
    {
        dataField: "index",
        isDummyField: true,
        text: "#",
        formatter: (cell, row, index) => {
            return <div>{index + 1}</div>;
        },
        headerStyle: (colum, colIndex) => {
            return { width: "10%", textAlign: "left" };
        }
    },
    {
        dataField: "name",
        text: "Question Name"
    }
];

const mapStateToProps = state => {
    return {
        user_id: state.authUser.user._id,
        username: state.authUser.user.username,
        updateError: state.authUser.updateError,
        isLoading: state.loading.isLoading,
        currentCourses: state.authUser.user.courses,
        history: state.authUser.user.history
    };
};

const imgStyles = {
    width: 60,
    height: 60,
    borderRadius: 60,
    justiftyContent: "center"
};

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: null,
            coursesToDelete: [],
            open: false,
            username: "",
            errVisible: true
        };
    }

    componentDidMount() {
        document.title = "CodeShack - Profile";
        this.props.loginUser(err => {});
        this.setState({ url: localStorage.getItem("url") });
    }

    onHistoryClick = (e, row, index) => {
        this.context.router.history.push(`/question/${row._id}`);
    };

    onCourseClick = (e, row, index) => {
        if (e.target.type !== "checkbox" && e.target.cellIndex !== 0) {
            this.context.router.history.push(`/courses/${row._id}`);
        }
    };

    onClickEdit = () => {
        this.setState({ open: !this.state.open });
    };

    handleChange = e => {
        this.setState({
            username: e.target.value
        });
        console.log(this.state.username);
    };

    onClickSubmit = () => {
        this.props.updateUser({ username: this.state.username });
    };

    indexN = (cell, row, enumObject, index) => {
        return <div>{index + 1}</div>;
    };

    handleOnSelectAll = (isSelect, rows) => {
        if (isSelect) {
            var coursesToDelete = [];
            rows.forEach(element => {
                coursesToDelete.push(element._id);
            });
            this.setState({
                coursesToDelete: coursesToDelete
            });
        } else {
            this.setState({
                coursesToDelete: []
            });
        }
    };

    onDelete = () => {
        let difference = this.props.currentCourses.filter(
            x => !this.state.coursesToDelete.includes(x._id)
        );
        this.setState({ coursesToDelete: [] });
        this.props.updateUser({ courses: difference });
    };

    handleOnSelect = (row, isSelect) => {
        var coursesToDelete = this.state.coursesToDelete;
        if (isSelect) {
            coursesToDelete.push(row._id);
        } else {
            remove(coursesToDelete, obj => {
                return obj === row._id;
            });
        }
        this.setState({
            coursesToDelete: coursesToDelete
        });
    };

    onDismiss = () => {
        this.setState({ errVisible: false });
    };

    render() {
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
        const courseRowEvents = {
            onClick: this.onCourseClick
        };
        const selectRow = {
            mode: "checkbox",
            style: { backgroundColor: "#ff7575" },
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll
        };
        const historyRowEvents = {
            onClick: this.onHistoryClick
        };
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col xs="auto">
                                    <img
                                        alt="profile-pic"
                                        src={this.state.url}
                                        style={imgStyles}
                                    />
                                </Col>
                                <Col
                                    className="d-flex align-items-center"
                                    xs="auto"
                                >
                                    <h3
                                        style={{
                                            margin: "5px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {this.props.username}
                                    </h3>
                                </Col>
                            </Row>
                            <hr />
                            <Button
                                outline
                                color="danger"
                                onClick={this.onClickEdit}
                            >
                                Change Username
                            </Button>
                            <Collapse isOpen={this.state.open}>
                                <Container>
                                    <hr />
                                    {this.props.updateError && (
                                        <Alert
                                            color="danger"
                                            isOpen={this.state.errVisible}
                                            toggle={this.onDismiss}
                                        >
                                            User name {this.state.username} has
                                            been taken
                                        </Alert>
                                    )}
                                    <Input
                                        style={{ width: 300 }}
                                        onChange={this.handleChange}
                                        placeholder="Enter you new user name"
                                    />
                                    <Button
                                        style={{ margin: "5px" }}
                                        color="primary"
                                        onClick={this.onClickSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Container>
                            </Collapse>
                        </Container>
                    </Jumbotron>
                    <Container>
                        <h2>Current Courses</h2>
                        <BootstrapTable
                            keyField="_id"
                            data={this.props.currentCourses}
                            columns={courseColumns}
                            striped
                            hover
                            bordered={false}
                            rowEvents={courseRowEvents}
                            selectRow={selectRow}
                            defaultSorted={courseDefaultSorted}
                            bootstrap4
                        />
                        <Collapse
                            isOpen={this.state.coursesToDelete.length > 0}
                        >
                            <Button color="danger" onClick={this.onDelete}>
                                Remove
                            </Button>
                        </Collapse>
                        <hr />
                    </Container>

                    <Container>
                        <h2>Recently Viewed Questions</h2>
                        <BootstrapTable
                            keyField="_id"
                            data={this.props.history}
                            columns={historyColumns}
                            striped
                            hover
                            bordered={false}
                            rowEvents={historyRowEvents}
                            bootstrap4
                        />
                    </Container>
                </main>
                <Footer />
            </div>
        );
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

UserProfile.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { saveQuestionToUserHistory, loginUser, updateUser }
)(UserProfile);
