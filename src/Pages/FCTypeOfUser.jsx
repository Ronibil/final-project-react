import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../Elements/LogoComponent";
import FCButton from "../FuncionlComps/FCButton";

export default function FCTypeOfUser() {
  const navigate = useNavigate();

  return (
    <Container className="min-vh-100 d-flex flex-column align-items-center text-center">
      <LogoComponent />
      <h1>?מי תרצו להיות</h1>
      <h4 className="mb-4"> :בחרו את מטרת השימוש שלכם באפליקציה</h4>
      <div style={{ marginTop: 15 }}>
        <FCButton onClick={() => navigate("/StudentRequestPage")}>סטודנט</FCButton>
        <div style={{ marginTop: 15 }}>
          <FCButton onClick={() => navigate("/SuperStudentRequestPage")}>סופר-סטודנט (מורה פרטי)</FCButton>
        </div>
      </div>
      <div style={{ marginTop: 450 }}>
        <FCButton onClick={() => navigate("/")}>חזרה לדף ההתחברות</FCButton>
      </div>
    </Container>
  );
}
