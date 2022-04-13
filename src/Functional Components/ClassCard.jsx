import React from "react";
import { Card, Button } from "react-bootstrap";

export default function ClassCard({ classes, register }) {
  let classList = classes.map((classItem, index) => (
    <Card style={{ maxWidth: 1000, margin: 20 }} key={index}>
      <Card.Body>
        <Card.Title>{classItem.ClassName}</Card.Title>
        <Card.Text>תיאור: {classItem.ClassDescription}</Card.Text>
        <Card.Text>תאריך: {classItem.ClassDate}</Card.Text>
        <Card.Text>שעת התחלה: {classItem.StartTime}</Card.Text>
        <Card.Text>שעת סיום: {classItem.EndTime}</Card.Text>
        <Card.Text>מספר משתתפים: {classItem.NumOfParticipants}</Card.Text>
        <Card.Text> {classItem.SuperName}</Card.Text>

        <Button onClick={() => register(classItem.ClassCode)} variant="success">
          הרשמה
        </Button>
      </Card.Body>
    </Card>
  ));

  return <div>{classList}</div>;
}
