import React, { Component } from "react";
import { connect } from "react-redux";
import { loadTopic } from "../redux/actions/actions";
import { Jumbotron, Container } from "reactstrap";
import { BarLoader } from "react-spinners";
import { PropTypes } from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { convertFromRaw } from "draft-js";

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
        currentTopic: state.topic.currentTopic,
        isLoading: state.loading.isLoading
    };
};

/**
 * Component which lists all questions for a course
 */
export class TopicQuestions extends Component {
    componentDidMount() {
        document.title = "Questions";
        this.props.loadTopic(this.props.match.params.id);
    }

    /**
     * Handles clicking on a question
     */
    onRowClick = (e, row, index) => {
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
                            <h3 className="display-3">
                                {this.props.currentTopic.topicName}
                            </h3>
                        </Container>
                    </Jumbotron>
                    <Container>
                        <h2 style={{ marginTop: "16px", marginBottom: "16px" }}>
                            Questions
                        </h2>
                        <ToolkitProvider
                            keyField="_id"
                            data={this.props.currentTopic.questions}
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

TopicQuestions.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loadTopic }
)(TopicQuestions);
