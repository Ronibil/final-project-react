import React from 'react'
import { Button, Container, Form, Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function FCDetailsForStudentSignUp(props) {
  const navigate = useNavigate()

  const [cities, setCities] = useState([]);
  const [sID, setSID] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sFullName, setSFullName] = useState("");
  const [sPhone, setSPhone] = useState("");
  const [sGender, setSGender] = useState("");
  const [sBirthdate, setSBirthdate] = useState("");
  const [sCity, setSCity] = useState("");

  // get request - fetch all cities
  useEffect(() => {
    const apiUrlCities = "http://proj.ruppin.ac.il/bgroup92/prod/city/getall";
    fetch(apiUrlCities, {
      method: "GET",
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
          console.log("fetch btnFetchGetCities= ", result);
          setCities(result);
        },
        (error) => {
          console.log("err post=", error);
        });
  }, []);
  // post new student request to db - fetch post
  const btnPostStudentRequest = () => {
    const LocalUrl = "http://localhost:49812/requestToJoin/newRequest";
    const currentDate = new Date();
    const application = {
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
    console.log(application);

    console.log("start")
    fetch(LocalUrl, {
      method: "POST",
      body: JSON.stringify(application),
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
    console.log("end")
  };

  //assign state according to client input
  let ID = (i) => {
    setSID(i.target.value);
  };
  let Email = (e) => {
    setSEmail(e.target.value);
  };
  let Name = (n) => {
    setSFullName(n.target.value);
  };
  let PhoneNumber = (pn) => {
    setSPhone(pn.target.value);
  };
  // transform gender chocie to one char
  let Gender = (g) => {
    let oneChar = "";
    if (g.target.value == "male") {
      oneChar = "m";
    } else if (g.target.value == "female") {
      oneChar = "f";
    } else {
      oneChar = "o";
    }
    setSGender(oneChar);
  };
  let BirthDate = (bd) => {
    setSBirthdate(bd.target.value);
  };
  let City = (c) => {
    setSCity(c.target.value);
  };


  let superDetails = {
    StudentId: sID,
    FullName: sFullName,
    Email: sEmail,
    Phone: sPhone,
    Gender: sGender,
    BirthDate: sBirthdate,
    City: sCity,

  }
  const buttonToReturn = () => {
    if (props.type == "type1") {
      return (<Button id="subBtn" variant="success" onClick={() => btnPostStudentRequest()}>שליחה לאימות נתונים</Button>);
    }
    else {
      return (<Button id="subBtn" variant="success" onClick={() => navigate("/SuperStudentRequestPage2", { state: superDetails })}>המשך למילוי פרופיל אישי</Button>);
    }
  };

  const cityList = () => {
    let options = cities.map((c) => (
      <option value={c.CityName} key={c.CityName}>
        {c.CityName}
      </option>
    ));
    let list = (
      <div>
        {" "}
        <input list="cities" onChange={City} required />
        <datalist id="cities">{options}</datalist>
      </div>
    );
    return list;
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        marginTop: 50,
        marginBottom: 10
      }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card id="fldBlock">
          <Card.Body align="center">
            <h2 className="text-center mb-4">HelpMeStudent הרשמה</h2>
            <Form>
              <Form.Group className="mb-1" >
                <Form.Label>תעודת זהות</Form.Label>
                <Form.Control type="text" placeholder="תעודת זהות" required onChange={ID} />
              </Form.Group>
              <Form.Group className="mb-1" >
                <Form.Label>כתובת מייל</Form.Label>
                <Form.Control type="email" placeholder="הכנס מייל" required onChange={Email} />
                <Form.Text className="text-muted">
                  המייל שלך ישמש כאמצאי ההתחברות שלך וקבלת התראות על שיעורים
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-1" >
                <Form.Label>שם מלא</Form.Label>
                <Form.Control type="text" placeholder="שם מלא" required onChange={Name} />
              </Form.Group>
              <Form.Group className="mb-1" >
                <Form.Label>מספר טלפון</Form.Label>
                <Form.Control type="text" placeholder="מספר טלפון" required onChange={PhoneNumber} />
              </Form.Group>
              <Form.Group className="mb-1" ><br />
                <Form.Label>מין</Form.Label>
                <Form.Select size="sm" onChange={Gender} required>
                  <option value="" defaultValue hidden>
                    בחר
                  </option>
                  <option value="male"> זכר </option>
                  <option value="female"> נקבה </option>
                  <option value="else"> אחר </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-1" >
                <Form.Label>תאריך לידה</Form.Label>
                <Form.Control type="date" placeholder="תאריך לידה" required onChange={BirthDate} />
              </Form.Group>
              <Form.Group className="mb-1" >
                <Form.Label>מקום מגורים</Form.Label>
                {cityList()}
              </Form.Group>{" "}
            </Form>
          </Card.Body>
          {buttonToReturn()}
        </Card>{" "}
      </div>
    </Container>
  )
}
