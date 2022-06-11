import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FCFormSuperDetails from "../FuncionlComps/FCFormSuperDetails";
import { Container } from "react-bootstrap";
import FCButtonsForSuperHomePage from "../FuncionlComps/FCButtonsForSuperHomePage";
// import axios from "axios";


export default function FCSuperHomePage() {
  const { state } = useLocation();
  const UserDetails = state;

  const [superDetails, setSuperDetails] = useState({});
  const [classHistory, setClassHistory] = useState([]);
  const [classFutre, setClassFutre] = useState([]);

  useEffect(() => {
    console.log(UserDetails);
    const urlGetSuperDetails = "http://localhost:49812/SuperStudent/GetSuperLandingPageDetails";
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
            Image: null,
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



  // useEffect(() => {
  //   const fetchData = async () => {
  //     // const user = {
  //     //   Email: UserDetails.Email,
  //     //   Password: UserDetails.Password,
  //     // };

  //     const urlGetSuperDetails =
  //       "http://localhost:49812/SuperStudent/GetSuperLandingPageDetails";
  //     const { data } = await axios.post(urlGetSuperDetails, {
  //       Email: UserDetails.Email,
  //       Password: UserDetails.Password,
  //     });
  //     console.log(data);
  //     setSuperDetails({
  //       StudentId: data.StudentId,
  //       FullName: data.FullName,
  //       Image: null,
  //       Description: data.Description,
  //       DepartmentName: data.DepartmentName,
  //       StudyYear: data.StudyYear,
  //       NumOfRanks: data.NumOfRanks,
  //       RankAverage: data.RankAverage,
  //       NumOfClass: data.ClassesHistory.length,
  //     });
  //     setClassHistory(data.ClassesHistory);
  //     setClassFutre(data.FutreClasses);
  //   };
  //   fetchData();
  // }, []);

  return (
    <Container>
      {superDetails !== undefined ? (
        <>
          <FCFormSuperDetails superDetails={superDetails} />
          <FCButtonsForSuperHomePage
            DepartmentName={superDetails.DepartmentName}
            Description={superDetails.Description}
            StudyYear={superDetails.StudyYear}
            UserDetails={UserDetails}
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
