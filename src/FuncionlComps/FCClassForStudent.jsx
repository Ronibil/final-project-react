import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LogoComponent from "../Elements/LogoComponent";
import FCBottomNavigation from "../FuncionlComps/FCBottomNavigation";
import FCClassCard from "../FuncionlComps/FCClassCard";
import FCModalAreYouSure from "../FuncionlComps/FCModalAreYouSure";
import FCModalConfirm from "../FuncionlComps/FCModalConfirm";
import FCModalStars from "../FuncionlComps/FCModalStars";


export default function FCClassForStudent() {
  // const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState({});
  const [classesHistory, setClassesHistory] = useState([]);
  const [futreClasses, setFutreClasses] = useState([]);

  //modal
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [classDetails, setClassDetails] = useState();
  const [confirmModal, setConfirmModal] = useState(false);
  const [starsModal, setStarsModal] = useState(false)
  const [classType, setClassType] = useState("future")

  const location = useLocation();
  const { state } = location;

  const userDetails = {
    Email: state.Email,
    Password: state.Password,
    StudentId: studentDetails.StudentId
  };

  useEffect(() => {
    const url = "http://localhost:49812/Student/GetStudentLandingPageDetails";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log("FETCH PostRequest= ", result);
          setStudentDetails({
            StudentId: result.StudentId,
            FullName: result.FullName,
          });
          setClassesHistory(result.ClassesHistory);
          setFutreClasses(result.FutreClasses);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, []);



  const DeleteStudentFromClass = (classCode) => {
    const Url = "http://localhost:49812/Student/DeleteStudentFromClass";
    const classToDelete = {
      StudentId: studentDetails.StudentId,
      ClassCode: classCode,
    };
    fetch(Url, {
      method: "DELETE",
      body: JSON.stringify(classToDelete),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res.ok", res.ok);
        if (res.ok) {
          setAreYouSureModal(false);
          setConfirmModal(true);
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          let newFutreClasses = futreClasses.filter(
            (c) => c.ClassCode !== classCode
          );
          setFutreClasses(newFutreClasses);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  const HideModalAreYouSure = () => {
    setAreYouSureModal(false);
  };

  const BackToHomePage = () => {
    setConfirmModal(false);
  };

  const ShowModaAreYouSure = (ClassDetails2Remove) => {
    setAreYouSureModal(true);
    let classToRemove = {
      classCode: ClassDetails2Remove.ClassCode,
      classDate: ClassDetails2Remove.ClassDate,
      classEndTime: ClassDetails2Remove.EndTime,
      className: ClassDetails2Remove.ClassName,
      classParticipants: ClassDetails2Remove.NumOfParticipants,
      classStartTime: ClassDetails2Remove.StartTime,
    };
    console.log(classToRemove);
    setClassDetails(classToRemove);
  };

  const ShowModalStars = (classCode) => {
    setStarsModal(true);
    console.log(classCode);
    console.log(studentDetails);
  }

  const HideModalStars = () => {
    setStarsModal(false);
  };


  return (
    <Container className="min-vh-100 d-flex align-items-center flex-column text-center" style={{ backgroundColor: "#FFFFFF" }}>
      <LogoComponent />
      {classDetails !== undefined ? (
        <>
          <FCModalAreYouSure
            isOpen={areYouSureModal}
            modalHide={HideModalAreYouSure}
            btnFunc={DeleteStudentFromClass}
            parameter={classDetails.classCode}
            text="?האם אתה בטוח שברצונך למחוק שיעור זה"
          />
          <FCModalConfirm
            modalOpen={confirmModal}
            BackToHomePage={BackToHomePage}
            ClassDetailsForModal={classDetails}
            text="!השיעור נמחק בהצלחה"
          />
        </>
      ) : (
        ""
      )}
      <h2 style={{ marginBottom: 25 }}>ברוכים הבאים - {studentDetails.FullName}</h2>
      <div className="d-flex flex-row" style={{ marginBottom: 10 }}>
        <Button onClick={() => setClassType("future")} style={{ borderRadius: 15, width: "120%", margin: 5, background: "#A2D5AB", border: "solid #4B8673 2px" }} >שיעורים עתידיים</Button>
        <Button onClick={() => setClassType("history")} style={{ borderRadius: 15, width: "120%", margin: 5, background: "#A2D5AB", border: "solid #4B8673 2px" }}>היסטוריית שיעורים</Button>
      </div >
      {classType === 'future' ? (
        <>
          {futreClasses.length === 0 ? (
            <div className="m-5" >
              <h5>לא קיימים שיעורים עתידיים</h5>
              <h6>שיעורים אליהם אתם רשומים יופיעו כאן</h6>
            </div>
          ) : (
            <>
              <h3>שיעורים עתידיים</h3>
              <div style={{ width: "100%", height: 400, background: "#F7FBFC", overflow: "auto", boxShadow: "0px 0px 8px 0px black", borderRadius: 15 }}>
                {futreClasses.map((c, index) => (
                  <FCClassCard
                    key={index}
                    classToCard={c}
                    type="studentFutre"
                    ShowModaAreYouSure={ShowModaAreYouSure}
                    studentDetails={userDetails}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {classesHistory.length > 0 ? (
            <>
              <h3>היסטוריית שיעוריים</h3>
              <div style={{ width: "100%", height: 400, background: "#F7FBFC", overflow: "auto", boxShadow: "0px 0px 8px 0px black", borderRadius: 15 }}>
                  {classesHistory.map((c, index) => (
                    <FCClassCard
                      key={index}
                      classToCard={c}
                      type="studentHistory"
                      ShowModalStarsBtn={ShowModalStars}
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="m-5" >
              <h5>אין היסטוריית שיעורים</h5>
              <h6>שיעורים שעברתם באפליקצייה יופיעו כאן</h6>
            </div>
          )}
        </>
      )
      }

      {
        starsModal === false ? (
          ""
        ) : (
          <>
            <FCModalStars
              isOpen={starsModal}
              starsModalHide={HideModalStars}
            />
          </>
        )
      }
      {
        userDetails === undefined ? (
          ""
        ) : (
          <FCBottomNavigation
            UserDetails={userDetails}
          />
        )
      }
    </Container >
  )
}
