import React, { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function StudentHomePage() {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userDetails, setUserDetails] = useState({});
  const [classesHistory, setClassesHistory] = useState([]);
  const [futreClasses, setFutreClasses] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      const { data } = await axios.post(
        "http://localhost:49812/Student/GetStudentLandingPageDetails",
        user
      );
      setTimeout(() => {
        setUserDetails(data);
        setClassesHistory(data.ClassesHistory);
        setFutreClasses(data.FutreClasses);
      }, 1000);
    };
    fetchData();
  }, []);

  const DeleteStudentFromClass = async (classCode) => {
    console.log(userDetails.StudentId);
    const studentToDelete = {
      StudentId: userDetails.StudentId,
      ClassCode: classCode,
    };

    await axios.delete(
      "http://localhost:49812/Student/DeleteStudentFromClass",
      JSON.stringify(studentToDelete)
    );
    let newArray = futreClasses.filter((c) => c.classCode === classCode);
    setFutreClasses(newArray);
  };

  const futureClasses = () => {
    if (futreClasses.length !== 0) {
      const classList = futreClasses.map((classInList) => (
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
      <h2>ברוכים הבאים - {userDetails.FullName}</h2>
      <h3>שיעוריים עתידיים</h3>
      {futureClasses()}

      <Link to="/searchClassesPage">
        <Button variant="success" className="align-content-end">
          חיפוש שיעור חדש
        </Button>
      </Link>
    </Container>
  );
}
