import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import makeAnimate from "react-select/animated";
import ClassCard from "../FuncionlComps/ClassCard";
import "../StyleSheets/searchClassesStyle.css";
import { useLocation, useNavigate } from "react-router-dom";

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
        console.log(tagList);
        const { data } = await axios.post(
          "http://localhost:49812/Class/GetClassesByTags",
          tagList
        );
        setClasses(data);
      }
    } catch (error) { }
  };

  const register = (classCode) => {
    console.log(classCode);
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user.Password);
    const requestToRegister = {
      StudentId: user.Password,
      ClassCode: classCode,
    };

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
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          navigate('/studentHomePage', {state: userDetails});
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    console.log("end1");
  };

  return (
    <Container
      className="w-100"
      style={{ maxWidth: "400px", textAlign: "center" }}
    >
      <h2>מצא את השיעור שמתאים לך!</h2>
      <Row style={{ alignItems: "center" }}>
        <Col xs={11}>
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
        <Col xs={1}>
          <Button variant="success" onClick={searchByTags}>
            חיפוש
          </Button>
        </Col>
      </Row>
      <Row>
        {classes.length !== 0 ? (
          <ClassCard classes={classes} register={register} />
        ) : (
          <h3>No classes yet</h3>
        )}
      </Row>
    </Container>
  );
}
