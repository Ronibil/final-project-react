import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FCTypeOfUser() {
  return (
    <Container>
      <Row>
        <h2 style={{ textAlign: "center" }}>?מי תרצו להיות</h2>
      </Row>
      <Row>
        <h4 style={{ textAlign: "center" }}>
          {" "}
          :בחרו את מטרת השימוש שלכם באפליקציה
        </h4>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <Link to="/StudentRequest">
            <Button variant="outline-primary" size="lg">
              סטודנט
            </Button>
          </Link>
        </Col>
        <Col xs lg="6">
          <Link to="/SuperRequest">
            <Button variant="outline-primary" size="lg">
              סופר סטודנט (מורה פרטי)
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
