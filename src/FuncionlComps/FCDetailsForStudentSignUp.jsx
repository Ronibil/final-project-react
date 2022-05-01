import React from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AsyncSelect from "react-select/async";
import axios from "axios";

export default function FCDetailsForStudentSignUp(props) {
  const navigate = useNavigate();

  const [sID, setSID] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sFullName, setSFullName] = useState("");
  const [sPhone, setSPhone] = useState("");
  const [sGender, setSGender] = useState("");
  const [sBirthdate, setSBirthdate] = useState("");
  const [sCity, setSCity] = useState("");

  // post new student request to db - fetch post
  const btnPostStudentRequest = () => {
    const LocalUrl = "http://localhost:49812/requestToJoin/newRequest";
    const currentDate = new Date();
    const newStudentRequest = {
      StudentId: sID,
      FullName: sFullName,
      Email: sEmail,
      Phone: sPhone,
      Gender: sGender,
      BirthDate: sBirthdate,
      City: sCity,
      RequestStatus: "onHold",
      RequestDate: currentDate,
    };
    console.log(newStudentRequest);

    console.log("start");
    fetch(LocalUrl, {
      method: "POST",
      body: JSON.stringify(newStudentRequest),
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
          console.log("FETCH PostRequest= ", result);
          console.log(result.RequsetNum);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    console.log("end");
  };

  const fetchCities = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(async () => {
        const { data } = await axios.get(
          "http://localhost:49812/city/getCitiesByInput/" + inputValue
        );
        const tempArray = [];
        data.forEach((element) => {
          tempArray.push({
            label: `${element.CityName}`,
            value: element.CityName,
          });
        });
        callback(tempArray);
      });
    }
  };

  const superDetails = {
    StudentId: sID,
    FullName: sFullName,
    Email: sEmail,
    Phone: sPhone,
    Gender: sGender,
    BirthDate: sBirthdate,
    City: sCity,
  };

  const buttonToReturn = () => {
    if (props.type === "type1") {
      return (
        <Button
          id="subBtn"
          variant="success"
          onClick={() => btnPostStudentRequest()}
        >
          שליחה לאימות נתונים
        </Button>
      );
    } else {
      return (
        <Button
          id="subBtn"
          variant="success"
          onClick={() =>
            navigate("/SuperStudentRequestPage2", { state: superDetails })
          }
        >
          המשך למילוי פרופיל אישי
        </Button>
      );
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        marginTop: 50,
        marginBottom: 10,
      }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body align="center">
            <h2 className="text-center mb-4">HelpMeStudent הרשמה</h2>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>תעודת זהות</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="תעודת זהות"
                  required
                  onChange={(e) => setSID(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>כתובת מייל</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="הכנס מייל"
                  required
                  onChange={(e) => {
                    setSEmail(e.target.value);
                  }}
                />
                <Form.Text className="text-muted">
                  המייל שלך ישמש כאמצאי ההתחברות שלך וקבלת התראות על שיעורים
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>שם מלא</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="שם מלא"
                  required
                  onChange={(e) => {
                    setSFullName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>מספר טלפון</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="מספר טלפון"
                  required
                  onChange={(e) => {
                    setSPhone(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>מין</Form.Label>
                <Form.Select
                  size="sm"
                  onChange={(e) => setSGender(e.target.value)}
                  required
                >
                  <option value="" defaultValue hidden>
                    בחר
                  </option>
                  <option value="m"> זכר </option>
                  <option value="f"> נקבה </option>
                  <option value="o"> אחר </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>תאריך לידה</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="תאריך לידה"
                  required
                  onChange={(e) => {
                    setSBirthdate(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>מקום מגורים</Form.Label>
                <AsyncSelect
                  isRtl
                  loadOptions={fetchCities}
                  required
                  onChange={(e) => setSCity(e.value)}
                />
              </Form.Group>{" "}
              {buttonToReturn()}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
