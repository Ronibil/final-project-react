import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FCTypeOfUser() {
  const navigate = useNavigate();

  return (
    <Container className="min-vh-100 d-flex flex-column align-items-center text-center">
      <img
        src="App logos\HelpMeStudent!-logos_black.png"
        alt="logo"
        id="logo"
        style={{ width: "120px" }}
      />
      <h1>?מי תרצו להיות</h1>
      <h4 className="mb-4"> :בחרו את מטרת השימוש שלכם באפליקציה</h4>
      <div className="d-grid gap-2">
        <Button
          size="lg"
          className="m-2"
          variant="outline-primary"
          onClick={() => navigate("/StudentRequestPage")}
        >
          סטודנט
        </Button>
        <Button
          size="lg"
          className="m-2"
          variant="outline-primary"
          onClick={() => navigate("/SuperStudentRequestPage")}
        >
          סופר סטודנט (מורה פרטי)
        </Button>
      </div>
      <Button
        className="mb-3 mt-auto"
        onClick={navigate("/")}
        variant="outline-primary"
      >
        חזרה לדף ההתחברות{" "}
      </Button>
    </Container>
  );
}
