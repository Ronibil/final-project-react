import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function FCTypeOfUser() {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: "center",
      paddingTop: 120
    }}>
      <h1>?מי תרצו להיות</h1>
      <h4> :בחרו את מטרת השימוש שלכם באפליקציה</h4><br /><br />
      <div>
        <Button variant="outline-primary" onClick={() => navigate("/StudentRequestPage")}>
          סטודנט
        </Button>
        <br />
        <br />
        <Button variant="outline-primary" onClick={() => navigate("/SuperStudentRequestPage")}>
          סופר סטודנט (מורה פרטי)
        </Button>
      </div>
    </div>
  )
}
