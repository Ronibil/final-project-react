import React from "react";
import FCFormSuperDetails from "../FuncionlComps/FCFormSuperDetails";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import FCShowProfileSuperBtns from "../FuncionlComps/FCShowProfileSuperBtns";
import { AiOutlineHome } from "react-icons/ai";
import LogoComponent from "../Elements/LogoComponent";
import FCBurgerComp from "../FuncionlComps/FCBurgerComp";

export default function FCShowProfileSuperStudent() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [superDetails, setSuperDetails] = useState();

  const superId = state.classToCard.SuperStudentId;
  // const studentDetails = state.studentDetails;
  const StudentDetails = {
    Email: state.studentDetails.Email,
    Password: state.studentDetails.Password,
    StudentId: state.studentDetails.StudentId,
  };

  useEffect(() => {
    const url = `http://localhost:49812/SuperStudent/ShowSuperDetailsById/${superId}`;
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
            ImagePath: data.ImagePath,
            Description: data.Description,
            DepartmentName: data.DepartmentName,
            StudyYear: data.StudyYear,
            NumOfRanks: data.NumOfRanks,
            RankAverage: data.RankAverage,
            NumOfClass: data.FutreClasses.length,
            FutreClasses: data.FutreClasses,
            Phone: data.Phone,
          });
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, [superId]);

  const BackToStudentHomePage = () => {
    navigate("/studentHomePage", { state: StudentDetails });
  };
  const BackToSearchClassesPage = () => {
    navigate("/searchClassesPage", { state: StudentDetails });
  };
  return (
    <Container className="d-flex flex-column mw-700 align-items-center">
      <LogoComponent style={{ alignSelf: "center" }} />
      <FCBurgerComp userDetails={state.studentDetails} />
      {superDetails !== undefined ? (
        <>
          <FCFormSuperDetails superDetails={superDetails} />
          <FCShowProfileSuperBtns
            StudentDetails={StudentDetails}
            FutreClasses={superDetails.FutreClasses}
            Phone ={superDetails.Phone}
          />
          {state.type === 1 ? (
            <Button
              className="mb-3 mt-auto"
              variant="outline-primary"
              onClick={BackToSearchClassesPage}
            >
              חזרה לחיפוש שיעור
            </Button>
          ) : (
            <Button
              className="mb-1 mt-auto"
              variant="primary"
              onClick={BackToStudentHomePage}
            >
              <AiOutlineHome />
            </Button>
          )}
        </>
      ) : (
        ""
      )}
    </Container>
  );
}
