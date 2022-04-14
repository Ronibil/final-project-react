import React from 'react'
import { Button, Container, Form, Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function FCDetailsForSuperSignUp(props) {
  //קבלה של הנתונים שהסופר סטודנט מהדף הקודם
  const { state } = useLocation()
  const superDetails = state;

  const [departments, setDepartments] = useState([]);
  // const [superImg, setSuperImg] = useState();// לטפל בהכנסת תמונה
  const [superDepartmet, setSuperDepartmet] = useState("");
  const [superStudyYear, setSuperStudyYear] = useState("");
  const [superDescription, setSuperDescription] = useState("");


  useEffect(() => {
    const apiUrlDepartments = "http://proj.ruppin.ac.il/bgroup92/prod/department/getall"
    fetch(apiUrlDepartments,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        return res.json()
      })
      .then(
        (result) => {
          console.log("fetch btnFetchGetDepartments= ", result);
          setDepartments(result)
        },
        (error) => {
          console.log("err post=", error);
        });
  }, []);

  const btnPostSuperStudentRequest = () => {
    const LocalUrl = "http://localhost:49812/requestToJoin/newRequest";
    let currentDate = new Date();
    let application = {
      StudentId: superDetails.StudentId,
      FullName: superDetails.FullName,
      Email: superDetails.Email,
      Phone: superDetails.Phone,
      Gender: superDetails.Gender,
      BirthDate: superDetails.BirthDate,
      City: superDetails.City,
      RequestStatus: "onHold",
      RequestDate: currentDate,
    };
    // console.log(application);

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
          PostSuper(result.RequsetNum);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    console.log("end")
  };

  // post new super student request to db - fetch post
  const PostSuper = (RequsetNum) => {
    const superUrl = "http://localhost:49812/RequestToJoinSuper/newSuperRequest"

    let superRequest = {
      RequsetNum: RequsetNum,
      StudyYear: superStudyYear,
      Description: superDescription,
      DepartmentName: superDepartmet
    }
    console.log(superRequest)

    console.log("start")
    fetch(superUrl,
      {
        method: 'POST',
        body: JSON.stringify(superRequest),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        if (res.ok) {
          this.setState({ post: true })
          setTimeout(this.movePage, 2500)
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("FETCH PostSuperRequest= ", result);
        },
        (error) => {
          console.log("err post=", error);
        });
    console.log("end")
  }

  // let sImg = (i) => {
  // setSuperImg(i.target.value);
  // };
  let Department = (d) => {
    setSuperDepartmet(d.target.value);
  };
  let StudyYear = (y) => {
    setSuperStudyYear(y.target.value);
  };
  let Description = (des) => {
    setSuperDescription(des.target.value);
  };

  // show list of departments
  const departmentsList = () => {
    let deps = departments.map(d => <option value={d.DepartmentName} key={d.DepartmentName}>{d.DepartmentName}</option>)
    return deps
  }
  // show list of study years
  const studyYears = () => {
    const yearsList = (
      <select onChange={StudyYear}>
        <option value="" defaultValue hidden>בחר</option>
        <option value="1" > 'שנה א</option>
        <option value="2" > 'שנה ב</option>
        <option value="3" > 'שנה ג</option>
        <option value="4" > 'שנה ד</option>
      </select>);
    return yearsList
  }

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
            <h2 className="text-center mb-4">יצירת פרופיל אישי</h2>
            <Form>
              <Form.Group className="mb-1" >
                <Form.Label>תמונת פרופיל</Form.Label>
                <div>
                  <img alt="Select your profile picture" />
                  <div>בחר תמונה</div>
                  <input type="file" name="myImage" />
                </div>
              </Form.Group><br />
              <Form.Group className="mb-1" >
                <Form.Label>שם מחלקה</Form.Label><br />
                <select onChange={Department}>
                  <option value="" defaultValue hidden >בחר</option>
                  {departmentsList()}
                </select>
              </Form.Group>{" "}
              <Form.Group className="mb-1" >
                <Form.Label>שנת לימודים</Form.Label><br />
                {studyYears()}
              </Form.Group>
              <Form.Group className="mb-1" >
                <Form.Label>תיאור קצר עלי</Form.Label>
                <Form.Control type="text" onChange={Description} placeholder="רקע קצר כדי שהסטודנטים יכירו אותך" required />
              </Form.Group>
              <br />
              <Button id="subBtn" variant="success" onClick={()=>btnPostSuperStudentRequest()}>
                שלח לאימות נתונים
              </Button>
              <br />
              <br />
            </Form>
          </Card.Body>
        </Card>{" "}
        <br />
      </div>
    </Container>
  )
}
