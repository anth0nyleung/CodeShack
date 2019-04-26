import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";

class Footer extends Component {
    render() {
        return (
            <footer style={{ marginBottom: "32px" }}>
                <Container>
                    <hr />
                    <Row>
                        <Col>
                            <p>&copy; CodeShack 2019</p>
                        </Col>
                        <Col xs="auto">
                            <a href="/help">FAQ</a>
                        </Col>
                        <Col xs="auto">
                            <a href="/">About us</a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}

export default Footer;
