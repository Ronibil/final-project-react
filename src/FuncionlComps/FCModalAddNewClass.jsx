import React from 'react';
import {Modal,Button } from 'react-bootstrap';
import { FcOk } from "react-icons/fc";
import "../StyleSheets/Modal.css";

function FCModalAddNewClass({ BackToHomePage,modalOpen,ClassDetailsForModal, text}) { 
  return (
   
    <Modal show={modalOpen}>
    <Modal.Dialog >
      <Modal.Header>
        <Modal.Title>{text}</Modal.Title>
      </Modal.Header>

      <Modal.Body className='ModalBody' >
        <div>
          <h2>
          <FcOk className='iconModal'></FcOk>
          </h2>
        </div>
        <hr />
        <h3>פרטי השיעור</h3>
        <b><p>נושא: {ClassDetailsForModal.className}</p></b>     
        <b><p>תאריך:{ClassDetailsForModal.classDate} </p></b>        
        <b><p>שעת התחלה:{ClassDetailsForModal.classStartTime} </p></b>        
        <b><p>שעת סיום:{ClassDetailsForModal.classEndTime} </p></b>
        <b><p>פרטני/קבוצתי:{ClassDetailsForModal.classParticipants >1 ? <>קבוצתי</>:<>פרטני</>} </p></b>
      </Modal.Body>

      <Modal.Footer className='divBackToHomePage'>        
        <Button className='btnBackToHome'  onClick={BackToHomePage} variant="success"><b>חזור לדף הבית</b></Button>
      </Modal.Footer>
    </Modal.Dialog>
    </Modal>

  )
}

export default FCModalAddNewClass