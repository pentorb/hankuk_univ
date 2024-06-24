import { Typography, Paper, Button, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { tokenAtom, memberAtom, lectureNameAtom, lectureNumberAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import { url } from '../../config/config';
import { useNavigate } from 'react-router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

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
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
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
    const [contentList, setContentList] = useState([]);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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
    }, [])

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
                <div>
                    {contentList.length !== 0 && (contentList.map(content => (
                        <Accordion expanded={expanded === `panel${content.week}`} onChange={handleChange(`panel${content.week}`)}>
                            <AccordionSummary aria-controls={`panel${content.week}d-content`} id={`panel${content.week}d-header`}>
                                <Typography>{content.week}주차</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{content.count}차시</Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Typography variant='h7' sx={{verticalAlign:"middle"}}>{content.count}차시</Typography>
                                <Button variant="contained"
                                size="small"
                                sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90, verticalAlign:"middle", float:"right", marginRight:4 }}>{content.status}</Button>
                            </AccordionDetails>
                            {content.videoFile &&
                                <AccordionDetails>
                                    <Typography variant='h7' sx={{verticalAlign:"middle"}}>{content.videoName}</Typography>
                                    <Button variant="contained"
                                    size="small"
                                    sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90, verticalAlign:"middle", float:"right", marginRight:4 }}>학습하기</Button>
                                </AccordionDetails>
                            }
                            {content.materialFile &&
                                <AccordionDetails>
                                    <Typography variant='h7' sx={{verticalAlign:"middle"}}>{content.materialTitle}</Typography>
                                    <Button variant="contained"
                                    size="small"
                                    sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90, verticalAlign:"middle", float:"right", marginRight:4 }}>다운로드</Button>
                                </AccordionDetails>
                            }
                            {content.homeworkFile &&
                                <AccordionDetails>
                                    <Typography variant='h7' sx={{verticalAlign:"middle"}}>{content.homeworkTitle}</Typography>
                                    <Button variant="contained"
                                    size="small"
                                    sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90, verticalAlign:"middle", float:"right", marginRight:4 }}>제출</Button>
                                </AccordionDetails>
                            }
                            <AccordionDetails>
                                <Typography>{content.count2}차시</Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Typography variant='h7' sx={{verticalAlign:"middle"}}>{content.count2}차시</Typography>
                                <Button variant="contained"
                                size="small"
                                sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90, verticalAlign:"middle", float:"right", marginRight:4 }}>{content.status2}</Button>
                            </AccordionDetails>
                            {content.videoFile2 &&
                                <AccordionDetails>
                                    <Typography variant='h7' sx={{verticalAlign:"middle"}}>{content.videoName2}</Typography>
                                    <Button variant="contained"
                                    size="small"
                                    sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90, verticalAlign:"middle", float:"right", marginRight:4 }}>학습하기</Button>
                                </AccordionDetails>
                            }
                            {content.materialFile2 &&
                                <AccordionDetails>
                                    <Typography variant='h7' sx={{verticalAlign:"middle"}}>{content.materialTitle2}</Typography>
                                    <Button variant="contained"
                                    size="small"
                                    sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90, verticalAlign:"middle", float:"right", marginRight:4 }}>다운로드</Button>
                                </AccordionDetails>
                            }
                            {content.homeworkFile2 &&
                                <AccordionDetails>
                                    <Typography variant='h7' sx={{verticalAlign:"middle"}}>{content.homeworkTitle2}</Typography>
                                    <Button variant="contained"
                                    size="small"
                                    sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90, verticalAlign:"middle", float:"right", marginRight:4 }}>제출</Button>
                                </AccordionDetails>
                            }
                        </Accordion>
                    )))}
                </div>
                {/* ------Your content end------! */}
                <br />
            </Paper>
        </Grid>
    )
}

export default Lecture;