import React from "react";
import { Card, Form, Button } from "react-bootstrap";

export default function FCLoginForm({
  UpdateEmail,
  UpdatePassword,
  VerifyUser,
  navigateToRegister,
}) {
  return (
    <div
      className="w-100"
      style={{
        maxWidth: "400px",
        textAlign: "center",
        paddingTop: 120,
      }}
    >
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">HelpMeStudent</h1>
          <h2 className="text-center mb-4">התחברות</h2>
          <Form>
            <Form.Group id="text" controlId="contolEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" onChange={UpdateEmail} required />
            </Form.Group>
            <Form.Group id="password" controlId="contolPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={UpdatePassword}
                required
              />
            </Form.Group>
            <Button
              className="w-100 text-center mt-2"
              variant="success"
              onClick={VerifyUser}
            >
              התחבר
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div id="errMsgLogin" style={{ display: "none" }}>
        שם משתמש או סיסמה שגויים
      </div>
      <div className="w-100 text-center mt-2"><b>?לא רשומים למערכת</b></div>
      <Button
        className="w-100 text-center mt-2"
        variant="link"
        onClick={navigateToRegister}
      >
        <b>!לחצו כאן להירשם</b>
      </Button>
    </div>
  );
}
