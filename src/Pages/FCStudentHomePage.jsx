import React, { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function StudentHomePage() {
  const navigate = useNavigate()
  const [studentDetails, setStudentDetails] = useState({});
  const [classesHistory, setClassesHistory] = useState([]);
  const [futreClasses, setFutreClasses] = useState([]);

  const { state } = useLocation();
  const userDetails = {
    Email: state.Email,
    Password: state.Password
  }
  const fullName = "";

  useEffect(() => {
    const url = "http://localhost:49812/Student/GetStudentLandingPageDetails"
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
            FullName: result.FullName
          });
          setClassesHistory(result.ClassesHistory);
          setFutreClasses(result.FutreClasses)
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
      ClassCode: classCode
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
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          let newFutreClasses = futreClasses.filter(c => c.ClassCode != classCode)
          setFutreClasses(newFutreClasses);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  const FutureClasses = () => {
    if (futreClasses.length !== 0) {
      let classList = futreClasses.map((classInList) => (
        <Card
          style={{ maxWidth: 1000, margin: 20 }}
          key={classInList.ClassCode}
        >
          <Card.Body>
            <Card.Title>שם השיעור: {classInList.ClassName}</Card.Title>
            <Card.Text>תיאור: {classInList.ClassDescription}</Card.Text>
            <Card.Text>תאריך: {classInList.ClassDate}</Card.Text>
            <Card.Text>שעת התחלה: {classInList.StartTime}</Card.Text>
            <Card.Text>שעת סיום: {classInList.EndTime}</Card.Text>
            <Card.Text>מספר משתתפים: {classInList.NumOfParticipants}</Card.Text>
            <Card.Text> {classInList.SuperName}</Card.Text>

            <Button
              onClick={() => DeleteStudentFromClass(classInList.ClassCode)}
              variant="outline-danger"
            >
              מחיקת שיעור
            </Button>
          </Card.Body>
        </Card> //ניצור קומפוננטה אחת שמחזירה שיעורים במערך, כל פעם מקבלת שיעור אחד ונוסיף את הכפתור המתאים מבחוץ
      ));
      return classList;
    }
    return (
      <div
        style={{
          alignItems: "center",
          margins: "auto",
          paddingTop: 100,
          paddingBottom: 150,
        }}
      >
        <h5>לא קיימים שיעורים</h5>
        <h6>שיעורים אליהם אתם רשומים יופיעו כאן</h6>
      </div>
    );
  };

  return (
    <Container
      className="d-flex align-items-center flex-column"
      style={{ minHeight: "100vh" }}
    >
      <h2>ברוכים הבאים - {studentDetails.FullName}</h2>
      <h3>שיעוריים עתידיים</h3>
      {FutureClasses()}

      <Button variant="success" onClick={() => navigate("/searchClassesPage", { state: userDetails })} className="align-content-end">
        חיפוש שיעור חדש
      </Button>
    </Container>
  );
}
