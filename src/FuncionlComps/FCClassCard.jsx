import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FCClassCard({
  classToCard,
  type,
  ShowModaAreYouSure,
  btnFunction,
  studentDetails,
}) {
  const navigate = useNavigate();
  switch (type) {
    case "history":
      return (
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
      );
    case "studentFutre":
      return (
        <Card>
          <Card.Body>
            <Row className="d-flex align-items-center">
              <Col xs={2}>
                <Button
                  size="sm"
                  onClick={() => ShowModaAreYouSure(classToCard)}
                  variant="outline-danger"
                >
                  מחיקה
                </Button>
              </Col>
              <Col xs={2}>
                <Button size="sm" variant="outline-primary">
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
                {studentDetails !== undefined ?
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate("/ShowProfileSuperStudent", {
                        state: {classToCard ,studentDetails}
                      })
                    }
                  >
                    {classToCard.SuperName}
                  </Button>
                  :
                  ""}

              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    case "Futre":
      return (
        <Card className="m-1">
          <Card.Body className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              {classToCard.NumOfRegistered > 0 ?
                <Button
                  size="sm"
                  onClick={() => ShowModaAreYouSure(classToCard)}
                  variant="outline-danger"
                >
                  מחיקה
                </Button>
                :
                <>
                  {studentDetails !== undefined ?
                    <Button variant="secondary" size="sm"
                      onClick={() => navigate("/UpdateSuperClassPage", { state: { classToCard, studentDetails } })}
                    >
                      עדכון
                    </Button>
                    :
                    ""}

                  <Button
                    size="sm"
                    onClick={() => ShowModaAreYouSure(classToCard)}
                    variant="outline-danger"
                  >
                    מחיקה
                  </Button>
                </>
              }

            </div>
            <div className="text-end">
              <b>שם השיעור:</b> {classToCard.ClassName}
              <br />
              <b>תאריך:</b>{" "}
              {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
              <br />
              <b>שעת התחלה:</b> {classToCard.StartTime}
            </div>
          </Card.Body>
        </Card>
      );
    case "SearchClass":
      return (
        <>
          <Card
            className="m-2"
            style={{
              backgroundColor: "#FFF5EE",
            }}
          >
            <Card.Body className="d-flex align-items-center flex-column justify-content-between">
              <Card.Title>{classToCard.ClassName}</Card.Title>
              <Card.Text>תיאור: {classToCard.ClassDescription}</Card.Text>
              <Card.Text>
                תאריך:{" "}
                {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}
              </Card.Text>
              <Card.Text>שעת התחלה: {classToCard.StartTime}</Card.Text>
              <Card.Text>שעת סיום: {classToCard.EndTime}</Card.Text>
              <Card.Text>
                מספר משתתפים: {classToCard.NumOfParticipants}
              </Card.Text>
              <Row>
                <Col>
<<<<<<< HEAD
                  {studentDetails !== undefined ?
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        navigate("/ShowProfileSuperStudent", {
                          state: { classToCard, studentDetails }
                        })
                      }
                    >
                      {classToCard.SuperName}
                    </Button>
                    :
                    ""}

=======
                  <Button
                    className="badge rounded-pill bg-primary"
                    // variant="outline-primary"
                    onClick={() =>
                      navigate("/ShowProfileSuperStudent", {
                        state: classToCard.SuperStudentId,
                      })
                    }
                  >
                    {classToCard.SuperName}
                  </Button>
>>>>>>> parent of c3732a7 (Revert "css changes")
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  {classToCard.NumOfParticipants - classToCard.NumOfRegistered > 0 ? (
                    <Button
                      onClick={() => btnFunction(classToCard.ClassCode)}
                      variant="success"
                    >
                      הרשמה
                    </Button>
                  ) : (
                    <b>לא נותרו מקומות</b>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
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
}
