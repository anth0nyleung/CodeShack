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


class Signup extends Component {
    state = {};

    componentDidMount() {
        // Sets the title of the page
        document.title = "Signup";
    }

    render() {
        return(
        <div>
            <main>
            <Jumbotron>
                <Container>
                    <h3 className="display-3">Sign up</h3>
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
                        <Label for="username" sm={2}>Username</Label>
                        <Col sm={10}>
                        <Input type="username" name="username" id="username" placeholder="Enter a username" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="name" sm={2}>Name</Label>
                        <Col sm={10}>
                        <Input type="name" name="name" id="name" placeholder="Enter your name" />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="year">Year</Label>
                        <Input type="select" name="year" id="year">
                            <option>Freshman</option>
                            <option>Sophomore</option>
                            <option>Junior</option>
                            <option>Senior</option>
                            <option>Graduate</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="currentCourse">Current Course</Label>
                        <Input type="select" name="currentCourse" id="currentCourse" multiple>
                            <option>CS200</option>
                            <option>CS300</option>
                            <option>CS400</option>
                            <option>CS240</option>
                            <option>CS354</option>
                            <option>CS577</option>
                        </Input>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </Container>
            </main>
        </div>
        )
    }
}

export default Signup;
