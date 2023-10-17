import { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgressWithLabel from '../components/circular-progress';
import axios from 'axios';
import { StudentNumber } from '../App';
import CircleRating from '../components/circle-rating';
import BoxPlot from '../components/boxplot'
import { useLocation } from 'react-router-dom';
import ControlDashboard from './control-dashboard';
import baseURL from '../variables';

function Dashboard(props){
    const studentNumber = useContext(StudentNumber)
    const { state } = useLocation();
    const [peers, setPeers] = useState([]);
    const [you, setYou] = useState({});


    useEffect(() => {
        console.log(state)
        if(state){
            setYou(state.you);
            setPeers(state.peers);
        }
    }, [state])

    const questionnaireClicked = () => {
        axios.post(baseURL+'/exit', {student_number: studentNumber}, 
            {headers : {"Access-Control-Allow-Origin": "*"}})
            .then(res => {
              console.log(res)
            })
            .catch(err => console.log(err))
    }

    return(
        state.group === "control" ? 
        <ControlDashboard 
            grades={state.grades} 
            you={state.you}
            assignment={state.assignment}
        /> :
        <>
         <Card sx={{ minWidth: 250 }} style={{boxShadow: 'none'}}>
           <CardContent>
            {/* <Grid  container justifyContent="center" spacing={2}> */}
            {/* <Grid item xs={12} md={12} lg={12}> */}
            <Grid justifyContent="center" container>
            <Grid item xs={4} md={4} lg={4}>
                <Typography variant='h4'>
                    Assignment:
                </Typography>
                <Typography variant='h5'>
                    {state.assignment}
                </Typography>
            </Grid>
            <Grid item className="grade-card" xs={4} md={4} lg={4}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            You
                        </Typography>
                        <CircularProgressWithLabel value={you?.grade} />
                        <Typography variant="h6" gutterBottom>
                            Time spent: {you?.time}h
                        </Typography>
                        {/* <CircleRating /> */}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>

            </Grid>
            </Grid>
            {/* </Grid> */}
            {/* </Grid> */}
            <br/>
            <Grid container>
            {peers.map((row, i) => 
            <Grid className='grade-card' item xs={12} md={4} lg={4}>
                <Card sx={{ minWidth: 250 }} style={{marginRight: "5px", marginBottom: "5px"}}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Student {row.i}
                        </Typography>
                        <CircularProgressWithLabel value={row.grade} />
                        <Typography variant="h6" gutterBottom>
                            Time spent: {row.time}h
                        </Typography>
                        {/* <CircleRating /> */}
                    </CardContent>
                </Card>
            </Grid>
            )}
            </Grid>
            <br/>

            <Button 
            className='q-button' 
            variant="contained"
            target="_blank"
            href='https://www.surveymonkey.ca/r/G9VWXKQ'
            onClick={questionnaireClicked}
            >
                Take me to questionnaires!
            </Button>
            {/* </Grid>
            </Grid> */}
        </CardContent>
        </Card>
        </>
    )
}

export default Dashboard;