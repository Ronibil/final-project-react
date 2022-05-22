import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

export default function FCChangePasswordPage() {
  return (
    <Container className="d-flex justify-content-start align-items-center flex-column ">
      <img
        src="App logos\HelpMeStudent!-logos_black.png"
        alt="logo"
        id="logo"
        style={{ width: "200px" }}
      />
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4"> דף שינוי סיסמא</h3>
          <h6 style={{direction: "rtl"}}>נא להזין ת.ז שלפיה נרשמתם למערכת. תקבלו מייל עם הסיסמא החדשה להתחברות.</h6>
          <Form>
            <Form.Group >
              <Form.Label style={{ display: "block", textAlign: "right" }}>
                :ת.ז
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                required
              />
            </Form.Group>
            <Button
            className="w-100 text-center mt-2"
            variant="success"
          >
            שלחו אליי סיסמה חדשה
          </Button>
          </Form>
        </Card.Body>
      </Card>
    
    </Container>
  );
}