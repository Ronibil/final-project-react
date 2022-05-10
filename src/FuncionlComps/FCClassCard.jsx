import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

export default function FCClassCard({ classToCard, type, ShowModaAreYouSure }) {
  if (type === "history") {
    return (
      <>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={12}>
                <b>שם השיעור:</b> {classToCard.ClassName}
                <br />
                <b>תאריך:</b>{" "}
                {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
                <br />
                <b>שעת התחלה:</b> {classToCard.StartTime}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    );
  } else if (type === "studentFutre") {
    return (
      <>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={2}>
                <Button
                  onClick={() => ShowModaAreYouSure(classToCard)}
                  variant="outline-danger"
                >
                  מחיקה
                </Button>
              </Col>
              <Col xs={2}>
                <Button
                  onClick={() => ShowModaAreYouSure(classToCard)}
                  variant="outline-primary"
                >
                  לצ'אט
                </Button>
              </Col>
              <Col xs={8}>
                <b>שם השיעור:</b> {classToCard.ClassName}
                <br />
                <b>תאריך:</b>{" "}
                {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
                <br />
                <b>שעת התחלה:</b> {classToCard.StartTime}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={2}>
                <Button variant="secondary">עדכון</Button>
              </Col>
              <Col xs={2}>
                <Button
                  onClick={() => ShowModaAreYouSure(classToCard)}
                  variant="outline-danger"
                >
                  מחיקה
                </Button>
              </Col>
              <Col xs={8}>
                <b>שם השיעור:</b> {classToCard.ClassName}
                <br />
                <b>תאריך:</b>{" "}
                {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
                <br />
                <b>שעת התחלה:</b> {classToCard.StartTime}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    );
  }
}
