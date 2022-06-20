import React from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReturnPageButton from "../Elements/ReturnPageButton";
// import FCModalConfirm from "./FCModalConfirm";

import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function FCUpdateSuperClassPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  // const superId = state.superPassword;
  // const superName = state.superName;
  // const superEmail = state.superEmail;
  // const UserDetails = {
  //   Email: superEmail,
  //   Password: superId,
  // };
  const classDetails = state.classToCard;
  const superDetails = state.studentDetails;

  const [tags, setTags] = useState([classDetails.Tags]);
  const [suggestions, setSuggestions] = useState([]);
  const [className, setClassName] = useState(classDetails.ClassName);
  const [classDescription, setClassDescription] = useState(classDetails.ClassDescription);
  const [classDate, setClassDate] = useState(classDetails.ClassDate);
  const [classStartTime, seTclassStartTime] = useState(classDetails.StartTime);
  const [classEndTime, setClassEndTime] = useState(classDetails.EndTime);
  const [classParticipants, setClassParticipants] = useState(classDetails.NumOfParticipants);
  // const [modalOpen, setModalOpen] = useState(false);



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
  // const ClassDetailsForModal = {
  //   className: className,
  //   classDate: classDate,
  //   classStartTime: classStartTime,
  //   classEndTime: classEndTime,
  //   classParticipants: classParticipants,
  // };

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

  const btnShow = () => {
    console.log(className);
    console.log(classDescription);
    console.log(classDate);
    console.log(classStartTime);
    console.log(classEndTime);
    console.log(classParticipants);
    console.log(tags);
    console.log("Super DETAILS !!!!!!!!!!!!!!!!");
    console.log(superDetails);
  }
  // PUT

  const BackToHomePage = () => {
    navigate("/SuperHomePage", { state: superDetails });
  };

  return (
    <Container style={{ flexDirection: "column", maxWidth: "700px", justifyContent: "center", paddingTop: 2 }}>
      <Card style={{ paddingTop: 62, borderRadius: 25, backgroundColor: "rgba(255, 255, 255, 0.7)" }} >
        <Card.Body align="center">
          <ReturnPageButton GoTo={BackToHomePage} />
          <h2 className="text-center mb-4">עדכון שיעור</h2>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>שם השיעור</Form.Label>
              <Form.Control
                type="text"
                style={{ textAlign: "right" }}
                placeholder={className}
                required
                onChange={(e) => setClassName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>תיאור השיעור</Form.Label>
              <Form.Control
                as="textarea"
                style={{ textAlign: "right" }}
                rows={3}
                placeholder={classDescription}
                required
                onChange={(e) => setClassDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>תאריך השיעור</Form.Label>
              <Form.Control
                type="date"
                placeholder={classDate}
                required
                onChange={(e) => setClassDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>שעת התחלה</Form.Label>
              <Form.Control
                type="time"
                placeholder={classStartTime}
                required
                onChange={(e) => seTclassStartTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>שעת סיום</Form.Label>
              <Form.Control
                type="time"
                placeholder={classEndTime}
                required
                onChange={(e) => setClassEndTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>מספר משתתפים</Form.Label>
              <Form.Select
                size="sm"
                style={{ textAlign: "right" }}
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
            onClick={btnShow}
          >
            עדכון שיעור
          </Button>
          {/* <Col xs={6}>
                <Button
                  id="subBtn"
                  variant="outline-primary"
                  onClick={BackToHomePage}
                >
                  חזרה לדף הבית
                </Button>
              </Col> */}


        </Card.Body>
        {/* <FCModalConfirm
            BackToHomePage={BackToHomePage}
            modalOpen={modalOpen}
            ClassDetailsForModal={ClassDetailsForModal}
            text="!השיעור התווסף/ עודכן בהצלחה"
          /> */}
      </Card>
    </Container>
  );
}