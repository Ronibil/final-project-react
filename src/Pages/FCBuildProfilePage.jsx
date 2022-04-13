import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// not finished, please don't touch :)
export default function FCSuperHomePage() {
  const [allDeptments, setAllDeptments] = useState([]);
  const [department, setDepartment] = useState("");
  const [studyYear, setStudyYear] = useState("בחר שנת לימוד");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [reqNum, setReqNum] = useState("");
  const [post, setPost] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrlDepartments =
        "http://proj.ruppin.ac.il/bgroup92/prod/department/getall";
      const { data } = await axios.get(apiUrlDepartments);
      setAllDeptments(data);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = { image, department, studyYear, description };
  };

  return (
    <div>
      <h2>דף בניית פרופיל</h2>
      <Form onSubmit={handleSubmit}>
        <Image
          src={image}
          alt="no image"
          style={{ width: "120px", height: "120px" }}
        />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>העלאת תמונה</Form.Label>
          <Form.Control
            type="file"
            id="formFile"
            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>שם מחלקה &nbsp;</Form.Label>
          <Form.Select
            size="sm"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option>בחר שם מחלקה</option>
            {allDeptments.map((dep) => (
              <option value={dep.DepartmentName} key={dep.DepartmentName}>
                {dep.DepartmentName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>שנת לימוד &nbsp;</Form.Label>
          <Form.Select
            size="sm"
            value={studyYear}
            onChange={(e) => setStudyYear(e.target.value)}
            required
          >
            <option>בחר שנת לימוד</option>
            <option value="1"> 'שנה א</option>
            <option value="2"> 'שנה ב</option>
            <option value="3"> 'שנה ג</option>
            <option value="4"> 'שנה ד</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ספר קצת על עצמך:&nbsp;</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">שליחת בקשה</Button>
      </Form>
      <div id="fldBlock">
        {this.send()}
        {this.back()}
      </div>
      <div id="succesMsg">
        ! הבקשה נשלחה בהצלחה
        <div>
          <Link to="/">
            <button>עבור לדף הראשי</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
