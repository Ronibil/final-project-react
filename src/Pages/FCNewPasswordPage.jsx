import React from 'react'
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import LogoComponent from "../Elements/LogoComponent";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function FCNewPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [icon, setIcon] = useState(<VisibilityIcon />)
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const userDetails = {
    Email: state.Email,
    Password: state.Password,
    StudentId: state.StudentId
  };

  const fetchUpdatePassword = () => {
    const putPassUrl = "http://localhost:49812/Student/UpdatePassword"
    let updatedPass = {
      StudentId: userDetails.StudentId,
      Password: confirmPassword
    }
    console.log('start');
      fetch(putPassUrl, {
        method: "PUT",
        body: JSON.stringify(updatedPass),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          console.log("res=", res);
          console.log("res.status", res.status);
          console.log("res.ok", res.ok);
          if (res.ok) {
            setMessage("הסיסמא עודכנה בהצלחה")
          }
          else {
            setMessage("עדכון הסיסמא נכשל!")
          }
          return res.json()
        })
        .then(
          (result) => {
            console.log("fetch updated Password= ", result);
          },
          (error) => {
            console.log("err put=", error);
          }
        );
      console.log("end");
  }
  
  const handleCurrentPass = (e) => {
    if (e.target.value === userDetails.Password) {
      setCurrentPassword(e.target.value)
      e.target.style.border = "1px solid green"
    }
    else {
      setCurrentPassword("")
      e.target.style.border = "1px solid red"
    }
  }
  
  const PasswordVisibility = (e) => {
    let textBoxArr = document.getElementsByName("password")
    if (textBoxArr[0].type === "password") {
      for(let i = 0; i < textBoxArr.length; i++) {
        textBoxArr[i].type = "text"
      }
      setIcon(<VisibilityOffIcon />)
    }
    else {
      for(let i = 0; i < textBoxArr.length; i++) {
        textBoxArr[i].type = "password"
      }
      setIcon(<VisibilityIcon />)
    }
  }

  const sendNewPass = () => {
    let txtBoxes = document.getElementsByName("password")
    if (currentPassword !==  userDetails.Password || newPassword !== confirmPassword) {
      txtBoxes[1].style.border = "1px solid red"
      txtBoxes[2].style.border = "1px solid red"
      alert("אחד או יותר מהפרטים שהזנת שגויים")
    }
    else {
      console.log("send!")
      txtBoxes[1].style.border = "1px solid green"
      txtBoxes[2].style.border = "1px solid green"
      fetchUpdatePassword()
    }
  }
  const messageBox = () => {
    let style = {}
    if (message === "הסיסמא עודכנה בהצלחה") {
      style = {
        color: "green"
      }
    }
    else if (message === "עדכון הסיסמא נכשל!") {
      style = {
        color: "red"
      }
    }
    const box = (
      <Form.Group>
        <Form.Label style={style}>
          {message}
        </Form.Label>
        <Button onClick={() => navigate("/studentHomePage", {state: userDetails})}>חזור לדף הבית</Button>
      </Form.Group>
    )
    
  }

  return (
    <Container className="d-flex justify-content-start align-items-center flex-column ">
      <Card style={{ borderRadius: 25, marginTop: 140 }}>
        <div style={{ margin: "0 auto" }} >
          <LogoComponent />
        </div>
        <Card.Body>
          <h3 className="text-center mb-4"> דף שינוי סיסמא</h3>
          <hr />
          <Form id="form">
              <Button variant="text" onClick={(e) => PasswordVisibility(e)}>{icon}</Button>
            <Form.Group >
              <Form.Label style={{ display: "block", textAlign: "right", marginRight: 10 }}>
                :סיסמא נוכחית 
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="password"
                required
                onChange={(e) => handleCurrentPass(e)}
                style={{ borderRadius: 25 }}
                name="password"
              />
            </Form.Group>
            <Form.Group >
              <Form.Label style={{ display: "block", textAlign: "right", marginRight: 10 }}>
                :סיסמא חדשה
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="password"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ borderRadius: 25 }}
                name="password"
              />
            </Form.Group>
            <Form.Group >
              <Form.Label style={{ display: "block", textAlign: "right", marginRight: 10 }}>
                :אישור סיסמא חדשה
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ borderRadius: 25 }}
                name="password"
              />
            </Form.Group>
            <Button
              className="w-100 text-center mt-2"
              variant="success"
              style={{ borderRadius: 25 }}
              onClick={() => sendNewPass()}
            >
              עדכן סיסמא
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}
