import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import FCClassCard from "../FuncionlComps/FCClassCard";
import "../StyleSheets/Modal.css";

export default function FCHistoryClassSuper() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const HistoryClass = state.HistoryClass;
  const superDetails = {
    Email: state.superEmail,
    Password: state.superPassword,
  };
  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center flex-column">
      <img
        src="App logos\HelpMeStudent!-logos_black.png"
        alt="logo"
        id="logo"
        style={{ width: "120px" }}
      />
      {/* <Card xs={12} style={{ width: "30rem" }}>
        <Card.Body align="center"> */}
      <h3>:היסטורית שיעורים</h3>
      {HistoryClass.length !== 0 ? (
        <>
          {HistoryClass.map((c) => (
            <FCClassCard key={c.ClassCode} classToCard={c} type="history" />
          ))}
        </>
      ) : (
        "No found classes"
      )}{" "}
      <br />
      <Button
        className="mb-3 mt-auto"
        //className="btnBackToHome"
        onClick={() => navigate("/superHomePage", { state: superDetails })}
        variant="outline-primary"
      >
        חזרה לדף הבית
      </Button>
      {/* </Card.Body>
      </Card> */}
    </Container>
  );
}
