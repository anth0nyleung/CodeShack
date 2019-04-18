import React, { Component } from "react";
import { connect } from "react-redux";
import { loadAllQuestions } from "../redux/actions/actions";
import { Jumbotron, Container } from "reactstrap";
import { BarLoader } from "react-spinners";
import { PropTypes } from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { convertFromRaw } from "draft-js";

const mapStateToProps = state => {
    return {
        questions: state.question.questions,
        isLoading: state.loading.isLoading,
        questionTags: state.question.questionTags
    };
};

class AllQuestions extends Component {
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

    onRowClick = row => {
        this.context.router.history.push(`/question/${row._id}`);
    };

    formatTags = (cell, row) => {
        return this.props.questionTags[row._id];
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
        const options = {
            onRowClick: this.onRowClick
        };
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3 className="display-3">All Questions</h3>
                        </Container>
                    </Jumbotron>
                    <Container>
                        <h2 style={{ marginTop: "16px", marginBottom: "16px" }}>
                            Questions
                        </h2>
                        <BootstrapTable
                            data={this.props.questions}
                            striped
                            pagination={true}
                            search
                            hover
                            bordered={false}
                            options={options}
                        >
                            <TableHeaderColumn isKey={true} dataField="name">
                                Name
                            </TableHeaderColumn>
                            {/*<TableHeaderColumn
                                tdStyle={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden"
                                }}
                                thStyle={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden"
                                }}
                                dataField="content"
                                dataFormat={this.formatDescription}
                            >
                                Description
                            </TableHeaderColumn>*/}
                            <TableHeaderColumn
                                tdStyle={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden"
                                }}
                                thStyle={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden"
                                }}
                                dataFormat={this.formatTags}
                            >
                                Tags
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </Container>
                </main>
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
