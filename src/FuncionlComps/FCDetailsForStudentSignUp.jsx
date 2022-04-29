import React from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';

export default function FCDetailsForStudentSignUp(props) {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [sID, setSID] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sFullName, setSFullName] = useState("");
  const [sPhone, setSPhone] = useState("");
  const [sGender, setSGender] = useState("");
  const [sBirthdate, setSBirthdate] = useState("");
  const [sCity, setSCity] = useState("");

  // get request - fetch all cities
 {/*useEffect(() => {
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
          //setCities(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, []);*/}
  
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

  const getCitiesByinput = (s) => {
    const filteredCitiesUrl = "http://localhost:49812/city/getCitiesByInput/"
    if (s !== null && s !== "") {
    console.log("start")
      fetch(filteredCitiesUrl + s, {
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
            console.log("fetch btnFetchGetFilteredCities= ", result);
            setCities(result);
          },
          (error) => {
            console.log("err post=", error);
          }
        );
      console.log("end")
    }
    else {
      setCities(Array(0))
    }
  }

  //assign state according to client input
  const ID = (i) => {
    setSID(i.target.value);
  };
  const Email = (e) => {
    setSEmail(e.target.value);
  };
  const Name = (n) => {
    setSFullName(n.target.value);
  };
  const PhoneNumber = (pn) => {
    setSPhone(pn.target.value);
  };
  // transform gender chocie to one char
  const Gender = (g) => {
    let oneChar = "";
    if (g.target.value === "male") {
      oneChar = "m";
    } else if (g.target.value === "female") {
      oneChar = "f";
    } else {
      oneChar = "o";
    }
    setSGender(oneChar);
  };
  const BirthDate = (bd) => {
    setSBirthdate(bd.target.value);
  };
  const City = (c) => {
    setSCity(c[0])
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

  const cityList = () => {
    const cityArr = cities.map(c => c.CityName)
    let selectBox = (
      <Multiselect
        options={cityArr}
        isObject={false}
        selectionLimit={1}
        onSelect={City}
        onSearch={getCitiesByinput}
        placeholder="הקלד לבחירת ישוב"
        emptyRecordMsg="לא נמצאה התאמה"
      />
    )
    return selectBox
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        marginTop: 50,
        marginBottom: 10,
      }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card id="fldBlock">
          <Card.Body align="center">
            <h2 className="text-center mb-4">HelpMeStudent הרשמה</h2>
            <Form>
              <Form.Group className="mb-1">
                <Form.Label>תעודת זהות</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="תעודת זהות"
                  required
                  onChange={ID}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>כתובת מייל</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="הכנס מייל"
                  required
                  onChange={Email}
                />
                <Form.Text className="text-muted">
                  המייל שלך ישמש כאמצאי ההתחברות שלך וקבלת התראות על שיעורים
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>שם מלא</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="שם מלא"
                  required
                  onChange={Name}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>מספר טלפון</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="מספר טלפון"
                  required
                  onChange={PhoneNumber}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <br />
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
              <Form.Group className="mb-1">
                <Form.Label>תאריך לידה</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="תאריך לידה"
                  required
                  onChange={BirthDate}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>מקום מגורים</Form.Label>
                {cityList()}
              </Form.Group>{" "}
            </Form>
          </Card.Body>
          {buttonToReturn()}
        </Card>{" "}
      </div>
    </Container>
  );
}
