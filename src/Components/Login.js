import React, {Component} from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/actions";
import { push } from "connected-react-router";
import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

const mapStateToProps = state => {
    return {
        user: state.user.user,
        loginError: state.user.loginError,
        isAuth: state.user.isAuth
    };
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
        };
    }

    onRegister = () => {
        this.context.router.history.push("/signup");
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    onSignIn = e => {
        this.props.loginUser({
            username: this.state.username,
        });
        e.preventDefault();
    };

    renderRedirect = e => {
        if (this.props.isAuth) {
            this.context.router.history.push("/");
        }
    };

    onRedirect = () => {
        this.context.router.history.push("/");
    };

    validateForm = () => {
        return true;
    };


    render() {
        const { classes } = this.props;

        return(
        <div>
            <main>
            <Jumbotron>
                <Container>
                    <h3 className="display-3">Log in</h3>
                    <hr className="my-2" />
                </Container>
            </Jumbotron>
            <Container>
                <Form>
                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                        <Input type="email" name="email" id="email" placeholder="Enter your email" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Password</Label>
                        <Col sm={10}>
                        <Input type="password" name="password" id="password" placeholder="Enter your password" />
                        </Col>
                    </FormGroup>
                    <Col sm={10}><Button>Submit</Button></Col>
                    <Col sm={10}><Button fullWidth onClick={this.onRegister} >Sign up</Button></Col>
                </Form>
            </Container>
            </main>

        </div>
        )
    }
}

export default Login;