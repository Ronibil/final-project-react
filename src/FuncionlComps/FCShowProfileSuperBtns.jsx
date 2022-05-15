import React from 'react'
import { Card, Row, Col, Button } from "react-bootstrap";

export default function FCShowProfileSuperBtns() {
  return (
    <Card xs={12} style={{ width: "30rem" }}>
      <Card.Body align="center">
        <Row>
          <Col xs={12}>
            <Button
              variant="outline-primary"
            >
              <b>בקשה ליצירת קשר</b>
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              variant="outline-primary"
            >
              <b>צפייה בשיעורים של </b>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
