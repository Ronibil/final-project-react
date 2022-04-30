import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import FCFormSuperDetails from "../FuncionlComps/FCFormSuperDetails";
import { Container } from "react-bootstrap";
import FCButtonsForSuperHomePage from "../FuncionlComps/FCButtonsForSuperHomePage";

export default function FCSuperHomePage() {
  const { state } = useLocation();
  const UserDetails = state;

  const [superDetails, setSuperDetails] = useState({});
  const [classHistory, setClassHistory] = useState([]);
  const [classFutre, setClassFutre] = useState([]);


  useEffect(() => {
    const user = {
      Email: UserDetails.Email,
      Password: UserDetails.Password,
    };
    const urlGetSuperDetails =
      "http://localhost:49812/SuperStudent/GetSuperLandingPageDetails";

    fetch(urlGetSuperDetails, {
      method: "POST",
      body: JSON.stringify(user),
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
          console.log("fetch btnFetchGetSuperDetails= ", result);
          setSuperDetails({
            StudentId: result.StudentId,
            FullName: result.FullName,
            Image: result.Image,
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
    console.log("!!!!!!!!!!!!");
  }, []);
  
  return (
    <Container
      className="align-items-center justi fy-content-center"
      style={{ minHeight: "30vh" }}
    >
      {superDetails !== undefined ? <><FCFormSuperDetails superDetails={superDetails} /><FCButtonsForSuperHomePage DepartmentName={superDetails.DepartmentName}   Description={superDetails.Description}  StudyYear={superDetails.StudyYear}   UserDetails={UserDetails} superName={superDetails.FullName} /></> : "Loding..."}
    </Container>
  );
}
