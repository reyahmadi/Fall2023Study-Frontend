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

function ControlDashboard(props){
    const[mean, setMean] = useState(0);

    useEffect(() => {
        console.log(props.you)
        setMean(props.grades.reduce((acc,v,i,a)=>(acc+v/a.length),0))
    }, [props.grades])
    return(
                <Card className="statistics-card" sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant='h4'>
                                Assignment: {props.assignment}
                            </Typography>
                            <hr/>

                            <br/>
                        <Grid container  justifyContent="center">
                            <Grid item lg={3} xs={12}>
                            <Typography variant="h5" gutterBottom>
                                Your grade: {props.you}
                            </Typography>
                            <Typography variant="subtitles2" gutterBottom>
                            <strong>High:</strong> {props.grades?.[props.grades.length - 1]}
                            </Typography>
                            <br/>
                            <Typography variant="subtitles2" gutterBottom>
                            <strong>Low:</strong> {props.grades?.[0]}
                            </Typography>
                            <br/>
                            <Typography variant="subtitles2" gutterBottom>
                            <strong>Mean:</strong>  {+mean.toFixed(2)}
                            </Typography>
                            </Grid>
                            <Grid item lg={9} xs={12}>
                            <BoxPlot data={props.grades} you={props.you}/>
                            </Grid>
                            <Button 
            className='q-button' 
            variant="contained"
            href='https://www.surveymonkey.ca/r/G9VWXKQ'
            >
                Take me to questionnaires!
            </Button>
                            </Grid>
                        </CardContent>
                    </Card>
    );
}

export default ControlDashboard;
