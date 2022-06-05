import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

const mockupImage =
  "data:image/jpeg;base64,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";

export default function FCFormSuperDetails({ superDetails }) {
  return (
    <Container style={{ flexDirection: "column", maxWidth: "700px" }}>
      <Card style={{ borderRadius: 25, width: "100%", marginTop: 25, marginBottom: 20 }}>
        <Card.Img
          variant="top"
          style={{ alignSelf: "center", height: "40%", width: "40%", marginTop: 15 }}

          src={mockupImage}
        />
        <Card.Body align="center">
          <Card.Title>{superDetails.FullName}</Card.Title>
          <Card.Text>
            {superDetails.StudyYear} <b>:סטודנט שנה</b>
            <br />
            <b>מסלול לימודים:</b> {superDetails.DepartmentName}
          </Card.Text>
          <hr />
          <Row>
            <Col xs={4}>
              <b>דירוג</b>
              <br />
              {superDetails.RankAverage}/5
            </Col>
            <Col xs={4}>
              <b>מדרגים</b>
              <br />
              {superDetails.NumOfRanks}
            </Col>
            <Col xs={4}>
              <b>מספר שיעורים</b>
              <br /> {superDetails.NumOfClass}{" "}
            </Col>
          </Row>
          <hr />
          <Card.Text>
            <b>:קצת עלי</b>
            <br />
            {superDetails.Description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
