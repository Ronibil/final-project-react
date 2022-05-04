import React from "react";
import { Button, Container, Form, Card, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FCDetailsForSuperSignUp(props) {
  //קבלה של הנתונים שהסופר סטודנט מהדף הקודם
  const { state } = useLocation();
  const superDetails = state;
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [superDepartmet, setSuperDepartmet] = useState("");
  const [superStudyYear, setSuperStudyYear] = useState("");
  const [superDescription, setSuperDescription] = useState("");
  const [superImage, setSuperImage] = useState(null);

  const altImage =
    "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png";

  useEffect(() => {
    const apiUrlDepartments =
      "http://proj.ruppin.ac.il/bgroup92/prod/department/getall";
    fetch(apiUrlDepartments, {
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
          console.log("fetch btnFetchGetDepartments= ", result);
          setDepartments(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, []);

  const btnPostSuperStudentRequest = () => {
    const LocalUrl = "http://localhost:49812/requestToJoin/newRequest";
    let currentDate = new Date();
    let newSuperRequest = {
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
    // console.log(newSuperRequest);

    console.log("start");
    fetch(LocalUrl, {
      method: "POST",
      body: JSON.stringify(newSuperRequest),
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
    console.log("end");
  };

  // post new super student request to db - fetch post
  const PostSuper = (RequsetNum) => {
    const superUrl =
      "http://localhost:49812/RequestToJoinSuper/newSuperRequest";

    const superRequest = {
      RequsetNum: RequsetNum,
      StudyYear: superStudyYear,
      Description: superDescription,
      DepartmentName: superDepartmet,
      // Image: superImage,
    };
    console.log(superRequest);

    console.log("start");
    fetch(superUrl, {
      method: "POST",
      body: JSON.stringify(superRequest),
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
          console.log("FETCH PostSuperRequest= ", result);
          navigate("/");
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    console.log("end");
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
        <Card>
          <Card.Body align="center">
            <h2 className="text-center mb-4">יצירת פרופיל אישי</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>תמונת פרופיל</Form.Label> <br />
                <Image
                  className="mb-3"
                  style={{ width: 150 }}
                  src={superImage ? superImage : altImage}
                  alt={altImage}
                />
                <Form.Control
                  type="file"
                  id="formFile"
                  onChange={(e) => {
                    setSuperImage(URL.createObjectURL(e.target.files[0]));
                    console.log(e.target.files[0]);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>שם מחלקה</Form.Label>
                <Form.Select
                  onChange={(e) => setSuperDepartmet(e.target.value)}
                >
                  <option value="" defaultValue hidden>
                    בחר
                  </option>
                  {departments.map((d) => (
                    <option value={d.DepartmentName} key={d.DepartmentName}>
                      {d.DepartmentName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>{" "}
              <Form.Group className="mb-3">
                <Form.Label>שנת לימודים</Form.Label>
                {
                  <Form.Select
                    onChange={(e) => setSuperStudyYear(e.target.value)}
                  >
                    <option value="" defaultValue hidden>
                      בחר
                    </option>
                    <option value="1"> 'שנה א</option>
                    <option value="2"> 'שנה ב</option>
                    <option value="3"> 'שנה ג</option>
                    <option value="4"> 'שנה ד</option>
                  </Form.Select>
                }
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>תיאור קצר עלי</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setSuperDescription(e.target.value)}
                  placeholder="רקע קצר כדי שהסטודנטים יכירו אותך"
                  required
                />
              </Form.Group>
              <Button
                className="mb-3"
                id="subBtn"
                variant="success"
                onClick={() => btnPostSuperStudentRequest()}
              >
                שלח לאימות נתונים
              </Button>
            </Form>
          </Card.Body>
        </Card>{" "}
        <br />
      </div>
    </Container>
  );
}
