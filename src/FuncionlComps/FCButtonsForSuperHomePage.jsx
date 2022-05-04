import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../StyleSheets/btnSuperStyle.css";

export default function FCButtonsForSuperHomePage({
  UserDetails,
  superName,
  DepartmentName,
  Description,
  StudyYear,
  HistoryClass,
}) {
  const navigate = useNavigate();
  const superDetails = {
    superEmail: UserDetails.Email,
    superPassword: UserDetails.Password,
    superName: superName,
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

  return (
    <div>
      <Card xs={12} style={{ width: "30rem" }}>
        <Card.Body align="center">
          <Row>
            <Col xs={6}>
              <Button className="btnSuper">שיעורים עתידיים שלי</Button>
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
    </div>
  );
}
