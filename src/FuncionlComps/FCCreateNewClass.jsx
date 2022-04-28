import React from 'react'
import { Container, Form, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function FCCreateNewClass() {
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    let apiUrlTags = "http://localhost:49812/Tags/getAll"
    fetch(apiUrlTags, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json; charset=UTF-8",
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
          setAllTags(result)
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, [])



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
            <h2 className="text-center mb-4">יצירת שיעור חדש</h2>
            <Form>
              <Form.Group className="mb-1">
                <Form.Label>שם השיעור</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="שם השיעור"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>תיאור השיעור</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="הכנס את תיאור השיעור / מערך השיעור"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>תאריך השיעור</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="תאריך השיעור"
                  required
                />
              </Form.Group><br />
              <Form.Group className="mb-1">
                <Form.Label>שעת התחלה</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="שעת התחלה"
                  required
                />
              </Form.Group><br />
              <Form.Group className="mb-1">
                <Form.Label>שעת סיום</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="שעת סיום"
                  required
                />
              </Form.Group><br />
              <Form.Group className="mb-1">
                <Form.Label>מספר משתתפים</Form.Label>
                <Form.Select size="sm" required>
                  <option value="" defaultValue hidden>בחר</option>
                  <option value="1"> 1 </option>
                  <option value="2"> 2 </option>
                  <option value="3"> 3 </option>
                  <option value="4"> 4 </option>
                </Form.Select>
              </Form.Group>
              <Form.Label>בחר תגיות</Form.Label>
              {/* תגיות */}
            </Form>
          </Card.Body>
        </Card>{" "}
      </div>
    </Container >
  )
}
