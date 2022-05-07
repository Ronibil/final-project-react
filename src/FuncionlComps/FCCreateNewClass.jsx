import React from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FCModalAddNewClass from "./FCModalAddNewClass";

import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function FCCreateNewClass() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const superId = state.superPassword;
  const superName = state.superName;
  const superEmail = state.superEmail;
  const UserDetails = {
    Email: superEmail,
    Password: superId,
  };

  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classDate, setClassDate] = useState("");
  const [classStartTime, seTclassStartTime] = useState("");
  const [classEndTime, setClassEndTime] = useState("");
  const [classParticipants, setClassParticipants] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const animatedComponents = makeAnimated();
  const customTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "limegreen",
        primaty: "green",
      },
    };
  };

  //Class Details for Modal!
  const ClassDetailsForModal = {
    className: className,
    classDate: classDate,
    classStartTime: classStartTime,
    classEndTime: classEndTime,
    classParticipants: classParticipants,
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:49812/Tags/getAll");
      let suggestionList = data.map((suggestion, index) => {
        return { value: index, label: suggestion };
      });

      setSuggestions(suggestionList);
    };
    fetchData();
  }, []);

  const postNewClass = () => {
    const url = "http://localhost:49812/Class/PostNewClass";
    let tagList = tags.map((tag) => tag.label);
    const newClassObj = {
      ClassDate: classDate,
      StartTime: classStartTime,
      EndTime: classEndTime,
      ClassName: className,
      SuperStudentId: superId,
      NumOfParticipants: classParticipants,
      ClassDescription: classDescription,
      SuperName: superName,
      Tags: tagList,
    };

    console.log(newClassObj);
    console.log("start");
    fetch(url, {
      method: "POST",
      body: JSON.stringify(newClassObj),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res.ok", res.ok);
        if (res.ok) {
          setModalOpen(true);
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("FETCH PostRequest= ", result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    console.log("end");
  };

  const BackToHomePage = () => {
    navigate("/SuperHomePage", { state: UserDetails });
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
        <Card id="fldBlock">
          <Card.Body align="center">
            <h2 className="text-center mb-4">יצירת שיעור חדש</h2>
            <Form>
              <Form.Group className="mb-3" >
                <Form.Label>שם השיעור</Form.Label>
                <Form.Control
                  type="text"
                  style={{textAlign: "right"}}
                  placeholder="שם השיעור"
                  required
                  onChange={(e) => setClassName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>תיאור השיעור</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{textAlign: "right"}}
                  rows={3}
                  placeholder="הכנס את תיאור השיעור / מערך השיעור"
                  required
                  onChange={(e) => setClassDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>תאריך השיעור</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="תאריך השיעור"
                  required
                  onChange={(e) => setClassDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>שעת התחלה</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="שעת התחלה"
                  required
                  onChange={(e) => seTclassStartTime(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>שעת סיום</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="שעת סיום"
                  required
                  onChange={(e) => setClassEndTime(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>מספר משתתפים</Form.Label>
                <Form.Select
                  size="sm"
                  style={{textAlign: "right"}}
                  required
                  onChange={(e) => setClassParticipants(e.target.value)}
                >
                  <option value="" defaultValue hidden>
                    בחר
                  </option>
                  <option value="1"> 1 </option>
                  <option value="2"> 2 </option>
                  <option value="3"> 3 </option>
                  <option value="4"> 4 </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>בחר תגיות</Form.Label>
                <Select
                  theme={customTheme}
                  placeholder="בחר תגיות"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={setTags}
                  isMulti
                  isSearchable
                  noOptionsMessage={() => "לא נמצאו תגיות"}
                  className="basic-multi-select mb-3"
                  options={suggestions}
                />
              </Form.Group>
            </Form>
            <Button
              id="subBtn"
              variant="success"
              onClick={() => postNewClass()}
            >
              יצירת שיעור
            </Button>
          </Card.Body>
          <FCModalAddNewClass
            BackToHomePage={BackToHomePage}
            modalOpen={modalOpen}
            ClassDetailsForModal={ClassDetailsForModal}
            text="!השיעור התווסף/ עודכן בהצלחה"
          />
        </Card>
      </div>
    </Container>
  );
}
