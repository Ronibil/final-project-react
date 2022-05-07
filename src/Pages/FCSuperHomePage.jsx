import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import FCFormSuperDetails from "../FuncionlComps/FCFormSuperDetails";
import { Container } from "react-bootstrap";
import FCButtonsForSuperHomePage from "../FuncionlComps/FCButtonsForSuperHomePage";
import axios from "axios";

export default function FCSuperHomePage() {
  const { state } = useLocation();
  const UserDetails = state;

  const [superDetails, setSuperDetails] = useState({});
  const [classHistory, setClassHistory] = useState([]);
  const [classFutre, setClassFutre] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = {
        Email: UserDetails.Email,
        Password: UserDetails.Password,
      };
      const urlGetSuperDetails =
        "http://localhost:49812/SuperStudent/GetSuperLandingPageDetails";
      const { data } = await axios.post(urlGetSuperDetails, user);
      console.log(data);
      setSuperDetails({
        StudentId: data.StudentId,
        FullName: data.FullName,
        Image: data.Image,
        Description: data.Description,
        DepartmentName: data.DepartmentName,
        StudyYear: data.StudyYear,
        NumOfRanks: data.NumOfRanks,
        RankAverage: data.RankAverage,
        NumOfClass: data.ClassesHistory.length,
      });
      setClassHistory(data.ClassesHistory);
      setClassFutre(data.FutreClasses);
    };
    fetchData();
  }, []);

  return (
    <Container
      className="align-items-center justify-content-center"
      style={{
        marginTop: 50,
      }}
    >
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
        "Loding..."
      )}
    </Container>
  );
}
