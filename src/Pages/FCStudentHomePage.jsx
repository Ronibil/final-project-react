import React, { useState, useEffect } from "react";
import { Container, Button, Card, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FCClassCard from "../FuncionlComps/FCClassCard";
import FCModalAreYouSure from "../FuncionlComps/FCModalAreYouSure";
import FCModalConfirm from "../FuncionlComps/FCModalConfirm";

export default function StudentHomePage() {
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState({});
  const [classesHistory, setClassesHistory] = useState([]);
  const [futreClasses, setFutreClasses] = useState([]);

  //modal
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [classDetails, setClassDetails] = useState();
  const [confirmModal, setConfirmModal] = useState(false);

  const location = useLocation();
  const { state } = location;
  const userDetails = {
    Email: state.Email,
    Password: state.Password,
  };
  const fullName = "";

  useEffect(() => {
    const url = "http://localhost:49812/Student/GetStudentLandingPageDetails";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(userDetails),
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
        (result) => {
          console.log("FETCH PostRequest= ", result);
          setStudentDetails({
            StudentId: result.StudentId,
            FullName: result.FullName,
          });
          setClassesHistory(result.ClassesHistory);
          setFutreClasses(result.FutreClasses);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, [location]);

  const DeleteStudentFromClass = (classCode) => {
    const Url = "http://localhost:49812/Student/DeleteStudentFromClass";
    const classToDelete = {
      StudentId: studentDetails.StudentId,
      ClassCode: classCode,
    };
    fetch(Url, {
      method: "DELETE",
      body: JSON.stringify(classToDelete),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res.ok", res.ok);
        if (res.ok) {
          setAreYouSureModal(false);
          setConfirmModal(true);
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          let newFutreClasses = futreClasses.filter(
            (c) => c.ClassCode !== classCode
          );
          setFutreClasses(newFutreClasses);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  const HideModalAreYouSure = () => {
    setAreYouSureModal(false);
  };

  const BackToHomePage = () => {
    setConfirmModal(false);
  };

  const ShowModaAreYouSure = (ClassDetails2Remove) => {
    setAreYouSureModal(true);
    let classToRemove = {
      classCode: ClassDetails2Remove.ClassCode,
      classDate: ClassDetails2Remove.ClassDate,
      classEndTime: ClassDetails2Remove.EndTime,
      className: ClassDetails2Remove.ClassName,
      classParticipants: ClassDetails2Remove.NumOfParticipants,
      classStartTime: ClassDetails2Remove.StartTime,
    };
    console.log(classToRemove);
    setClassDetails(classToRemove);
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center flex-column text-center">
      <img
        src="App logos\HelpMeStudent!-logos_black.png"
        alt="logo"
        id="logo"
        style={{ width: "120px" }}
      />
      {classDetails !== undefined ? (
        <>
          <FCModalAreYouSure
            isOpen={areYouSureModal}
            modalHide={HideModalAreYouSure}
            btnFunc={DeleteStudentFromClass}
            parameter={classDetails.classCode}
            text="?האם אתה בטוח שברצונך למחוק שיעור זה"
          />
          <FCModalConfirm
            modalOpen={confirmModal}
            BackToHomePage={BackToHomePage}
            ClassDetailsForModal={classDetails}
            text="!השיעור נמחק בהצלחה"
          />
        </>
      ) : (
        ""
      )}
      <h2>ברוכים הבאים - {studentDetails.FullName}</h2>
      {futreClasses.length === 0 ? (
        <div className="m-5">
          <h5>לא קיימים שיעורים</h5>
          <h6>שיעורים אליהם אתם רשומים יופיעו כאן</h6>
        </div>
      ) : (
        <>
          <h3>שיעוריים עתידיים שלי</h3>
          {futreClasses.map((c, index) => (
            <FCClassCard
              key={index}
              classToCard={c}
              type="studentFutre"
              ShowModaAreYouSure={ShowModaAreYouSure}
              studentDetails={userDetails}
            />
          ))}
          <br />
        </>
      )}
      <Button
        className="mb-3 mt-auto"
        variant="success"
        onClick={() => navigate("/searchClassesPage", { state: userDetails })}
      >
        חיפוש שיעור חדש
      </Button>
    </Container>
  );
}
