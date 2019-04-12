import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Button, Jumbotron, Container } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { BarLoader } from "react-spinners";
import { saveQuestionToUserHistory } from "../redux/actions/actions"
const mapStateToProps = state => {

    return {
        user_id : state.authUser.user._id,
        username: state.authUser.user.username,
        isLoading: state.loading.isLoading,
        currentCourses: state.authUser.user.courses,
        history: state.authUser.user.history
    };
};

const imgStyles = {
    width: 60,
    height: 60,
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
        document.title = "CodeShack - Profile" ;
        this.setState({url: localStorage.getItem("url")});
    }

    onRowClick = row => {
        this.props.saveQuestionToUserHistory({question_id: row._id}, this.props.user_id);
        this.context.router.history.push(`/question/${row._id}`);
    }

    onClickEdit = () => {
       
    }

    render() {
        if (this.props.isLoading) {
            return (
                <main>
                    <BarLoader
                        width={100}
                        widthUnit={"%"}
                        color={"#c5050c"}
                        loading={this.props.isLoading}
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
                            <Row>
                                <Col  sm="4"><h3 style={{margin: '5px',textAlign: "center"}}>{this.props.username}</h3></Col>
                                <Col  sm="4"><img alt="profile-pic" src={this.state.url} style={imgStyles}/></Col>
                            </Row>
                            <hr/>
                            <Button outline color="danger" onClick={this.onClickEdit}>Edit</Button>
                        </Container>
                    </Jumbotron>
                    <Container>
                    <h2>My Current Courses</h2>
                    <BootstrapTable
                            data={this.props.currentCourses}
                            options={options}
                            striped
                            hover
                            bordered={false}
                        >
                            <TableHeaderColumn
                                isKey={true}
                                dataField="courseNumber"
                                width="40%"
                            >
                                Course Number
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="courseName"
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
                            data={this.props.history}
                            striped
                            hover
                            bordered={false}
                            options={options}
                        >
                            <TableHeaderColumn
                                isKey={true}
                                dataField="index"
                                width="40%"
                            >
                                Index
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="name"
                                width="30%"
                            >
                                Question
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

export default connect(mapStateToProps, {saveQuestionToUserHistory})(UserProfile);
