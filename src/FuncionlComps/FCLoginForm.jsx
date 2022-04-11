import React from 'react'
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function FCLoginForm(props) {
  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">התחברות</h2>
          <Form>
            <Form.Group id="text">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                onChange={props.UpdateEmail}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={props.UpdatePassword}
                required
              />
            </Form.Group>
            <Button
              className="w-100 text-center mt-2"
              variant="success"
            onClick={props.VerifyUser}
            >
              התחבר
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div id="errMsgLogin" style={{display:'none'}}>שם משתמש או סיסמה שגויים</div>
      <div className="w-100 text-center mt-2">לא רשומים למערכת</div>
      <Link to="/typeOfUser">לחצו כאן להירשם</Link>
    </div>
  )
}
