import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import './App.css';

function App() {

  const [depts, setDepts] = useState([]);
  const [deptID, setdeptID] = useState(0);
  const [deptName, setdeptName] = useState(``);
  const [location, setLocation] = useState(``);
  
  console.log(depts);

  var url = `http://localhost:8080/department/`
  
  const api = axios.create({
    baseURL: `http://localhost:8080/department/`
})


async function Load1details() {

  var object
  var arr = [];

  console.log(`http://localhost:8080/department/${deptID}`);

  await axios.get(`http://localhost:8080/department/${deptID}`)
    // .then(response => setDepts(Object.keys(response.data))) 
    .then(response => 
      // console.log(arr.push(response))
      object =  response.data
      
      ) 
      // setDepts(response.data))
    .catch(error => console.log(error))

  console.log(depts);
  console.log(arr.push(object))
  setDepts( arr)
}

  const Loaddetails = () => {

    
    console.log(url);
    axios.get(url)
      .then(response => setDepts(response.data))
      .catch(error => console.log(error))

    console.log(depts);

  }

  const postrequest = () => {
    var newDept = 
    {   
      "deptId":deptID,
      "deptName":deptName,
      "location":location
    }


    api.post(`/`, newDept)
                .then(response => { console.log(response) })
                .catch(err => console.log(err))

  }

  const putrequest = () => {
    var newDept = 
    {   
      "deptId":deptID,
      "deptName":deptName,
      "location":location
    }


    api.put(`/`, newDept)
                .then(response => { console.log(response) })
                .catch(err => console.log(err))

  
  
      Loaddetails()        
    }


  let deleterequest = ()=>{
    
    var delDept = {
  
        "deptId": deptID,
        "deptName": deptName,
        "location": location
    } 

    api.delete(`/`, 
    {data: delDept
    
    })
    .then(res=>{
      // alert(`A Record has been deleted`)
      console.log(res);
    })
    .catch(err=> {
      console.log(err);
    })

    Loaddetails();

  }






  return (
    <div>
      {/* Hello */}
      {/* <Button onClic >Load data</Button> */}
      {/* <button onClick={Loaddetails} >Load</button> */}
      <Container fluid    >
        <Row className="mt-4  pt-4">
          <Col lg={4} md={6} sm={9} className="p-3 m-auto shadow-lg rounded-lg bg-light">
            <Form className='bg-light'>
              <h4 className='text-center ' >Department Details</h4>
              <FloatingLabel controlId="floatingInput" label="Department ID" className="mb-3" autoComplete="off" >
                <Form.Control type="number" placeholder="Department ID" onChange={(e) => setdeptID(e.target.value)} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="Department Name" className="mb-3" autoComplete="off" >
                <Form.Control type="text" placeholder="Department Name" onChange={(e) => setdeptName(e.target.value)} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="Location" className="mb-3" autoComplete="off" >
                <Form.Control type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
              </FloatingLabel>

              <div className='text-center span2'>
                {/* <div className="d-grid ps-5 gap-2"> */}
                <Button type='button' variant="primary" className='mb-2 mt-2 m-3 btn-block' onClick={Loaddetails} >Find All</Button>
                <Button type='button' variant="success" className='mb-2 mt-2 m-3 btn-block'  onClick={Load1details} >Find</Button>
                <Button type='button' variant="warning" className='mb-2 mt-2 m-3 btn-block' onClick={postrequest} >Insert</Button>
                <Button type='button' variant="secondary" className='mb-2 mt-2 m-3 btn-block' onClick={putrequest} >Update</Button>
                <Button type='button' variant="danger" className='mb-2 mt-2 m-3 btn-block'   onClick={deleterequest} >Delete</Button>
              </div>

            </Form>
          </Col>
        </Row>

      </Container>
    <br/>
    <br/>
    
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Dept ID</th>
            <th>Department Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {depts.map((dept) =>
            <tr key={dept.deptId} >
              <td>{dept.deptId}</td>
              <td>{dept.deptName}</td>
              <td>{dept.location}</td>
            </tr>

          )}

        </tbody>
      </Table>


    </div>
  );
}

export default App;
