import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Button, Jumbotron, Container } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";


const mapStateToProps = state => {
    return {
        username: state.authUser.user.username,
    };
};

const imgStyles = {
    width: 50,
    height: 50,
    backgroundColor: "red",
    justiftyContent : "center"
};

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url : null
        };
    }

    componentDidMount() {
        document.title = "CodeShack - User Profile";
        this.setState({url: localStorage.getItem("url")});
    }

    render() {
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col  sm="4"><h3 style={{margin: '5px',textAlign: "center"}}>{this.props.username}</h3></Col>
                                <Col  sm="4"><img src={this.state.url} style={imgStyles}/></Col>
                            </Row>
                            <hr/>
                            <Button outline color="danger">Edit</Button>
                        </Container>
                    </Jumbotron>
                    <Container>
                    <h2>My Current Courses</h2>
                    <BootstrapTable
                            striped
                            hover
                            bordered={false}
                        >
                            <TableHeaderColumn
                                isKey={true}
                                dataField="index"
                                width="40%"
                            >
                                Course Number
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="Question"
                                width="50%"
                            >
                                Course Name
                            </TableHeaderColumn>
                        </BootstrapTable>
                    <hr/>
                    </Container>
                    
                    <Container>
                        <h2>Recently Viewed Question</h2>
                        <BootstrapTable
                            striped
                            hover
                            bordered={false}
                        >
                            <TableHeaderColumn
                                isKey={true}
                                dataField="index"
                                width="40%"
                            >
                                Index
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="Question"
                                width="30%"
                            >
                                Question
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="Course"
                                width="20%"
                            >
                                Course
                            </TableHeaderColumn>
                        </BootstrapTable>
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

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

UserProfile.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(UserProfile);
