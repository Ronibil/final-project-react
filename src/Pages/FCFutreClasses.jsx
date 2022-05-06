import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import FCClassCard from "../FuncionlComps/FCClassCard";
import "../StyleSheets/Modal.css";

export default function FCFutreClasses() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const FutreClass = state.FutreClass;
  const superDetails = {
    Email: state.superEmail,
    Password: state.superPassword,
  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        marginTop: 50,
        marginBottom: 10,
      }}
    >
      <Card xs={12} style={{ width: "30rem" }}>
        <Card.Body align="center">
          <Card.Title>:שיעורים עתידיים שלי</Card.Title>
          {FutreClass.length !== 0 ? (
            <>
              {FutreClass.map((c) => (
                <FCClassCard key={c.ClassCode} classToCard={c} type="futre" />
              ))}
            </>
          ) : (
            "No found classes"
          )}{" "}
          <br />
          <Button
            className="btnBackToHome"
            onClick={() => navigate("/superHomePage", { state: superDetails })}
            variant="success"
          >
            חזרה לפרופיל האישי
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
