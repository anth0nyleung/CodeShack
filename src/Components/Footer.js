import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";

class Footer extends Component {
    render() {
        return (
            <footer style={{ marginBottom: "32px" }}>
                <Container>
                    <hr />
                    <Row>
                        <Col xs="4">
                            <p>&copy; CodeShack 2019</p>
                        </Col>
                        <Col>
                            <a href="/help">FAQ</a>
                            <br />
                            <a href="/">About us</a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}

export default Footer;
