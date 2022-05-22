import React, { Component } from "react";
import "../StyleSheets/requestDets.css";
import { Link } from "react-router-dom";
class CCHandleRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestObject: JSON.parse(localStorage.getItem("singleReq")),
      post: false,
    };
  }
  // stam for check
  demo = () => {
    console.log(this.state.requestObject);
  };
  
  // transform gender from on char to word in order to show
  gender = (g) => {
    let gender = "";
    if (g === "m") {
      gender = "זכר";
    } else if (g === "f") {
      gender = "נקבה";
    } else {
      gender = "אחר";
    }
    return gender;
  };

  shortDate = (d) => {
    let date = new Date(d)
    let short = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() 
    return short
  }

  //go back button
  back = () => {
    let prev = (
      <Link to="/adminHomePage" style={{margin: "0 auto"}}>
        <div className="row" >
          <div className="col-sm-12">
            <button className="btn btn-secondary ">חזור</button>
          </div>
        </div>
      </Link>
    );
    return prev;
  };

  // show the approve deny buttons
  approveDenyBtns = () => {
    let btnsBox = (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <button className="btn btn-danger " onClick={() => this.handleRequest("rejected")}>דחיית בקשה</button>
          </div>
          <div className="col-sm-6">
            <button className="btn btn-success " onClick={() => this.handleRequest("approved")}>אישור בקשה</button>
          </div>
        </div>
        {this.back()}
      </div>
    );
    return btnsBox;
  };

  generatePassword = (n) => { // n = request number which is uniqe
    let randomPasswordstring = Math.random().toString(36).slice(-5);
    let userPassword = n + randomPasswordstring
    console.log(userPassword)
    return userPassword
  }

  // fetch - post new student to db - if ok = true - update request status 
  postStudent = (s) => {
    let request = this.state.requestObject;
    let generatedPassword = this.generatePassword(request.RequsetNum)
    let birthTypeDate = new Date(request.BirthDate)
    let StudentUrl =
      "http://localhost:49812/Student/PostNewStudent";
    let currentDate = new Date();
    const student = {
      StudentId: request.StudentId,
      FullName: request.FullName,
      Email: request.Email,
      Password: generatedPassword,
      Phone: request.Phone,
      Gender: request.Gender,
      BirthDate: birthTypeDate,
      City: request.City,
      RegistrationDate: currentDate
    };
    console.log(student);

    console.log("start")
    fetch(StudentUrl, {
      method: "POST",
      body: JSON.stringify(student),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        if (res.ok && request.type === "סופר סטודנט") {
          setTimeout(this.postSuper(s), 2000);
        }
        else if (res.ok && request.type === "סטודנט") {
          this.updateStatus(s);
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("FETCH PostStudent= ", result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    console.log("end")
  };

  // pass status to detrmine how to continue
  handleRequest = (s) => {
    if (s === "approved") {
      this.postStudent(s)
    }
    else {
      this.updateStatus(s)
    }
  }

  // put request - update status in db
  updateStatus = (status) => {
      const PutStatustUrl = "http://localhost:49812/requestToJoin/updateRequestStatus"
      let request = this.state.requestObject
      let updatedStatus =
      {
          StudentId: request.StudentId,
          RequestStatus: status
      }

      console.log('start');
      fetch(PutStatustUrl, {
        method: "PUT",
        body: JSON.stringify(updatedStatus),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          console.log("res=", res);
          console.log("res.status", res.status);
          console.log("res.ok", res.ok);
          if (res.ok) {
            setTimeout(this.movePage(status), 2000);
          }
          return res.json()
        })
        .then(
          (result) => {
            console.log("fetch updated Request Status= ", result);
          },
          (error) => {
            console.log("err post=", error);
          }
        );
      console.log("end");
  };

  //hide page and show message depending on request status
  movePage = (s) => {
    if (s === "approved") {
      console.log("aywa aleeeek");
      document.getElementById("msgBlock").style.display = "block";
      document.getElementById("fldBlock").style.display = "none";
    }
    else if (s === "rejected") {
      console.log("you are out dude");
      document.getElementById("succesMsg").innerHTML = "הבקשה נדחתה! הסטודנט לא הוכנס למערכת";
      document.getElementById("succesMsg").style.color = "red";
      document.getElementById("msgBlock").style.display = "block";
      document.getElementById("fldBlock").style.display = "none";
    }
    else {
      console.log("did not got in")
      console.log(this.state.post)
      console.log(s)
    }
  };

  // fetch - post new super student - if ok = true - update request status
  postSuper = (s) => {
    let request = this.state.requestObject;
    const SuperUrl =
      "http://localhost:49812/SuperStudent/PostNewSuperStudent";
    let superStudent = {
      StudentId: request.StudentId,
      StudyYear: request.StudyYear,
      Description: request.Description,
      DepartmentName: request.DepartmentName,
    };
    console.log(superStudent);

    console.log("start")
    fetch(SuperUrl, {
      method: "POST",
      body: JSON.stringify(superStudent),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        if (res.ok) {
          this.updateStatus(s);
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("FETCH PostSuperStudent= ", result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    console.log("end")
  };

  // show message after approve or deny
  msgBox = () => {
    let box = <div style={{textAlign: "center"}} id="msgBlock">
                <div id="succesMsg">! הבקשה אושרה בהצלחה</div>
                <div>{this.back()}</div>
              </div>
    return box;
  };

  requestDetails = () => {
    let request = this.state.requestObject;
    let head = <h2>בקשה מספר {request.RequsetNum}</h2>;
    let subHead = <h4> עבור {request.type}</h4>;
    let block = (
      <div className="col-md-8" style={{margin: "0 auto", direction:"rtl"}}>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">שם:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {request.FullName}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">תעודת זהות:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {request.StudentId}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">אימייל:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {request.Email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">מין:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.gender(request.Gender)}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">מקום מגורים:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {request.City}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">שנת לידה:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.shortDate(request.BirthDate)}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">מספר טלפון:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {request.Phone}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">תאריך הגשת בקשה:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.shortDate(request.RequestDate)}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">מצב בקשה:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {request.RequestStatus}
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
    let superBlock = (
      <div className="col-md-8" style={{margin: "0 auto", direction:"rtl"}}>
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">שנת לימודים:</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {request.StudyYear}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">מחלקה:</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {request.DepartmentName}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">תיאור:</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {request.Description}
              </div>
            </div>
          </div>
        </div>
      </div>
        
    )
    if (request.RequestStatus === "onHold") {
      if (request.type === "סופר סטודנט") {
          let showblock = (
            <div id="fldBlock">
              {head}
              {subHead}
              {block}
              {superBlock}
              {this.approveDenyBtns()}
            </div>
          );
          return showblock;
        }
        else {
          let showBlock = (
            <div id="fldBlock">
              {head}
              {subHead}
              {block}
              {this.approveDenyBtns()}
            </div>
          );
          return showBlock;
        }
    }
    else {
        if (request.type === "סופר סטודנט") {
          let showblock = (
            <div id="fldBlock">
              {head}
              {subHead}
              {block}
              {superBlock}
              {this.back()}
            </div>
          );
          return showblock;
        }
        else {
          let showBlock = (
            <div id="fldBlock">
              {head}
              {subHead}
              {block}
              {this.back()}
            </div>
          );
          return showBlock;
        }
    }
  }

  render() {
    return (
      <div>
        {this.requestDetails()}
        {this.demo()}
        {this.msgBox()}
      </div>
    );
  }
}
export default CCHandleRequest;