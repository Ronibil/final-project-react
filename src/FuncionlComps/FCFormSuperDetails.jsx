import React from "react";
import { Card, Container,Row,Col } from "react-bootstrap";
import { FaUserEdit,FaUserTimes } from "react-icons/fa";
const emptyImage =
  "https://proj.ruppin.ac.il/bgroup92/prod/ImageFiles/ProfileImage-empty.jpg";

export default function FCFormSuperDetails({ superDetails, ShowModal,ShowModalDelete }) {
  let profileSuperImage = `https://proj.ruppin.ac.il/bgroup92/prod/ImageFiles/ProfileImage-${superDetails.ImagePath}.jpg`;
  return (
    <Container
      className="d-flex justify-content-center"
      style={{ maxWidth: "700px"}}
    >
      <Card
        style={{
          borderRadius: 25,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <Card.Img
          variant="top"
          style={{
            alignSelf: "center",
            height: "140px",
            width: "140px",
            marginTop: 10,
            borderRadius: "50%",
            border: "solid 6px white",
          }}
          src={superDetails.ImagePath !==undefined? profileSuperImage : emptyImage}
          alt={emptyImage}
        />
        <Row>
          <Col xs={6}>
        <FaUserEdit
          onClick={ShowModal}
          style={{
            width: 25,
            height: 25,            
            background: "white",
            marginLeft:35,
            borderRadius: 50,
          }}
        />
        </Col>
        <Col xs={6}>
          {superDetails.ImagePath!==undefined && superDetails.ImagePath!=='empty'?<><FaUserTimes
          onClick={ShowModalDelete}
          style={{
            width: 25,
            height: 25,
            marginLeft:25,
            background: "white",
            borderRadius: 50,
          }}/></>:''}
          </Col>
          </Row>
            <Card.Body align="center">
              <Card.Title>{superDetails.FullName}</Card.Title>
              <Card.Text>
                {superDetails.StudyYear} <b>:סטודנט שנה</b>
                <br />
                <b>מסלול לימודים:</b> {superDetails.DepartmentName}
              </Card.Text>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <b>דירוג</b>
                  {superDetails.RankAverage}/5
                </div>
                <div className="d-flex flex-column">
                  <b>מדרגים</b>
                  {superDetails.NumOfRanks}
                </div>
                <div className="d-flex flex-column">
                  <b>מספר שיעורים</b>
                  {superDetails.NumOfClass}
                </div>
              </div>
              <hr />
              <Card.Text>
                <b>:קצת עלי</b>
                <br />
                {superDetails.Description}
              </Card.Text>
            </Card.Body>
      </Card>
    </Container>
  );
}
