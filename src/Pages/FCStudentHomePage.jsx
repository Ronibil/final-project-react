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

  const fullName = "";

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
    <Container className="min-vh-100 d-flex align-items-center flex-column text-center" style={{backgroundColor: "#FFFFFF"}}>
      <LogoComponent />
      <h1>ברוכים הבאים - {studentDetails.FullName}</h1>
      <h5 style={{ marginTop: 200 }}>נוסיף המלצות לסטודנטים הלומדים</h5>
      <h5>הסופר סטודנט המצטיין</h5>
      <h5>פרסומות - הדף יהיה מעוצב יפה למשתמש</h5>
      <Button
        style={
          {
            marginTop: 210,
            padding: "28px 40px 28px 40px",
            fontSize: 20,
            borderRadius: 20,
            background: "#A2D5AB"
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
