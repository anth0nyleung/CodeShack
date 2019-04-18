import React, { Component } from "react";
import { loadAllCompanies, createCompany } from "../redux/actions/actions";
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
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { BarLoader } from "react-spinners";
import PropTypes from "prop-types";

const mapStateToProps = state => {
    return {
        companies: state.company.companies,
        isLoading: state.loading.isLoading,
        userRole: state.authUser.user.role
    };
};

/**
 * Course Overview page component
 */
export class CompanyOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companyName: "",
            toggle: false
        };
    }

    componentDidMount() {
        // Sets the title of the page
        document.title = "Companies";

        this.props.loadAllCompanies();
    }

    onChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    onAddCompany = event => {
        this.props.createCompany({
            companyName: this.state.companyName
        });
        this.setState({
            toggle: false
        });
    };

    /**
     * Redirects to the corresponding course page
     *
     * @param event.target.id The name of the page to redirect to
     */
    onRedirect = event => {
        console.log(event.target);
        this.context.router.history.push(`/company/${event.target.id}`);
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
        this.context.router.history.push(`/company/${row._id}`);
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
                            <h3 className="display-3">Companies</h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
                    <Container>
                        <BootstrapTable
                            data={this.props.companies.sort(function(a, b) {
                                return b.questions.length - a.questions.length;
                            })}
                            striped
                            hover
                            bordered={false}
                            options={options}
                        >
                            <TableHeaderColumn
                                isKey={true}
                                dataField="companyName"
                                width="60%"
                            >
                                Company Name
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="questions"
                                thStyle={{
                                    whiteSpace: "normal"
                                }}
                                dataFormat={this.countNumber}
                            >
                                Num. Questions
                            </TableHeaderColumn>
                        </BootstrapTable>
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
                                        + Company
                                    </Button>
                                )}
                            </Col>
                        </Row>
                        <Collapse isOpen={this.state.toggle}>
                            <Row>
                                <Col>
                                    <Input
                                        id="companyName"
                                        placeholder="Company Name..."
                                        onChange={this.onChange}
                                    />
                                    <Button
                                        color="primary"
                                        onClick={this.onAddCompany}
                                        disabled={
                                            this.state.companyName.length === 0
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

CompanyOverview.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loadAllCompanies, createCompany }
)(CompanyOverview);
