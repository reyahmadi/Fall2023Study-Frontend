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
    return(
        state.group === "control" ? 
        <ControlDashboard 
            grades={state.grades} 
            you={state.you}
            assignment={state.assignment}
        /> :
        <>
         <Card style={{margin: '20px'}} sx={{ minWidth: 275 }}>
           <CardContent>
            <Grid  container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
                <Typography  variant='h4'>
                    Assignment: {state.assignment}
                    <hr/>

                </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
            <Grid container>
            <Grid item className="grade-card" xs={12} md={6} lg={1}>
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
            </Grid>
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
            
            <Grid container>
            {peers.map((row, i) => 
            <Grid className='grade-card' item xs={12} md={6} lg={4}>
                <Card sx={{ minWidth: 275 }}>
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
            <Button 
            className='q-button' 
            variant="contained"
            href='https://www.surveymonkey.ca/r/G9VWXKQ'
            >
                Take me to questionnaires!
            </Button>
            </Grid>
            </Grid>
        </CardContent>
        </Card>
        </>
    )
}

export default Dashboard;