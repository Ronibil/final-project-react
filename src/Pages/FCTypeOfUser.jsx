<<<<<<< Updated upstream
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
=======
import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function FCTypeOfUser() {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: "center",
      paddingTop: 120
    }}>
      <h1>?מי תרצו להיות</h1>
      <h4> :בחרו את מטרת השימוש שלכם באפליקציה</h4><br /><br />
      <div>
        <Button variant="outline-primary" onClick={() => navigate("/StudentRequestPage")}>
          סטודנט
        </Button>
        <br />
        <br />
        <Button variant="outline-primary" onClick={() => navigate("/SuperStudentRequestPage")}>
          סופר סטודנט (מורה פרטי)
        </Button>
      </div>
    </div>
  )
>>>>>>> Stashed changes
}
