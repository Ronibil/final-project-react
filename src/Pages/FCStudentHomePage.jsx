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

  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [classDetails, setClassDetails] = useState();
  const [confirmModal, setConfirmModal] = useState(false);

  const { state } = useLocation();
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
  }, []);

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

  const FutureClasses = () => {
    let classList = futreClasses.map((classInList) => (
      <FCClassCard classToCard={classInList} type="studentFutre" />
    ));
    return classList;
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
    <Container
      className="d-flex align-items-center flex-column"
      style={{
        marginTop: 50,
        marginBottom: 10,
      }}
    >
      <Card xs={12} style={{ width: "30rem" }}>
        <Card.Body align="center">
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
          <h1>HelpMeStudent</h1>
          <Card.Title>ברוכים הבאים - {studentDetails.FullName}</Card.Title>
          {futreClasses.length === 0 ? (
            <Row>
              <h5>לא קיימים שיעורים</h5>
              <h6>שיעורים אליהם אתם רשומים יופיעו כאן</h6>
            </Row>
          ) : (
            <>
              <Card.Text>שיעוריים עתידיים שלי</Card.Text>
              {futreClasses.map((c, index) => (
                <FCClassCard
                  key={index}
                  classToCard={c}
                  type="studentFutre"
                  ShowModaAreYouSure={ShowModaAreYouSure}
                />
              ))}
              <br />
            </>
          )}
          <Button
            variant="success"
            onClick={() =>
              navigate("/searchClassesPage", { state: userDetails })
            }
            className="align-content-end"
          >
            חיפוש שיעור חדש
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
