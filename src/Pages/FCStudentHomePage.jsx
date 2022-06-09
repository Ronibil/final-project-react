import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LogoComponent from "../Elements/LogoComponent";
import FCBottomNavigation from "../FuncionlComps/FCBottomNavigation";

export default function StudentHomePage() {
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState({});

  const location = useLocation();
  const { state } = location;
  const recommendation = "במקום לקרוא עמודים על גבי עמודים ברצף, התרגלו להפסיק את הקריאה בסוף כל תת נושא או סעיף ולספר בקול את עיקרי הדברים שלמדתם כאילו שאתם מסבירים את החומר למישהו אחר. חזרה על החומר במילים שלכם מהווה מדד מצוין למידה שבה הפנמתם את המידע בשעת הקריאה. אם הצלחתם להסביר עברו הלאה ואם לא - חיזרו אחורה וקראו שנית"


  const userDetails = {
    Email: state.Email,
    Password: state.Password,
    StudentId: studentDetails.StudentId
  };

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
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, []);

  return (
    <Container className="min-vh-100 d-flex align-items-center flex-column text-center">
      <LogoComponent />
      <h1>ברוכים הבאים - {studentDetails.FullName}</h1><br />
      <h3>:ההמלצה השבועית</h3>
      <div style={{ borderRadius: 25, backgroundColor: "#17815A", padding: "20PX", backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
        <h6>{recommendation}</h6>
      </div><br />
      <Button
        style={
          {
            marginTop: "auto",
            marginBottom: 80,
            padding: "28px 40px 28px 40px",
            fontSize: 20,
            borderRadius: 20,
            background: "#00417E",
            border: "solid #01417E 2px"
          }}
        onClick={() => navigate("/searchClassesPage", { state: userDetails })}>
        !מצא את השיעור שמתאים לך
      </Button>
      {userDetails === undefined ? (
        ""
      ) : (
        <FCBottomNavigation UserDetails={userDetails} />
      )}
    </Container>
  );
}
