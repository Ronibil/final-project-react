import React from 'react'
import FCFormSuperDetails from '../FuncionlComps/FCFormSuperDetails'
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from "react-bootstrap";
import FCShowProfileSuperBtns from '../FuncionlComps/FCShowProfileSuperBtns';

export default function FCShowProfileSuperStudent() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [superDetails, setSuperDetails] = useState();
  const [futureClassesSuper, setfutureClassesSuper] = useState();

  const superId = state.classToCard.SuperStudentId;
  const studentDetails = state.studentDetails;
  const StudentDetails = {
    Email: state.studentDetails.Email,
    Password: state.studentDetails.Password
  }

  useEffect(() => {
    const url = `http://localhost:49812/SuperStudent/ShowSuperDetailsById/${superId}`
    console.log(superId);
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (data) => {
          console.log(data);
          setSuperDetails({
            StudentId: data.StudentId,
            FullName: data.FullName,
            Image: null,
            Description: data.Description,
            DepartmentName: data.DepartmentName,
            StudyYear: data.StudyYear,
            NumOfRanks: data.NumOfRanks,
            RankAverage: data.RankAverage,
            NumOfClass: data.FutreClasses.length,
          });
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, []);

  const BackToStudentHomePage = () => {
    navigate("/studentHomePage", { state: StudentDetails });
  }
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        marginTop: 50,
      }}
    >
      {superDetails != undefined ? (
        <>
          <div>
            <FCFormSuperDetails superDetails={superDetails} />
            <FCShowProfileSuperBtns />
            <Row>
              <Col xs={12}>
                <Button
                  variant="outline-primary"
                  onClick={BackToStudentHomePage}
                >
                  חזרה לדף הבית
                </Button>
              </Col>
            </Row>
          </div>
        </>
      ) :
        ("")
      }
    </Container>
  )
}
