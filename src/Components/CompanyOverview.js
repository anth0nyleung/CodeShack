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
import BootstrapTable from "react-bootstrap-table-next";
import { BarLoader } from "react-spinners";
import PropTypes from "prop-types";

const columns = [
    {
        dataField: "companyName",
        text: "Company Name",
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
     * Handles clicking on a course
     */
    onRowClick = (e, row, index) => {
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

        const rowEvents = {
            onClick: this.onRowClick
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
                            keyField="_id"
                            data={this.props.companies}
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
