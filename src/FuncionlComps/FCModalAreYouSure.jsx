import React from 'react'
import { Modal, Button, Col, Row } from 'react-bootstrap';
import "../StyleSheets/Modal.css";

export default function FCModalAreYouSure({ text, isOpen, btnFunc, modalHide, parameter }) {
  return (
    <Modal show={isOpen}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex align-items-center justify-content-center" >
          <Row>
            <Col xs={6}>
              <Button className='btnBackToHome' onClick={modalHide} variant="danger"><b>לא</b></Button>
            </Col>
            <Col xs={6}>
              <Button className='btnBackToHome' onClick={() => btnFunc(parameter)} variant="success"><b>כן</b></Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  )
}
