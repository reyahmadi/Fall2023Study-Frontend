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
    const blacklist = [
        "301173911",
        "301545941",
        "301449627",
        "301548552",
        "301543957",
        "301546390",
        "301542661",
        "301541927",
        "301545941",
        "301550350",
        "301559855",
        // "301604458",
        // "301417388",
        "301539864",
        // "301541657",
        "301544617",
        "301571150",
        // "301568596",
        "301542040",
        "301426553",
        "301401741",
        "301571105",
        "301557510",
        "301400943",
        "301554380",
        // "301477523",
        "301417433",
        "301249592",
        "301549386",
        "301543692",
        "301422377",
        "301403621",
        "301541572",
        "301436414",
        "301575523",
        "301467627",
        "301294427",
        "301588808",
        // "301469886",
        "301465651",
        "301564244",
        // "301397180",
        "301431734",
        "301425515",
        // "301545962",
        // "301563520",
        "301540260"
    ];
    const studentNumber = useContext(StudentNumber)
    const { state } = useLocation();
    const [peers, setPeers] = useState([]);
    const [you, setYou] = useState({});
    const [now,setNow] = useState(new Date());


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
        <div style={{maxWidth: "1200px"}}>
        {state.group === "control" ? 
        <ControlDashboard 
            grades={state.grades} 
            you={state.you}
            class={state.class}
            assignment={state.assignment}
            hasVisited={state.hasVisited}
            questionnaireClicked={questionnaireClicked}
        /> :
        blacklist.includes(state.student_number) ?
        <h5 className='small-message'>You still cannot see your grades for A3. 
        We will let you know when the dashboard is ready.</h5>
        :
        <>
         <Card sx={{ minWidth: 250 }} style={{boxShadow: 'none'}}>
           <CardContent>
            <Grid justifyContent="center" container>
            <Grid item xs={4} md={4} lg={4}>
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
                <p style={{float: "right"}}>{now.toLocaleString()}</p>
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
            href={state.hasVisited ? '/' : state.class == '167' ? 'https://www.surveymonkey.ca/r/HW8WLMK' : 'https://www.surveymonkey.ca/r/BGBGFN8'}
            onClick={questionnaireClicked}
            >
                {state.hasVisited ? 'Exit' : 'Take me to questionnaires!'}
            </Button>
            {/* </Grid>
            </Grid> */}
        </CardContent>
        </Card>
        </>
        }
        </div>
        )
}

export default Dashboard;