import React, {Component} from "react"
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


class Login extends Component {
    state = {};

    componentDidMount() {
        // Sets the title of the page
        document.title = "Login ";
    }

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
                    <Button>Sign up</Button>
                </Form>
            </Container>
            </main>

        </div>
        )
    }
}

export default Login;
