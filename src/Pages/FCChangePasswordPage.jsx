import React from "react";
import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import LogoComponent from "../Elements/LogoComponent";

export default function FCChangePasswordPage() {

  const [id, setId] = useState("")
  const fetchNewPass = () => {
    const newPassUrl = "http://localhost:49812/Student/NewPassword/"
    console.log("start")
    fetch(newPassUrl + id, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log("FETCH Post Email = ", result);
        },
        (error) => {
          console.log("err post =", error);
        }
      );
    console.log("end")
  }
  return (
    <Container className="d-flex justify-content-start align-items-center flex-column ">
      <LogoComponent />
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4"> דף שינוי סיסמא</h3>
          <h6 style={{ direction: "rtl" }}>נא להזין ת.ז שלפיה נרשמתם למערכת. תקבלו מייל עם הסיסמא החדשה להתחברות.</h6>
          <Form>
            <Form.Group >
              <Form.Label style={{ display: "block", textAlign: "right" }}>
                :ת.ז
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                required
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Group>
            <Button
              className="w-100 text-center mt-2"
              variant="success"
              onClick={() => fetchNewPass()}
            >
              שלחו אליי סיסמה חדשה
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}