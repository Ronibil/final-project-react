import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Table, Row, Col } from "react-bootstrap";
import LogoComponent from "../Elements/LogoComponent";
class CCAdminHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrToShow: []
    };
  }

  // get request - get all requests in db (students/supers) - fetch get
  componentDidMount = () => {
    let requestUrl =
      "https://proj.ruppin.ac.il/bgroup92/prod/requestToJoin/getall";
    let superRequestUrl =
      "https://proj.ruppin.ac.il/bgroup92/prod/RequestToJoinSuper/getall";

    //console.log("start1")
    fetch(requestUrl, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res=", res);
        //console.log("res.status", res.status);
        //console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          //console.log("fetch btnFetchGetStudentRequests= ", result);
          this.setState({ studentRequests: result });
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
    //console.log("end1")

    //console.log("start2")
    fetch(superRequestUrl, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res=", res);
        //console.log("res.status", res.status);
        //console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          //console.log("fetch btnFetchGetSuperRequests= ", result);
          this.setState({ superRequests: result });
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
    //console.log("end2")
  };

  devideRequests = (s) => {
    let requestsOnHold = this.state.studentRequests.filter(
      (r) => r.RequestStatus === s
    );
    let combinedRequests = requestsOnHold.map((req) => {
      let superReq = this.state.superRequests.find(
        (sr) => sr.RequsetNum === req.RequsetNum
      );
      return this.buildRequestsArray(superReq, req);
    });
    //console.log("All Requests - ", requestsOnHold);
    //console.log("Combined Requests - ", combinedRequests);
    this.setState({ arrToShow: combinedRequests });
    document.getElementsByTagName("table")[0].style.display = "block";
  };

  // return request json according to type
  buildRequestsArray = (sr, r) => {
    if (sr !== undefined) {
      let combinedJson = {
        type: "???????? ????????????",
        RequsetNum: sr.RequsetNum,
        StudentId: r.StudentId,
        FullName: r.FullName,
        Email: r.Email,
        Phone: r.Phone,
        Gender: r.Gender,
        BirthDate: r.BirthDate,
        City: r.City,
        RequestStatus: r.RequestStatus,
        RequestDate: r.RequestDate,
        StudyYear: sr.StudyYear,
        Description: sr.Description,
        DepartmentName: sr.DepartmentName,
      };
      return combinedJson;
    } else {
      let orgJson = {
        type: "????????????",
        RequsetNum: r.RequsetNum,
        StudentId: r.StudentId,
        FullName: r.FullName,
        Email: r.Email,
        Phone: r.Phone,
        Gender: r.Gender,
        BirthDate: r.BirthDate,
        City: r.City,
        RequestStatus: r.RequestStatus,
        RequestDate: r.RequestDate,
      };
      return orgJson;
    }
  };

  // show menu for manager
  aplicationStatusMenu = () => {
    let statusMenu = (
      <div style={{ margin: 20, textAlign: "center" }}>
        <Row style={{direction: "rtl"}}>
          <Col><Button onClick={() => this.devideRequests("onHold")} variant="warning">?????????? ??????????????</Button></Col>
          <Col><Button onClick={() => this.devideRequests("approved")} variant="success">?????????? ????????????</Button></Col>
          <Col><Button onClick={() => this.devideRequests("rejected")} variant="danger"> ?????????? ??????????</Button></Col>
          <Col style={{margin: "10px"}}><Link to="/adminTagsPage"><Button size="sm" variant="secondary">#?????????? ???? ??????????#</Button></Link></Col>
        </Row>
      </div>
    );
    return statusMenu;
  };

  // saves specific clicked request localy and pass it to next page
  goToRequestDetails = (obj) => {
    if (localStorage.getItem("singleReq") !== undefined) {
      localStorage.removeItem("singleReq");
    }
    localStorage.setItem("singleReq", JSON.stringify(obj));
  };

  // show request preview table
  showRequestsTable = (arr) => {
    const tableStyle = {
      direction: "rtl",
      fontSize: "15px",
      display: "none",
    }
    let rows = arr.map((r) => {
      let row = (
        <tr key={r.RequsetNum}>
          <td>{r.RequsetNum}</td>
          <td>{r.FullName}</td>
          <td>{r.type}</td>
          <td>
            <Link to="/reqDetails">
              <Button size="sm" variant="success" onClick={() => this.goToRequestDetails(r)}>
                ???????? ??????????
              </Button>
            </Link>
          </td>
        </tr>
      );
      return row;
    });

    let table = (
      <Table striped bordered hover style={tableStyle} variant="light">
        <thead>
          <tr>
            <td>???? ????????</td>
            <td>????</td>
            <td>??????</td>
            <td>???????? ??-</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
    return table;
  };

  render() {
    return (
      <Container>
        <div style={{textAlign: "center"}}><LogoComponent /></div>
        <h2 style={{ textAlign: "center" }}> ???? ???????? ???????? </h2>
        {this.aplicationStatusMenu()}
        {this.showRequestsTable(this.state.arrToShow)}
      </Container>
    );
  }
}
export default CCAdminHomePage;
