import React from 'react'
import { Container, Form, Card, Button} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FCModalAddNewClass from './FCModalAddNewClass';



export default function FCCreateNewClass() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const superId = state.superPassword;
  const superName = state.superName;
  const superEmail = state.superEmail;
  const UserDetails = {
    Email: superEmail,
    Password: superId
  }

  const [allTags, setAllTags] = useState([])
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classDate, setClassDate] = useState("");
  const [classStartTime, seTclassStartTime] = useState("");
  const [classEndTime, setClassEndTime] = useState("");
  const [classParticipants, setClassParticipants] = useState(0);
  const [classTags, setClassTags] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)

  //Class Details for Modal!
  const ClassDetailsForModal = {
    className:className,
    classDate:classDate,
    classStartTime:classStartTime,
    classEndTime:classEndTime,
    classParticipants:classParticipants
  }

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

  const postNewClass = () => {
    const Url = "http://localhost:49812/Class/PostNewClass"
    const newClassObj = {
      ClassDate: classDate,
      StartTime: classStartTime,
      EndTime: classEndTime,
      ClassName: className,
      SuperStudentId: superId,
      NumOfParticipants: classParticipants,
      ClassDescription: classDescription,
      SuperName: superName,
      Tags: classTags
    };
    console.log(newClassObj)
    console.log("start")
    fetch(Url,
      {
        method: 'POST',
        body: JSON.stringify(newClassObj),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
      .then(res => {
        console.log('res.ok', res.ok);
        if (res.ok) {
          // showMessage()
          setModalOpen(true)
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("FETCH PostRequest= ", result);
        },
        (error) => {
          console.log("err post=", error);
        });
    console.log("end")
  }
  // const showMessage = () => {
  //   document.getElementById("msg").style.display = "block"
  // }
  // const msgBox = () => {
  //   const style = {
  //     display: "none"
  //   }
  //   let msgDiv = <div style={style} id="msg">
  //     <div className='green'>השיעור נוצר בהצלחה!</div>
  //     <div><button onClick={() => navigate("/SuperHomePage", { state: UserDetails })}>חזור לדף הבית</button></div>
  //   </div>
  //   return msgDiv
  // }

  const BackToHomePage = () => {
    navigate("/SuperHomePage", { state: UserDetails })
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
            <h2 className="text-center mb-4">יצירת שיעור חדש</h2>
            <Form>
              <Form.Group className="mb-1">
                <Form.Label>שם השיעור</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="שם השיעור"
                  required
                  onChange={(e) => setClassName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>תיאור השיעור</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="הכנס את תיאור השיעור / מערך השיעור"
                  required
                  onChange={(e) => setClassDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>תאריך השיעור</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="תאריך השיעור"
                  required
                  onChange={(e) => setClassDate(e.target.value)}
                />
              </Form.Group><br />
              <Form.Group className="mb-1">
                <Form.Label>שעת התחלה</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="שעת התחלה"
                  required
                  onChange={(e) => seTclassStartTime(e.target.value)}
                />
              </Form.Group><br />
              <Form.Group className="mb-1">
                <Form.Label>שעת סיום</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="שעת סיום"
                  required
                  onChange={(e) => setClassEndTime(e.target.value)}
                />
              </Form.Group><br />
              <Form.Group className="mb-1">
                <Form.Label>מספר משתתפים</Form.Label>
                <Form.Select size="sm" required onChange={(e) => setClassParticipants(e.target.value)}>
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
            <Button
              id="subBtn"
              variant="success"
              onClick={() => postNewClass()}
            >
              יצירת שיעור
            </Button>
            {/* {msgBox()} */}           
          </Card.Body>
          <FCModalAddNewClass BackToHomePage={BackToHomePage} modalOpen={modalOpen} ClassDetailsForModal={ClassDetailsForModal}    />
        </Card>{" "}
      </div>
    </Container >
  )
}
