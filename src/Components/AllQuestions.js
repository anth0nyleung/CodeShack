import React, { Component } from "react";
import { connect } from "react-redux";
import { loadAllQuestions } from "../redux/actions/actions";
import { Jumbotron, Container } from "reactstrap";
import { BarLoader } from "react-spinners";
import { PropTypes } from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { convertFromRaw } from "draft-js";
import Footer from "./Footer";

const { SearchBar } = Search;

const mapStateToProps = state => {
    return {
        questions: state.question.questions,
        isLoading: state.loading.isLoading,
        questionTags: state.question.questionTags
    };
};

export class AllQuestions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questionTags: [[]]
        };
    }

    componentDidMount() {
        document.title = "All Questions";
        this.props.loadAllQuestions();
    }

    onRowClick = (e, row, index) => {
        this.context.router.history.push(`/question/${row._id}`);
    };

    formatTags = (cell, row) => {
        return this.props.questionTags[row._id].slice(0, -2);
    };

    formatDescription = (cell, row) => {
        return convertFromRaw(JSON.parse(cell)).getPlainText();
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
            },
            {
                dataField: "tags",
                isDummyField: true,
                text: "Tags",
                formatter: (cell, row, index, formatExtraData) => {
                    return formatExtraData[row._id].slice(0, -2);
                },
                formatExtraData: this.props.questionTags
            }
        ];
        const rowEvents = {
            onClick: this.onRowClick
        };
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3 className="display-3">All Questions</h3>
                            <hr />
                        </Container>
                    </Jumbotron>
                    <Container>
                        <h2 style={{ marginTop: "16px", marginBottom: "16px" }}>
                            Questions
                        </h2>

                        <ToolkitProvider
                            keyField="_id"
                            data={this.props.questions}
                            columns={columns}
                            search={{ searchFormatted: true }}
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
                <Footer />
            </div>
        );
    }
}

AllQuestions.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loadAllQuestions }
)(AllQuestions);
