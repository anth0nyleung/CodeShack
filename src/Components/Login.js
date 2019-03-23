import React, {Component} from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
    Col,
    Button,
    Jumbotron,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

const styles = theme => ({});

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
        console.log('Pressed')
        this.context.router.history.push("/signup");
    };

    render() {
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
                    <Button>Submit</Button>
                    <Button fullWidth onClick={this.onRegister} >Sign up</Button>
                </Form>
            </Container>
            </main>

        </div>
        )
    }
}

export default Login;
