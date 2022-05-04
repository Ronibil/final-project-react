import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

export default function FCClassCard({ classToCard, type}) {
  return (
    <div>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={12}><b>שם השיעור:</b> {classToCard.ClassName}<br /><b>תאריך:</b> {classToCard.ClassDate}  <br /><b>שעת התחלה:</b> {classToCard.StartTime}</Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
