<<<<<<< Updated upstream
import { React, useState } from "react";
import { Container } from "react-bootstrap";
import FCLoginForm from "../Functional Components/FCLoginForm";
import { useNavigate } from "react-router-dom";
=======
import { React, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FCLoginForm from '../FuncionlComps/FCLoginForm';
>>>>>>> Stashed changes

export default function FCLoginPage() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const Navigate = useNavigate();

  const UpdateEmail = (e) => {
    let NewEmail = e.target.value;
    setEmail(NewEmail);
  };

  const UpdatePassword = (e) => {
    let NewPassword = e.target.value;
    setPassword(NewPassword);
  };

  const VerifyUser = () => {
    const Url = "http://proj.ruppin.ac.il/bgroup92/prod/login/PostFindUser";
    const user = {
      Email: Email,
      Password: Password,
    };
    console.log("start");
    fetch(Url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        if (res.ok) {
          PutDetailsToLocalStorage(user);
        }
        return res.json();
      })
      .then(
        (TypeOfUser) => {
          console.log(TypeOfUser);
          CheckTypeUser(TypeOfUser);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
<<<<<<< Updated upstream
  };
=======
  }
>>>>>>> Stashed changes

  const PutDetailsToLocalStorage = (userDetails) => {
    if (localStorage.getItem("user") !== undefined) {
      localStorage.removeItem("user");
    }
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const MassegeErrorLogin = () => {
    document.getElementById("errMsgLogin").style.display = "block";
<<<<<<< Updated upstream
  };
=======
  }
>>>>>>> Stashed changes

  const CheckTypeUser = (TypeOfUser) => {
    const UserDetails = {
      Email: Email,
      Password: Password,
    };

    

    if (TypeOfUser === "student") {
<<<<<<< Updated upstream
      Navigate("/studentHomePage", UserDetails);
    } else if (TypeOfUser === "superStudent") {
      Navigate("/SuperHomePage", UserDetails);
    } else if (TypeOfUser === "admin") {
      Navigate("/adminHomePage", UserDetails);
=======
      Navigate("/studentHomePage", UserDetails)
    } else if (TypeOfUser === "superStudent") {
      Navigate("/SuperHomePage", UserDetails)
    } else if (TypeOfUser === "admin") {
      Navigate("/adminHomePage", UserDetails)
>>>>>>> Stashed changes
    } else {
      console.log("not found");
      MassegeErrorLogin();
    }
  };

  const navigateToRegister = () =>{
    Navigate("/typeOfUser")
  }

  return (
<<<<<<< Updated upstream
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {
        <FCLoginForm
          UpdateEmail={UpdateEmail}
          UpdatePassword={UpdatePassword}
          VerifyUser={VerifyUser}
        />
      }
    </Container>
  );
=======

    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <FCLoginForm UpdateEmail={UpdateEmail} UpdatePassword={UpdatePassword} VerifyUser={VerifyUser} navigateToRegister={navigateToRegister} />
    </Container>
  )
>>>>>>> Stashed changes
}
