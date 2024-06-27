import { Typography, Paper, Button, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { tokenAtom, memberAtom, lectureNameAtom, lectureNumberAtom, selectedNumberAtom } from '../../atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { url } from '../../config/config';
import { useNavigate } from 'react-router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import '../../config/activeTab.css';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Lecture = () => {
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const lectureName = useAtomValue(lectureNameAtom);
    const lectureNumber = useAtomValue(lectureNumberAtom);
    const setSelectedNumber = useSetAtom(selectedNumberAtom);
    const [contentList, setContentList] = useState([]);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState('');
    const [selectedWeek, setSelectedWeek] = useState()

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        const page = +panel.substr(5,1);
        setSelectedWeek(page);
    };

    const changeSelectedWeek = (e) => {
        let originData = e.target.value;
        let data = originData.substring(5);
        setSelectedWeek(data);
    }
    useEffect(() => {
        let formData = new FormData();
        formData.append("stdNo", member.id);
        formData.append("lecNo", lectureNumber);

        let detailUrl = `${url}/content`;
        axios.post(detailUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setContentList([...res.data.contentList])
            })
            .catch(err => {
                console.log(err)
            })
    }, [token, lectureName, lectureNumber, member])

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>강의콘텐츠</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            과목
                        </Link>
                        <Link color="inherit" underline='none'>
                            {lectureName}
                        </Link>
                        <Link color="#4952A9" underline='none'>
                            <b>강의콘텐츠</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                {/* ------Your content start------! */}
                <Grid container>
                    <Grid item xs={12} sx={{ height: 30 }} />
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <div style={{ display: "flex", marginBottom:60 }}>
                            {contentList.length !== 0 && (contentList.map(content => (
                                <Box
                                    height={65}
                                    width={65}
                                    my={4}
                                    display="flex"
                                    alignItems="center"
                                    gap={4}
                                    p={2}
                                    id={(content.week == selectedWeek ) ? "selectedWeek" : ""}
                                    onClick={() => {
                                        setSelectedWeek(`${content.week}`)
                                        setExpanded(`panel${content.week}`);
                                    }}
                                    sx={{ border: '5px solid #1F3468', marginRight: 2, padding:0, margin:"0 auto", color:"#1F3468", cursor:"pointer" }}>
                                    <Typography variant='h6' sx={{ margin: "0 auto" }}>{content.twoCharacterWeek}</Typography>
                                </Box>
                            )))}
                        </div>
                        <div>
                            {contentList.length !== 0 && (contentList.map(content => (
                                <Accordion expanded={expanded === `panel${content.week}`} onChange={handleChange(`panel${content.week}`)}>
                                    <AccordionSummary aria-controls={`panel${content.week}d-content`} id={`panel${content.week}d-header`} sx={{height:70, border:0}}>
                                        <Typography sx={{fontSize:22}}>{content.week}주차</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ display: "flex", height:70 }}>
                                        <Typography sx={{ margin: "auto", marginLeft: 0, fontSize:18 }}><b>{content.count}차시</b></Typography>
                                    </AccordionDetails>
                                    <AccordionDetails sx={{ display: "flex", height:70 }}>
                                        <Typography sx={{ margin: "auto", marginLeft: 2, fontSize:18 }}>{content.count}차시</Typography>
                                        <Button variant="contained"
                                            size="small"
                                            sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width: 80, verticalAlign: "middle", float: "right", marginRight: 4 }}>{content.status}</Button>
                                    </AccordionDetails>
                                    {content.videoName &&
                                        <AccordionDetails sx={{ display: "flex", height:70 }}>
                                            <Typography sx={{ margin: "auto", marginLeft: 2, fontSize:18 }}>{content.videoName}</Typography>
                                            <Button variant="contained"
                                                size="small"
                                                onClick={() => navigate(`video`)}
                                                sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width: 80, verticalAlign: "middle", float: "right", marginRight: 4 }}>학습하기</Button>
                                        </AccordionDetails>
                                    }
                                    {content.materialTitle &&
                                        <AccordionDetails sx={{ display: "flex", height: 70 }}>
                                            <Typography sx={{ margin: "auto", marginLeft: 2, fontSize:18 }}>{content.materialTitle}</Typography>
                                            <Button variant="contained"
                                                size="small"
                                                sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width: 80, verticalAlign: "middle", float: "right", marginRight: 4 }}>다운로드</Button>
                                        </AccordionDetails>
                                    }
                                    {content.homeworkTitle &&
                                        <AccordionDetails sx={{ display: "flex", height: 70 }}>
                                            <Typography sx={{ margin: "auto", marginLeft: 2, fontSize:18 }}>{content.homeworkTitle}</Typography>
                                            <Button variant="contained"
                                                size="small"
                                                onClick={()=>{setSelectedNumber(content.homeworkNumber); navigate(`/student/${lectureNumber}/sumbit-homework`);}}
                                                sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width: 80, verticalAlign: "middle", float: "right", marginRight: 4 }}>제출</Button>
                                        </AccordionDetails>
                                    }
                                    <AccordionDetails>
                                        <Typography sx={{ margin: "auto", marginLeft: 0, fontSize:18 }}><b>{content.count2}차시</b></Typography>
                                    </AccordionDetails>
                                    <AccordionDetails sx={{ display: "flex", height: 70 }}>
                                        <Typography sx={{ margin: "auto", marginLeft: 2, fontSize:18 }}>{content.count2}차시</Typography>
                                        <Button variant="contained"
                                            size="small"
                                            sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width: 80, verticalAlign: "middle", float: "right", marginRight: 4 }}>{content.status2}</Button>
                                    </AccordionDetails>
                                    {content.videoName2 &&
                                        <AccordionDetails sx={{ display: "flex", height: 70 }}>
                                            <Typography sx={{ margin: "auto", marginLeft: 2, fontSize:18 }}>{content.videoName2}</Typography>
                                            <Button variant="contained"
                                                size="small"
                                                onClick={() => navigate(`video`)}
                                                sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width: 80, verticalAlign: "middle", float: "right", marginRight: 4 }}>학습하기</Button>
                                        </AccordionDetails>
                                    }
                                    {content.materialTitle2 &&
                                        <AccordionDetails sx={{ display: "flex", height: 70 }}>
                                            <Typography sx={{ margin: "auto", marginLeft: 2, fontSize:18 }}>{content.materialTitle2}</Typography>
                                            <Button variant="contained"
                                                size="small"
                                                sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width: 80, verticalAlign: "middle", float: "right", marginRight: 4 }}>다운로드</Button>
                                        </AccordionDetails>
                                    }
                                    {content.homeworkTitle2 &&
                                        <AccordionDetails sx={{ display: "flex", height: 70 }}>
                                            <Typography sx={{ margin: "auto", marginLeft: 2, fontSize:18 }}>{content.homeworkTitle2}</Typography>
                                            <Button variant="contained"
                                                size="small"
                                                onClick={()=>{setSelectedNumber(content.homeworkNumber2); navigate(`/student/${lectureNumber}/sumbit-homework`);}}
                                                sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width: 80, verticalAlign: "middle", float: "right", marginRight: 4 }}>제출</Button>
                                        </AccordionDetails>
                                    }
                                </Accordion>
                            )))}
                        </div>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>


                {/* ------Your content end------! */}
                <br />
            </Paper>
        </Grid>
    )
}

export default Lecture;