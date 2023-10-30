
import { useEffect, useState, createContext, useContext  } from 'react';
import {useNavigate } from "react-router";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { StudentNumber } from '../App';
import baseURL from '../variables'


function Login(props){
    const [loggedIn, setLoggedIn] = useState(false);
    const [input, setInput] = useState(false);
    const [error, setError] = useState(false);
    const [studentNumber, setStudentNumber] = useState(0);
    const navigate = useNavigate();


    const loginPressed = (e) => {
      axios.post(baseURL, {student_number: input}, 
      {headers : {"Access-Control-Allow-Origin": "*"}})
      .then(res => {
        console.log(res)
        if(res && res.data.loggedIn){
            props.setStudentNumber(input)
            navigate(
              "/dashboard", 
              {state: 
                {
                  group: res.data.group, 
                  assignment: res.data.assignment_name,
                  you: res.data.your_perf, 
                  peers: res.data.peers, 
                  grades: res.data.grades,
                  hasVisited: res.data.hasVisited,
                  class: res.data.class}})

        }
        else{
          setError(true);
        }
      })
      .catch(err => console.log(err))
    }

return (
    <StudentNumber.Provider value={studentNumber}>
    <div className="App">
      { !loggedIn ? 
       <Grid
       container
       spacing={0}
       direction="column"
       alignItems="center"
       justify="center"
      >
      <Card className="login-card" sx={{ minWidth: 275 }}>
        <CardContent>
          {error ?
          <Alert severity="error">This student number does not exist!</Alert> :
          <></>
          }
          <br/>
          <TextField
            id="studentNumber"
            label="Student Number"
            onChange={(e) => setInput(e.target.value)}
          />
          <br/>
          <br/>
        <Button variant="contained" size="medium" 
        onClick={loginPressed}>
          Login
        </Button>
        </CardContent>
      </Card>
      </Grid>
     : <div></div>}
    </div> 
    </StudentNumber.Provider>
    );
      }

export default Login;