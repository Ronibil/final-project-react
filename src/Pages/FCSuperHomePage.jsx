import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FCFormSuperDetails from "../FuncionlComps/FCFormSuperDetails";
import { Container } from "react-bootstrap";

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
            NumOfClass: result.NumOfClass,
          });
          setClassHistory(result.ClassesHistory);
          setClassFutre(result.FutreClasses);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, []);

  const runPage = () => {
    if (superDetails !== undefined) {
      return <>{<FCFormSuperDetails superDetails={superDetails} />}</>;
    } else {
      return (
        <>
          <h2>חכה רגע</h2>
        </>
      );
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "30vh" }}
    >
      {runPage()}
    </Container>
  );
}
