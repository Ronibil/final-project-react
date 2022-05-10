import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Navigate, NavigationType, useNavigate } from "react-router-dom";

export default function FCClassCard({ classToCard, type, ShowModaAreYouSure }) {
  const Navigate = useNavigate();

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
                  <Button
                    size="sm"
                    onClick={() =>
                      Navigate("/FCFormSuperDetails", {
                        state: classToCard.SuperStudentId,
                      })
                    }
                  >
                    {classToCard.SuperName}
                  </Button>
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
                    onClick={() => ShowModaAreYouSure(classToCard)}
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
                    onClick={() => {
                      Navigate("/FCFormSuperDetails", {
                        state: {
                          id:classToCard.SuperStudentId
                        }
                      });
                      console.log(classToCard.SuperStudentId);
                    }}
                  >
                    {classToCard.SuperName}
                  </Button>
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
  // if (type === "history") {
  //   return (
  //     <>
  //       <Card>
  //         <Card.Body>
  //           <Row>
  //             <Col xs={12}>
  //               <b>שם השיעור:</b> {classToCard.ClassName}
  //               <br />
  //               <b>תאריך:</b>{" "}
  //               {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
  //               <br />
  //               <b>שעת התחלה:</b> {classToCard.StartTime}
  //             </Col>
  //           </Row>
  //         </Card.Body>
  //       </Card>
  //     </>
  //   );
  // } else if (type === "studentFutre") {
  //   return (
  //     <>
  //       <Card>
  //         <Card.Body>
  //           <Row>
  //             <Col xs={2}>
  //               <Button
  //                 onClick={() => ShowModaAreYouSure(classToCard)}
  //                 variant="outline-danger"
  //               >
  //                 מחיקה
  //               </Button>
  //             </Col>
  //             <Col xs={2}>
  //               <Button
  //                 onClick={() => ShowModaAreYouSure(classToCard)}
  //                 variant="outline-primary"
  //               >
  //                 לצ'אט
  //               </Button>
  //             </Col>
  //             <Col xs={8}>
  //               <b>שם השיעור:</b> {classToCard.ClassName}
  //               <br />
  //               <b>תאריך:</b>{" "}
  //               {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
  //               <br />
  //               <b>שעת התחלה:</b> {classToCard.StartTime}
  //             </Col>
  //           </Row>
  //         </Card.Body>
  //       </Card>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <Card>
  //         <Card.Body>
  //           <Row>
  //             <Col xs={2}>
  //               <Button variant="secondary">עדכון</Button>
  //             </Col>
  //             <Col xs={2}>
  //               <Button
  //                 onClick={() => ShowModaAreYouSure(classToCard)}
  //                 variant="outline-danger"
  //               >
  //                 מחיקה
  //               </Button>
  //             </Col>
  //             <Col xs={8}>
  //               <b>שם השיעור:</b> {classToCard.ClassName}
  //               <br />
  //               <b>תאריך:</b>{" "}
  //               {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
  //               <br />
  //               <b>שעת התחלה:</b> {classToCard.StartTime}
  //             </Col>
  //           </Row>
  //         </Card.Body>
  //       </Card>
  //     </>
  //   );
  // }
}
