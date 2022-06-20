import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function FCTagsRequestTable({tagsRequestArr}) {
  
  // State variable to keep track of all the expanded rows
  // By default, nothing expanded. Hence initialized with empty array.
  const [expandedRows, setExpandedRows] = useState([]);

  // State variable to keep track which row is currently expanded.
  const [expandState, setExpandState] = useState({});

  const requestsArr = tagsRequestArr
  /**
   * This function gets called when show/hide link is clicked.
   */
  const handleEpandRow = (event, requestId) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(requestId);

    let obj = {};
    isRowExpanded ? (obj[requestId] = false) :  (obj[requestId] = true);
    setExpandState(obj);

    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded ?
          currentExpandedRows.filter(id => id !== requestId) :
          currentExpandedRows.concat(requestId);

    setExpandedRows(newExpandedRows);
  }

  return(
    <Container dir='rtl'>
      <Row>
        <Col>
          <h1> Users({ requestsArr.length })</h1>
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
                        <ul key={t}>
                            <li>
                              <span><b>שם תגית:</b></span> {' '}
                              <span> {t} </span> {' '}
                              <span><Button variant='success'>אישור</Button></span>
                              <span><Button variant='danger'>דחייה</Button></span>
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