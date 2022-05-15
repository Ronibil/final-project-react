import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function FCClassCard({ classToCard, type, ShowModaAreYouSure, btnFunction, studentDetails }) {
  const navigate = useNavigate();
  // const DetailsForShowProfileSuperStudent = null;
  // if (studentDetails != undefined) {
  //   let DetailsForShow = {
  //     superStudentId: classToCard.SuperStudentId,
  //     Email: studentDetails.Email,
  //     Password: studentDetails.Password
  //   }
  // }
  switch (type) {
    case "history":
      return (
        <>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={12} style={{ display: "block", textAlign: "right" }}>
                  <b>שם השיעור:</b> {classToCard.ClassName}
                  <br />
                  <b>תאריך:</b>{" "}
                  {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
                  <br />
                  <b>שעת התחלה:</b> {classToCard.StartTime}
                  <br />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      );
    case "studentFutre":
      return (
        <>
          <Card>
            <Card.Body>
              <Row className="d-flex align-items-center">
                <Col xs={2}>
                  <Button
                    size="md"
                    onClick={() => ShowModaAreYouSure(classToCard)}
                    variant="outline-danger"
                  >
                    מחיקה
                  </Button>
                </Col>
                <Col xs={2}>
                  <Button
                    size="md"
                    variant="outline-primary"
                  >
                    לצ'אט
                  </Button>
                </Col>
                <Col xs={8} style={{ display: "block", textAlign: "right" }}>
                  <b>שם השיעור:</b> {classToCard.ClassName}
                  <br />
                  <b>תאריך:</b>{" "}
                  {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
                  <br />
                  <b>שעת התחלה:</b> {classToCard.StartTime}
                  <br />
                  <Button
                    size="sm"
                    onClick={() => navigate("/ShowProfileSuperStudent", { state: classToCard.SuperStudentId })}
                  >
                    {classToCard.SuperName}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      );
    case "Futre":
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
    case "SearchClass":
      return (
        <>
          <Card
            style=
            {
              {
                width: "50%",
                backgroundColor: "#FFF5EE"
              }
            }>
            <Card.Body>
              <Card.Title>{classToCard.ClassName}</Card.Title>
              <Card.Text>תיאור: {classToCard.ClassDescription}</Card.Text>
              <Card.Text>
                תאריך: {new Date(classToCard.ClassDate).toLocaleDateString('en-GB')}
              </Card.Text>
              <Card.Text>שעת התחלה: {classToCard.StartTime}</Card.Text>
              <Card.Text>שעת סיום: {classToCard.EndTime}</Card.Text>
              <Card.Text>מספר משתתפים: {classToCard.NumOfParticipants}</Card.Text>
              <Row>
                <Col>
                  <Button variant="outline-primary" 
                  onClick={() => navigate("/ShowProfileSuperStudent", { state: classToCard.SuperStudentId })}
                  >
                    {classToCard.SuperName}
                  </Button>
                </Col>
              </Row><br />
              <Row>
                <Col>
                  <Button onClick={() => btnFunction(classToCard.ClassCode)} variant="success">
                    הרשמה
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card><br />
        </>
      );
    default:
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
};
