import React from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../Elements/LogoComponent";
import ReturnPageButton from "../Elements/ReturnPageButton";
import FCButton from "../FuncionlComps/FCButton";

export default function FCTypeOfUser() {
  const navigate = useNavigate();

  return (
    <Container style={{ flexDirection: "column", maxWidth: "700px" }} >
      <Card style={{ height: "400px" ,borderRadius: 25, marginTop: 50, alignItems: "center", textAlign: "center" }} >

        <div>
          <LogoComponent />
          <ReturnPageButton GoTo={() => navigate("/")} />
        </ div>
        <div style={{ borderRadius: 25, backgroundColor: "#A2D5AB", padding: "25PX" }}>
          <h1>?מי תרצו להיות</h1>
          <h5> :בחרו את מטרת השימוש שלכם באפליקציה</h5>
        </div>
        <div style={{ marginTop: 15 }}>
          <FCButton onClick={() => navigate("/StudentRequestPage")}>סטודנט</FCButton>
          <div style={{ marginTop: 15 }}>
            <FCButton onClick={() => navigate("/SuperStudentRequestPage")}>סופר-סטודנט (מורה פרטי)</FCButton>
          </div>
        </div>

      </Card >
    </ Container>
  );
}
