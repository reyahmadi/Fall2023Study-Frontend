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
            hasVisited={state.hasVisited}
            questionnaireClicked={questionnaireClicked}
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
                    <CardContent className='grade-content'>
                        <Typography gutterBottom>
                            Your Grade
                        </Typography>
                        <CircularProgressWithLabel value={you?.grade} />
                        <Typography gutterBottom>
                            Time spent: <strong className='font-20'>{you?.time}h</strong>
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
            <div style={{fontSize: '20px'}}>Performance of your peers:</div> 
            <br/>
            <Grid container>
            {peers.map((row, i) => 
            <Grid className='grade-card' item xs={12} md={4} lg={4}>
                <Card sx={{ minWidth: 250 }} style={{marginRight: "5px", marginBottom: "5px"}}>
                    <CardContent class="grade-content">
                        <Typography gutterBottom>
                            Student {i+1}
                        </Typography>
                        <CircularProgressWithLabel value={row.grade} />
                        <Typography className='margin-top' gutterBottom>
                            Time spent: <strong className='font-20'>{row?.time}h</strong>
                        </Typography>
                        {/* <CircleRating /> */}
                    </CardContent>
                </Card>
            </Grid>
            )}
            </Grid>

            <Button 
            className='q-button' 
            variant="contained"
            target={state.hasVisited ? '' : "_blank"}
            href={state.hasVisited ? '/' : 'https://www.surveymonkey.ca/r/G9VWXKQ'}
            onClick={questionnaireClicked}
            >
                {state.hasVisited ? 'Exit' : 'Take me to questionnaires!'}
            </Button>
            {/* </Grid>
            </Grid> */}
        </CardContent>
        </Card>
        </>
    )
}

export default Dashboard;