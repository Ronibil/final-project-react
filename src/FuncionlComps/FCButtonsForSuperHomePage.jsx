import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import "../StyleSheets/btnSuperStyle.css";

export default function FCButtonsForSuperHomePage({ UserDetails, superName }) {
  const navigate = useNavigate();
  const superDetails = {
    superEmail: UserDetails.Email,
    superPassword: UserDetails.Password,
    superName: superName
  }

  return (
    <div >
      <Card xs={12} style={{ width: '30rem' }}>
        <Card.Body align="center">
          <Row>
            <Col xs={6}><button className='btnSuper'>שיעורים עתידיים שלי</button></Col>
            <Col xs={6}><button className='btnSuper' onClick={() => navigate("/CreateNewClass", { state: superDetails })} style={{ backgroundColor: '#90EE90' }}>+ יצירת שיעור חדש</button></Col>
          </Row>
          <br />
          <Row>
            <Col xs={6}><button className='btnSuper' >עריכת הפרופיל שלי</button></Col>
            <Col xs={6}><button className='btnSuper'>היסטורית שיעורים</button></Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
