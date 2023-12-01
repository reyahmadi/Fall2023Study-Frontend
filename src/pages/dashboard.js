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
        "301604458",
        "301541572",
        "301571436",
        "301435977",
        "301540219",
        "301406223",
        "301572004",
        "301540221",
        // "301553411",
        "301540771",
        "301541003",
        "301447490",
        "301449620",
        "301326964",
        "301455052",
        "301416585",
        "301466395",
        "301416648",
        "301449899",
        "301474301",
        "301440038",
        "301451352",
        "301416738",
        "301472621",
        "301469709",
        "301462471",
        "301544396",
        "301466081",
        "301449578",
        "301420725",
        "301368470",
        "301416823",
        "301259909",
        "301416746",
        "301417092",
        // "301454667",
        "301372164",
        "301367821",
        "301457324",
        "301472937",
        "301416649",
        "301434299",
        "301468926"
        
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
            href={state.hasVisited ? '/' : state.class == '167' ? 'https://www.surveymonkey.ca/r/HMZSWSL' : 'https://www.surveymonkey.ca/r/H6VFQLH'}
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