import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container,
    Card,
    Collapse,
    CardBody
} from "reactstrap";

/**
 * Maps the state of the redux store to the properties of the component
 *
 * @param state The state of the application
 */
const mapStateToProps = state => {
    return {
        questions: null // TODO: Set questions here
    };
};

/**
 * Dashboard page component
 */
export class Question extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    componentDidMount() {
        // Sets the title of the page
        document.title = "Question";

        // this.props.loadAllQuestions();
    }
    toggle = () => {
        var curr = this.state.collapse
        this.setState({collapse : !curr});
    }

    /**
     * Redirects to the corresponding question page
     *
     * @param event.target.id The id of the questions to view
     */
    onQuestionClick = event => {
        // Redirect to specific question
    };

    /**
     * Redirects to the corresponding overview page
     *
     * @param event.target.id The name of the page to redirect to
     */
    render() {
        return (
            <div>
                <main>
                    <Jumbotron>
                        <Container>
                            <h3 className="display-3">Question</h3>
                            <hr className="my-2" />
                        </Container>
                    </Jumbotron>
                    <Container>
                        <Row>
                            <Col xs = "2" className="text-danger"><strong>Question name</strong></Col>
                            <Col xs = "10">Dynamic programming</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col xs = "2" className="text-danger"><strong>Description</strong></Col>      
                            <Col xs = "10">
                                LCS Problem Statement: Given two sequences, find the length of longest subsequence present in both of them. 
                                A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous. 
                                For example, “abc”, “abg”, “bdf”, “aeg”, ‘”acefg”, .. etc are subsequences of “abcdefg”. 
                                So a string of length n has 2^n different possible subsequences.
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col xs = "2">
                                <Button
                                    color = "primary"
                                    onClick = {this.toggle}> 
                                    Show Solution
                               </Button> 
                            </Col>
                            <Col xs = "10">
                                <Collapse isOpen = {this.state.collapse}>
                                    <Card>
                                        <CardBody>
                                            Let the input sequences be X[0..m-1] and Y[0..n-1] of lengths m and n respectively. 
                                            And let L(X[0..m-1], Y[0..n-1]) be the length of LCS of the two sequences X and Y. 
                                            Following is the recursive definition of L(X[0..m-1], Y[0..n-1]).
                                            If last characters of both sequences match (or X[m-1] == Y[n-1]) then
                                            L(X[0..m-1], Y[0..n-1]) = 1 + L(X[0..m-2], Y[0..n-2])
                                            If last characters of both sequences do not match (or X[m-1] != Y[n-1]) then
                                            L(X[0..m-1], Y[0..n-1]) = MAX ( L(X[0..m-2], Y[0..n-1]), L(X[0..m-1], Y[0..n-2]) )
                                        </CardBody>
                                    </Card>
                                </Collapse>    
                            </Col>
                        </Row>
                        <hr />
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

Question.propTypes = {
    classes: PropTypes.object.isRequired
}

Question.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Question);