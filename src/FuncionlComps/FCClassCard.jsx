import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FCClassCard({
  classToCard,
  type,
  ShowModaAreYouSure,
  btnFunction,
  studentDetails,
  ShowModalStarsBtn
}) {
  const navigate = useNavigate();
  switch (type) {
    case "history":
      return (
        <Card className="m-1">
          <Card.Body className="text-end">
            <b>שם השיעור:</b> {classToCard.ClassName}
            <br />
            <b>תאריך:</b>{" "}
            {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")} <br />
            <b>שעת התחלה:</b> {classToCard.StartTime}
            <br />
          </Card.Body>
        </Card>
      );
    case "studentFutre":
      return (
        <Card style={{ width: "98%", marginTop: 4, background: "#DAEAF1", marginLeft: 4, borderRadius: 20, border: "solid #1C658C 1px" }}>
          <Card.Body className="w-100 d-flex align-items-center justify-content-between">
            <div>
              <Button
                className="m-1"
                size="sm"
                onClick={() => ShowModaAreYouSure(classToCard)}
                variant="outline-danger"
              >
                מחיקה
              </Button>
              <Button className="m-1" size="sm" variant="outline-primary">
                לצ'אט
              </Button>
            </div>
            <div className="text-end">
              <b>שם השיעור:</b> {classToCard.ClassName}
              <br />
              <b>תאריך:</b>{" "}
              {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
              <br />
              <b>שעת התחלה:</b> {classToCard.StartTime}
              {studentDetails !== undefined ? (
                <Button
                  className="badge rounded-pill"
                  style={{ background: "#4B8673", border: "solid #4B8673 2px" }}
                  size="sm"
                  onClick={() =>
                    navigate("/ShowProfileSuperStudent", {
                      state: { classToCard, studentDetails },
                    })
                  }
                >
                  {classToCard.SuperName}
                </Button>
              ) : (
                ""
              )}
            </div>
          </Card.Body>
        </Card>
      );
    case "Futre":
      return (
        <Card className="m-1">
          <Card.Body className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              {classToCard.NumOfRegistered > 0 ? (
                <Button
                  size="sm"
                  onClick={() => ShowModaAreYouSure(classToCard)}
                  variant="outline-danger"
                >
                  מחיקה
                </Button>
              ) : (
                <>
                  {studentDetails !== undefined ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        navigate("/UpdateSuperClassPage", {
                          state: { classToCard, studentDetails },
                        })
                      }
                    >
                      עדכון
                    </Button>
                  ) : (
                    ""
                  )}

                  <Button
                    size="sm"
                    onClick={() => ShowModaAreYouSure(classToCard)}
                    variant="outline-danger"
                  >
                    מחיקה
                  </Button>
                </>
              )}
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
          <Card style={{ width: "98%", marginTop: 4, background: "#DAEAF1", marginLeft: 4, borderRadius: 20, border: "solid #1C658C 1px" }}>
            <Card.Body className="w-100 d-flex align-items-center justify-content-between">
              <div>
                {classToCard.NumOfParticipants - classToCard.NumOfRegistered >
                  0 ? (
                  <Button
                    onClick={() => btnFunction(classToCard.ClassCode)}
                    style={{ borderRadius: 15, background: "#A2D5AB", border: "solid #4B8673 2px" }}
                  >
                    הרשמה
                  </Button>
                ) : (
                  <b>לא נותרו מקומות</b>
                )}
              </div>
              <div className="text-end">
                <b>שם השיעור:</b> {classToCard.ClassName}
                <br />
                <b>תאריך:</b>{" "}
                {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
                <br />
                <b>שעת התחלה:</b> {classToCard.StartTime}
                {studentDetails !== undefined ? (
                  <Button
                    className="badge rounded-pill"
                    style={{ background: "#A2D5AB", border: "solid #4B8673 2px" }}
                    size="sm"
                    onClick={() =>
                      navigate("/ShowProfileSuperStudent", {
                        state: { classToCard, studentDetails, type: 1 },
                      })
                    }
                  >
                    {classToCard.SuperName}
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </Card.Body>
          </Card>
        </>
      );
    case "studentHistory":
      return (
        <Card style={{ width: "98%", marginTop: 4, background: "#D0C9C0", marginLeft: 4, borderRadius: 20, border: "solid #7F8487 1px" }}>
          <Card.Body className="w-100 d-flex align-items-center justify-content-between">
            <div>
              <Button
                className="m-1"
                size="sm"
                onClick={() => ShowModalStarsBtn(classToCard.ClassCode)}
                variant="outline-primary"
              >
                דירוג
              </Button><br />
              <Button className="m-1" size="sm" variant="outline-primary">
                לצ'אט
              </Button>
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
