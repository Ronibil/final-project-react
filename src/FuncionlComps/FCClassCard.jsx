import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function FCClassCard({ classToCard, type }) {
  {
    if (type === "history") {
      return (
        <>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <b>שם השיעור:</b> {classToCard.ClassName}
                  <br />
                  <b>תאריך:</b> {classToCard.ClassDate} <br />
                  <b>שעת התחלה:</b> {classToCard.StartTime}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      );
    } else {
      return (
        <div>
          <h1>aaaaaaaa</h1>
        </div>
      );
    }
  }
}
