import { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import CircularProgressWithLabel from '../components/circular-progress';
import axios from 'axios';
import { StudentNumber } from '../App';
import CircleRating from '../components/circle-rating';
import BoxPlot from '../components/boxplot'
import { useLocation } from 'react-router-dom';
import ControlDashboard from './control-dashboard';
import baseURL from '../variables';

export default function Dashboard(props){
    const blacklist = [
    ];
    const studentNumber = useContext(StudentNumber)
    const { state } = useLocation();
    const [peers, setPeers] = useState([]);
    const [you, setYou] = useState({});
    const [now,setNow] = useState(new Date());
    const [assgnmnt, setAssgnmnt] = useState(2);
    const [isConsentSent, setIsConsentSent] = useState(false);


    useEffect(() => {
        console.log(state)
        if(state){
            setYou(state.you);
            setPeers(state.peers);
        }
    }, [state])


    const handleAlignment = (e) => {
        setAssgnmnt(e.target.value)
  };

    const handleConsent = (value) => {
        axios.post(baseURL+'/consent', {student_number: studentNumber, consent: value}, 
        {headers : {"Access-Control-Allow-Origin": "*"}})
        .then(res => {
          setIsConsentSent(true);
        })
        .catch(err => console.log(err))        
    }

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
        <div className='main-container'>
        <Typography variant='h3'>
            Debriefing Script 
        </Typography>
        Thank you for your Participation. 

        We sincerely appreciate your involvement in this study. The purpose of this study was to delve into the influence of a dashboard showcasing the grades of six high-performing peers who completed their assignments in less time compared to you. We aimed to explore how such a display affects your motivation and emotions. 


        <Typography variant='h5'>
            Nature of the Study 
        </Typography>

        In your case, it's important to clarify that there were fewer than six classmates who fit the criteria of outperforming you in both time spent and grades achieved. This may have happened for various reasons, such as you achieved a high mark or your and other students reported time was too far apart. In such cases, to create a consistent context for our analysis, we introduced simulated data for these other peers, either by manipulating their grades, or time spent, and sometimes both. As a result, the dashboard you interacted with portrayed some fabricated students. 


        <Typography variant='h5'>
            Visual Representations 
        </Typography>

        Here is the depiction of the dashboards you encountered. The fabricated students are shown in  gray color while real students are in white. 
        <Card sx={{ minWidth: 250 }} style={{boxShadow: 'none'}}>
           <CardContent style={{border: "solid 1px #e9e9e9"}}>
            <ToggleButtonGroup
            className='toggle-button'
            value={assgnmnt}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            >
            <ToggleButton value={2} aria-label="left aligned">
            Assignment 2
            </ToggleButton>
            <ToggleButton value={3} aria-label="right aligned">
            Assignment 3
            </ToggleButton>
            </ToggleButtonGroup>
            <Grid justifyContent="center" container>
            <Grid item xs={4} md={4} lg={4}>
                <Typography variant='h5'>
                    {/* {state.assignment} */}
                </Typography>
            </Grid>
            <Grid item className="grade-card" xs={4} md={4} lg={4}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent className='grade-content'>
                        <Typography gutterBottom>
                            Your Grade
                        </Typography>
                        <CircularProgressWithLabel value={you?.[assgnmnt - 2]?.grade} />
                        <Typography gutterBottom>
                            Time spent: <strong className='font-20'>{you?.[assgnmnt - 2]?.time}h</strong>
                        </Typography>
                        {/* <CircleRating /> */}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                {/* <p style={{float: "right"}}>{now.toLocaleString()}</p> */}
            </Grid>
            </Grid>
            {/* </Grid> */}
            {/* </Grid> */}
            <br/>
            <div style={{fontSize: '20px'}}>Performance of your peers:</div> 
            <br/>
            <Grid container>
            {peers.slice((assgnmnt - 2) * 6, (assgnmnt - 1) * 6).map((row, i) => 
            <Grid 
            className={
                row['comparator_number'] == -1 ? 'fake-grade-card' : 'grade-card'
            }
            item 
            xs={12} md={4} lg={4}>
                <Card sx={{ minWidth: 250 }} style={{marginRight: "5px", marginBottom: "5px"}}>
                    <CardContent class="grade-content">
                        <Typography gutterBottom>
                            Student {i+1}
                        </Typography>
                        <CircularProgressWithLabel value={row.grade} />
                        <Typography  gutterBottom>
                            Time spent: <strong className='font-20'>{row?.time}h</strong>
                        </Typography>
                        {/* <CircleRating /> */}
                    </CardContent>
                </Card>
            </Grid>
            )}
            </Grid>

        </CardContent>
        </Card>
        <Typography variant='h5'>
            Honesty and Purpose 
        </Typography>

        We want to emphasize that the use of misleading data was solely intended to observe your responses in a specific scenario. Our objective was to uncover insights into decision-making processes under these conditions. This approach was approved by the Research Ethics Board prior to the study.  

        <Typography variant='h5'>
            Withdrawal and Data Usage 
        </Typography>

        We want you to feel entirely at ease with your participation. You hold the right to withdraw your data from the study without any consequences. This decision will not impact your course grade or your participation credit in any manner.  

        <Typography variant='h5'>
            Contact Information
        </Typography> 

        Should you have any inquiries or concerns regarding the study, its methodology, or your role in it, please don't hesitate to reach out to Reyhaneh at Reyhaneh_ahmadi_nokabadi@sfu.ca. We are more than happy to provide further information. 
        <Typography variant='h5'>
            Acknowledgment and Gratitude 
        </Typography>

    By checking the first button, you confirm that you comprehend the true nature of the study and the rationale behind the use of simulated data. Your engagement has significantly contributed to the advancement of our understanding in this field. We express our deepest gratitude for your participation. 
    <br/>
    {
        isConsentSent ? 
        <>
        <br/>
        <strong>Your response is recoreded. Thank you!</strong>
        </> :
        <>
        <Button className='debrief-button' variant="contained" onClick={() => handleConsent(true)}>
            I grant permission for researchers to utilize the data collected from my participation.
        </Button>
        <br/>
        <Button className='debrief-button' variant="contained" onClick={() => handleConsent(false)} color="error">
            I choose to discontinue my involvement in the study and request the removal of my data. 
        </Button>
        </>
    }
        </div>
        }
        </div>
        )
}