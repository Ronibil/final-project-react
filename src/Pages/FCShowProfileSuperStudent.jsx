import React from "react";
import FCFormSuperDetails from "../FuncionlComps/FCFormSuperDetails";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import FCShowProfileSuperBtns from "../FuncionlComps/FCShowProfileSuperBtns";
import { AiOutlineHome } from "react-icons/ai";

export default function FCShowProfileSuperStudent() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [superDetails, setSuperDetails] = useState();
  const [futureClassesSuper, setfutureClassesSuper] = useState();

  const superId = state.classToCard.SuperStudentId;
  const studentDetails = state.studentDetails;
  const StudentDetails = {
    Email: state.studentDetails.Email,
    Password: state.studentDetails.Password,
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
  }, [superId]);

  const BackToStudentHomePage = () => {
    navigate("/studentHomePage", { state: StudentDetails });
  };
  const BackToSearchClassesPage = () => {
    navigate("/searchClassesPage", { state: StudentDetails });
  };
  return (
    <Container className="d-flex flex-column align-items-center text-center justify-content-center">
      <img
        src="App logos\HelpMeStudent!-logos_black.png"
        alt="logo"
        id="logo"
        style={{ width: "120px" }}
      />
      {superDetails !== undefined ? (
        <div>
          <FCFormSuperDetails superDetails={superDetails} />
          <FCShowProfileSuperBtns />
          {state.type == 1 ?
            <Button
              className="mb-3 mt-auto"
              variant="outline-primary"
              onClick={BackToSearchClassesPage}
            >
              חזרה לחיפוש שיעור
            </Button>
            :
            <Button
              className="mb-3 mt-auto"
              variant="outline-primary"
              onClick={BackToStudentHomePage}
            >
              <AiOutlineHome />

            </Button>
          }

        </div>
      ) : (
        ""
      )}
    </Container>
  );
}
