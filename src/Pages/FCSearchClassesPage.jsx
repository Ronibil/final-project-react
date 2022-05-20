import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import Select from "react-select";
import makeAnimate from "react-select/animated";
import FCClassCard from "../FuncionlComps/FCClassCard";
import "../StyleSheets/searchClassesStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import FCModalConfirm from "../FuncionlComps/FCModalConfirm";


export default function SearchClassesPage() {
  const { state } = useLocation();
  const userDetails = {
    Email: state.Email,
    Password: state.Password
  }

  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  //Modal
  const [confirmModal, setConfirmModal] = useState(false);
  const [classDetails, setClassDetails] = useState()

  const animatedComponents = makeAnimate();
  const customTheme = (theme) => {
    return {
      ...theme,

      color: {
        ...theme.colors,
        primary25: "green",
      },
    };
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

  const searchByTags = async () => {
    try {
      if (tags.length !== 0) {
        let tagList = tags.map((tag) => ({ TagName: tag.label }));
        const { data } = await axios.post(
          `http://localhost:49812/Class/GetClassesByTags/${userDetails.Password}`,
          tagList
        );
        setClasses(data);
        console.log(data);
      }
    } catch (error) { }
  };

  const register = (classCode) => {
    let user = JSON.parse(localStorage.getItem("user"));
    const requestToRegister = {
      StudentId: user.Password,
      ClassCode: classCode,
    };

    let classToModal = classes.find(c => c.ClassCode === classCode);
    let classToConfirmModal = {
      classCode: classToModal.ClassCode,
      classDate: classToModal.ClassDate,
      classEndTime: classToModal.EndTime,
      className: classToModal.ClassName,
      classParticipants: classToModal.NumOfParticipants,
      classStartTime: classToModal.StartTime
    };
    setClassDetails(classToConfirmModal);

    const url = "http://localhost:49812/Student/PostStudentToClass";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestToRegister),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res.ok", res.ok);
        if (res.ok) {
          setConfirmModal(true)
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  const BackToHomePage = () => {
    navigate('/studentHomePage', { state: userDetails })
  }



  return (
    <Container
      className="d-flex align-items-center flex-column"
      style={{
        marginTop: 50,
        marginBottom: 10,
      }}
    >
      <Card xs={12} style={{ width: "40rem" }}>
        <Card.Body align="center">
          {classDetails !== undefined ?
            <>
              <FCModalConfirm
                modalOpen={confirmModal}
                BackToHomePage={BackToHomePage}
                ClassDetailsForModal={classDetails}
                text="!הרשמה בוצעה בהצלחה"
              />
            </>
            :
            ""
          }

          <h2>!מצא את השיעור שמתאים לך</h2>
          <Row style={{ alignItems: "center" }}>
            <Col xs={10}>
              <Select
                theme={customTheme}
                placeholder="בחר תגיות"
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={setTags}
                isMulti
                isSearchable
                noOptionsMessage={() => "לא נמצאו תגיות"}
                className="basic-multi-select m-3"
                options={suggestions}
              />
            </Col>
            <Col xs={2}>
              <Button variant="success" onClick={searchByTags}>
                חיפוש
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {classes.length !== 0 ? (
                <>
                  {classes.map((c) => (
                    <FCClassCard
                      key={c.ClassCode}
                      classToCard={c}
                      type="SearchClass"
                      btnFunction={register}
                      studentDetails={userDetails}
                    />
                  ))
                  }</>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                onClick={BackToHomePage}
                variant="outline-primary"
              >
                חזרה לדף הבית
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
