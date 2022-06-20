import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function FCTagsRequestTable({tagsRequestArr}) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandState, setExpandState] = useState({});
  //const [requestsArr, setRequestArr] = useState([])
  
  let requestsArr = tagsRequestArr
  const handleEpandRow = (event, requestId) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(requestId);

    let obj = {};
    isRowExpanded ? (obj[requestId] = false) :  (obj[requestId] = true);
    setExpandState(obj);

    const newExpandedRows = isRowExpanded ?
          currentExpandedRows.filter(id => id !== requestId) :
          currentExpandedRows.concat(requestId);

    setExpandedRows(newExpandedRows);
  }

  const postTag = (t, s) => {
    const newTagUrl = "http://localhost:49812/Tags/PostNewTag"
    const newTag = t
    console.log("start");
    fetch(newTagUrl, {
      method: "POST",
      body: JSON.stringify(newTag),
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
          updateTagStatus(t, s)
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("FETCH Post Tag= ", result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    console.log("end");
  }

  const updateTagStatus = (tag, status) => {
    const putTagStatusUrl = "http://localhost:49812/tagRequest/updateTagStatus"
    const updateTagObj = {
      TagName: tag,
      RequestStatus: status
    }
    console.log('start');
      fetch(putTagStatusUrl, {
        method: "PUT",
        body: JSON.stringify(updateTagObj),
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
            removeRow(tag)
          }
          return res.json()
        })
        .then(
          (result) => {
            console.log("fetch updated Status= ", result);
          },
          (error) => {
            console.log("err put=", error);
          }
        );
      console.log("end");
  }

  const removeRow = (t) => {
    let newRequestArr = []
    newRequestArr = requestsArr.map(r => {
      r.Tags.filter(tag => tag.TagName !== t)
      return r
    })
    requestsArr = newRequestArr
    document.getElementById(t).style.display = "none"
  }

  return(
    <Container dir='rtl'>
      <Row>
        <Col>
          <h1> בקשות({ requestsArr.length })</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Table responsive variant="dark">
            <thead>
                <tr>
                  <th>שם סטודנט</th>
                  <th>עבור שיעור</th>
                  <th>בתאריך</th>
                  <th>תגיות</th>
                </tr>
            </thead>
            <tbody>
            {
              requestsArr.map((request) =>
              <>
                <tr key={request.TagRequestNum}>
                    <td>
                      {request.StudentName}
                    </td>
                    <td>
                      {request.ClassName}
                    </td>
                    <td>
                      {request.RequestDate}
                    </td>
                    <td>
                      <Button
                          variant="link"
                          onClick={event => handleEpandRow(event, request.TagRequestNum)}>
                          {
                            expandState[request.TagRequestNum] ?
                              'הסתר' : 'הצג'
                          }
                      </Button>
                    </td>
                </tr>
                <>
                {
                  expandedRows.includes(request.TagRequestNum) ?
                  
                  <tr>
                    <td colSpan="6">
                      <div style={{backgroundColor: '#343A40', color: '#FFF', padding: '10px'}}>
                        <h2> תגיות </h2>
                        {request.Tags.map((t) => 
                        <>
                        <ul key={t} id={t}>
                            <li>
                              <span><b>שם תגית:</b></span> {' '}
                              <span> {t} </span> {' '}
                              <span><Button variant='success' onClick={(e) => postTag(t, "approved")}>אישור</Button></span> {' '}
                              <span><Button variant='danger' onClick={(e) => updateTagStatus(t, "rejected")}>דחייה</Button></span>
                            </li>
                        </ul>
                        </>
                        )}
                      </div>
                    </td>
                  </tr> : null
                }
                </>
              </> 
              )}
            </tbody>
          </Table>
       </Col>
      </Row>
    </Container>
  )
};