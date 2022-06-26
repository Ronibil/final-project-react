import React from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { FaUserEdit } from 'react-icons/fa'
const emptyImage = 'https://proj.ruppin.ac.il/bgroup92/prod/ImageFiles/ProfileImage-empty.jpg';


export default function FCFormSuperDetails({ superDetails, ShowModal }) {

  
  let profileSuperImage = `https://proj.ruppin.ac.il/bgroup92/prod/ImageFiles/ProfileImage-${superDetails.ImagePath}.jpg`;
  return (
    <Container style={{ flexDirection: "row", maxWidth: "700px" }}>
      <Card style={{ borderRadius: 25, backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
        <Card.Img
          variant="top"
          style={{ alignSelf: "center", height: "140px", width: "120px", marginTop: 10, borderRadius: 70, border: "solid 6px white" }}
          src={profileSuperImage ? profileSuperImage : emptyImage}
          alt={emptyImage}
        />
        <FaUserEdit onClick={ShowModal} style={{ width: 25, height: 25, alignSelf: "center",marginRight:65, background: "white", borderRadius: 50}} />
        <Card.Body align="center">
          <Card.Title>{superDetails.FullName}</Card.Title>
          <Card.Text>
            {superDetails.StudyYear} <b>:סטודנט שנה</b>
            <br />
            <b>מסלול לימודים:</b> {superDetails.DepartmentName}
          </Card.Text>
          <hr />
          <Row>
            <Col xs={4}>
              <b>דירוג</b>
              <br />
              {superDetails.RankAverage}/5
            </Col>
            <Col xs={4}>
              <b>מדרגים</b>
              <br />
              {superDetails.NumOfRanks}
            </Col>
            <Col xs={4}>
              <b>מספר שיעורים</b>
              <br /> {superDetails.NumOfClass}{" "}
            </Col>
          </Row>
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
