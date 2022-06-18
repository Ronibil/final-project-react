import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FCFormSuperDetails from "../FuncionlComps/FCFormSuperDetails";
import { Container } from "react-bootstrap";
import FCButtonsForSuperHomePage from "../FuncionlComps/FCButtonsForSuperHomePage";
import LogoComponent from "../Elements/LogoComponent";
import FCBurgerComp from "../FuncionlComps/FCBurgerComp";


export default function FCSuperHomePage() {
  const { state } = useLocation();
  const UserDetails = state;

  const [superDetails, setSuperDetails] = useState({});
  const [classHistory, setClassHistory] = useState([]);
  const [classFutre, setClassFutre] = useState([]);

  useEffect(() => {
    console.log(UserDetails);
    const urlGetSuperDetails = "https://proj.ruppin.ac.il/bgroup92/prod/SuperStudent/GetSuperLandingPageDetails";
    fetch(urlGetSuperDetails, {
      method: "POST",
      body: JSON.stringify(UserDetails),
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
          setSuperDetails({
            StudentId: result.StudentId,
            FullName: result.FullName,
            ImagePath: result.ImagePath,
            Description: result.Description,
            DepartmentName: result.DepartmentName,
            StudyYear: result.StudyYear,
            NumOfRanks: result.NumOfRanks,
            RankAverage: result.RankAverage,
            NumOfClass: result.ClassesHistory.length,
          });
          setClassHistory(result.ClassesHistory);
          setClassFutre(result.FutreClasses);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, [])

  const userDetailsWithId = {
    Email: UserDetails.Email,
    Password: UserDetails.Password,
    StudentId: superDetails.StudentId
  }

  return (
    <Container className="d-flex align-items-center justify-content-center flex-column">
      {superDetails !== undefined ? (
        <>
          <LogoComponent />
          <FCBurgerComp userDetails={userDetailsWithId}/>
          <FCFormSuperDetails superDetails={superDetails} />
          <FCButtonsForSuperHomePage
            DepartmentName={superDetails.DepartmentName}
            Description={superDetails.Description}
            StudyYear={superDetails.StudyYear}
            UserDetails={userDetailsWithId}
            superName={superDetails.FullName}
            HistoryClass={classHistory}
            FutreClass={classFutre}
          />
        </>
      ) : (
        ""
      )}
    </Container>
  );
}
