import React, {Component} from "react"
import {
    Row,
    Col,
    Button,
    Jumbotron,
    Container,
    Form,
    FormGroup,
    ListGroup,
    Label,
    Input,
    ListGroupItem
} from "reactstrap";


class Login extends Component {
    state = {};

    componentDidMount() {
        // Sets the title of the page
        document.title = "Dashboard";
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
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col sm={10}>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Password</Label>
                        <Col sm={10}>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
            </main>

        </div>
        )
    }
}

export default Login;
