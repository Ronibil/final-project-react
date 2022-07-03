import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FCStarsToReturn from "./FCStarsToReturn";

export default function FCClassCard({
  classToCard,
  type,
  ShowModaAreYouSure,
  btnFunction,
  studentDetails,
  ShowModalStarsBtn,
  RegistrationPoint,
}) {
  const navigate = useNavigate();
  switch (type) {
    case "history":
      return (
        <Card
          style={{
            width: "98%",
            marginTop: 4,
            backgroundColor: "rgba(208, 201, 192, 0.8)",
            marginLeft: 4,
            borderRadius: 20,
            border: "solid #7F8487 1px",
          }}
        >
          <Card.Body className="text-end">
            <Row>
              <Col xs={4} style={{ alignSelf: "center" }}>
                {(classToCard.RankResults != null && classToCard.RankResults.length > 0) ? (
                  <>
                    5 / {classToCard.RankResults[0].RankValue} <b>:דירוג</b>
                  </>
                ) : (
                  ""
                )}
              </Col>
              <Col xs={8}>
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
        <Card
          style={{
            width: "98%",
            marginTop: 4,
            backgroundColor: "rgba(218, 234, 241, 0.8)",
            marginLeft: 4,
            borderRadius: 20,
            border: "solid #1C658C 1px",
          }}
        >
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
                  style={{ background: "#A2D5AB", border: "solid #4B8673 1px" }}
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
        <Card
          style={{
            width: "98%",
            marginTop: 4,
            backgroundColor: "rgba(218, 234, 241, 0.9)",
            marginLeft: 4,
            borderRadius: 20,
            border: "solid #1C658C 1px",
          }}
        >
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
              <b>תיאור:</b> {classToCard.ClassDescription}
              <br />
              <b>תאריך:</b>{" "}
              {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
              <br />
              <b>שעת התחלה:</b> {classToCard.StartTime}
              <br />
              <b>:תגיות השיעור</b>
              <br />
              {classToCard.Tags.map((t) => (
                <span className="badge rounded-pill bg-primary">{t}</span>
              ))}
            </div>
          </Card.Body>
        </Card>
      );
    case "SearchClass":
      return (
        <>
          <Card
            style={{
              width: "98%",
              marginTop: 4,
              backgroundColor: "rgba(218, 234, 241, 0.9)",
              marginLeft: 4,
              borderRadius: 20,
              border: "solid #1C658C 1px",
            }}
          >
            <Card.Body className="w-100 d-flex align-items-center justify-content-between">
              <div>
                {classToCard.NumOfParticipants - classToCard.NumOfRegistered >
                  0 ? (
                  <Button
                    onClick={() =>
                      btnFunction(classToCard.ClassCode, RegistrationPoint)
                    }
                    style={{
                      borderRadius: 15,
                      background: "#A2D5AB",
                      border: "solid #4B8673 2px",
                    }}
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
                <b>תיאור:</b> {classToCard.ClassDescription}
                <br />
                <b>תאריך:</b>{" "}
                {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
                <br />
                <b>שעת התחלה:</b> {classToCard.StartTime}
                <br />
                <b>:תגיות השיעור</b>
                <br />
                <b>
                  {classToCard.Tags.map((t) => (
                    <span className="badge rounded-pill bg-primary">{t}</span>
                  ))}
                </b>
                {studentDetails !== undefined ? (
                  <>
                    <br />
                    <FCStarsToReturn
                      numbersOfStars={classToCard.SuperStudentRank}
                    />{" "}
                    <b>:דירוג</b>
                    <Button
                      className="badge rounded-pill"
                      style={{
                        background: "#A2D5AB",
                        border: "solid #4B8673 2px",
                        marginLeft: 8,
                      }}
                      size="sm"
                      onClick={() =>
                        navigate("/ShowProfileSuperStudent", {
                          state: { classToCard, studentDetails, type: 1 },
                        })
                      }
                    >
                      {classToCard.SuperName}
                    </Button>
                  </>
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
        <Card
          style={{
            width: "98%",
            marginTop: 4,
            backgroundColor: "rgba(208, 201, 192, 0.8)",
            marginLeft: 4,
            borderRadius: 20,
            border: "solid #7F8487 1px",
          }}
        >
          <Card.Body className="w-100 d-flex align-items-center justify-content-between">
            <div>
              {classToCard.RankResults[0].RankValue === 0 ? (
                <Button
                  className="m-1"
                  size="sm"
                  onClick={() => ShowModalStarsBtn(classToCard.ClassCode)}
                  variant="outline-primary"
                >
                  דירוג
                </Button>
              ) : (
                ""
              )}
              <br />
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
