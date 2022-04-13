import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Button, Row, FormSelect, Col } from "react-bootstrap";
import { ReactTags } from "react-tag-autocomplete";
import ClassCard from "../Functional Components/ClassCard";
import "../StyleSheets/searchClassesStyle.css";
import { useNavigate } from "react-router-dom";

export default function SearchClassesPage() {
  const [selctedOption, setSelctedOption] = useState("");
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

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

  const onDelete = useCallback(
    (tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags]
  );

  const onAdd = useCallback(
    (newTag) => {
      setTags([...tags, newTag]);
    },
    [tags]
  );

  const addTag = () => {
    const tagList = suggestions.find((value) => value.value === selctedOption);

    if (tagList) {
      onAdd(tagList);
      setSelctedOption("");
    }
  };

  const selectTag = (e) => {
    setSelctedOption(parseInt(e.target.value, 0));
  };

  const clearTag = () => {
    setTags([]);
  };

  const searchByTags = async () => {
    let tagList = tags.map((tag) => ({ TagName: tag.label }));
    const { data } = await axios.post(
      "http://localhost:49812/Class/GetClassesByTags",
      tagList
    );
    setClasses(data);
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
          navigate("/home");
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    console.log("end1");
  };

  return (
    <Container>
      <h3>מצא את השיעור שמתאים לך!</h3>
      <Row>
        <Col xs={10}>
          <ReactTags
            // labelText="בחר תגיות"
            selected={tags}
            suggestions={suggestions}
            onAdd={onAdd}
            onDelete={onDelete}
            // noOptionsText="לא נמצאו תגיות התואמות את החיפוש"
          />
        </Col>
        <Col xs={2}>
          <Button variant="success" onClick={searchByTags}>
            חיפוש
          </Button>
        </Col>
      </Row>
      <br />
      <Row className="controls">
        <Col xs={8}>
          <FormSelect
            name="suggestions"
            value={selctedOption}
            onChange={selectTag}
          >
            <option value="" />
            {suggestions?.map((suggestion) => {
              return (
                <option value={suggestion.value} key={suggestion.value}>
                  {suggestion.label}
                </option>
              );
            })}
          </FormSelect>
        </Col>
        <Col xs={4}>
          <Button variant="success" size="sm" onClick={addTag}>
            הוסף תגית
          </Button>{" "}
          <Button variant="success" size="sm" onClick={clearTag}>
            נקה תגיות
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
