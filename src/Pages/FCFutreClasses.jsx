import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import FCClassCard from "../FuncionlComps/FCClassCard";
import "../StyleSheets/Modal.css";
import { useState } from "react";

export default function FCFutreClasses() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [futreClass, setFutreClass] = useState(state.FutreClass)
  const superDetails = {
    Email: state.superEmail,
    Password: state.superPassword,
  };

  const deleteClassByClassCode = (ClassCode) => {
    console.log(ClassCode);
    const url = `http://localhost:49812/Class/DeleteClassByClassCode/${ClassCode}`;
    fetch(url, {
      method: "DELETE",
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
          let newFutreClass = futreClass.filter(c => c.ClassCode != ClassCode);
          setFutreClass(newFutreClass);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
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
          {futreClass.length !== 0 ? (
            <>
              {futreClass.map((c) => (
                <FCClassCard key={c.ClassCode} classToCard={c} type="futre" deleteClassByClassCode={deleteClassByClassCode} />
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
