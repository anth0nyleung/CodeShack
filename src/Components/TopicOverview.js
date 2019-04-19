import React, { Component } from "react";
import { loadAllTopics, createTopic } from "../redux/actions/actions";
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

const columns = [
    {
        dataField: "topicName",
        text: "Topic Name",
        sort: true,
        headerStyle: (colum, colIndex) => {
            return { width: "70%", textAlign: "left" };
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
        topics: state.topic.topics,
        isLoading: state.loading.isLoading,
        userRole: state.authUser.user.role
    };
};

/**
 * Course Overview page component
 */
export class TopicOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topicName: "",
            toggle: false
        };
    }

    componentDidMount() {
        // Sets the title of the page
        document.title = "Topics";

        this.props.loadAllTopics();
    }

    onChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    onAddTopic = event => {
        this.props.createTopic({
            topicName: this.state.topicName
        });
        this.setState({
            toggle: false
        });
    };

    /**
     * Handles clicking on a course
     */
    onRowClick = (e, row, index) => {
        this.context.router.history.push(`/topic/${row._id}`);
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
                            <h3 className="display-3">Topics</h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
                    <Container>
                        <BootstrapTable
                            keyField="_id"
                            data={this.props.topics}
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
                                        + Topic
                                    </Button>
                                )}
                            </Col>
                        </Row>
                        <Collapse isOpen={this.state.toggle}>
                            <Row>
                                <Col>
                                    <Input
                                        id="topicName"
                                        placeholder="Topic Name..."
                                        onChange={this.onChange}
                                    />
                                    <Button
                                        color="primary"
                                        onClick={this.onAddTopic}
                                        disabled={
                                            this.state.topicName.length === 0
                                        }
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Collapse>
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

TopicOverview.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loadAllTopics, createTopic }
)(TopicOverview);
