import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../StyleSheets/btnSuperStyle.css";

export default function FCButtonsForSuperHomePage({
  UserDetails,
  superName,
  DepartmentName,
  Description,
  StudyYear,
  HistoryClass,
  FutreClass,
}) {
  const navigate = useNavigate();
  const superDetails = {
    superEmail: UserDetails.Email,
    superPassword: UserDetails.Password,
    superName: superName,
    superId: UserDetails.StudentId
  };

  const superDetailsForUpdateProfile = {
    superEmail: UserDetails.Email,
    superPassword: UserDetails.Password,
    DepartmentName: DepartmentName,
    Description: Description,
    StudyYear: StudyYear,
  };

  const superDetailsForHistoryClass = {
    superEmail: UserDetails.Email,
    superPassword: UserDetails.Password,
    HistoryClass: HistoryClass,
  };

  const superDetailsForFutreClass = {
    superEmail: UserDetails.Email,
    superPassword: UserDetails.Password,
    FutreClass: FutreClass,
  };

  return (
    <Container style={{ flexDirection: "row", maxWidth: "700px" }} >
      <Card style={{backgroundColor: "rgba(0, 0, 0, 0)"}}>
        <Card.Body align="center">
          <Row>
            <Col xs={6}>
              <Button
                className="btnSuper"
                onClick={() =>
                  navigate("/FutreClasses", { state: superDetailsForFutreClass })
                }
              >
                שיעורים עתידיים שלי
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                className="btnSuper"
                onClick={() =>
                  navigate("/CreateNewClass", { state: superDetails })
                }
                style={{ backgroundColor: "#90EE90" }}
              >
                + יצירת שיעור חדש
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={6}>
              <Button
                className="btnSuper"
                onClick={() =>
                  navigate("/UpdateProfileSuper", {
                    state: superDetailsForUpdateProfile,
                  })
                }
              >
                עריכת הפרופיל שלי
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                className="btnSuper"
                onClick={() =>
                  navigate("/HistoryClassSuper", {
                    state: superDetailsForHistoryClass,
                  })
                }
              >
                היסטורית שיעורים
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
