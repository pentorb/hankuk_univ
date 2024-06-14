import { Typography, Paper, Button, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { tokenAtom, memberAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import { url } from '../../config/config';
import { useNavigate } from 'react-router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import syllabusFile from '../../assets/test.pdf';

const Syllabus = () => {
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const [lecture, setLecture] = useState({});
    const [lessonList, setLessonList] = useState([]);
    const [openIndexes, setOpenIndexes] = useState([]);
    const { lecNo } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let detailUrl = `${url}/lecture/${lecNo}`;
        axios.get(detailUrl, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                let resLecture = res.data.lecture;
                setLecture({ ...resLecture })
                setLessonList([...res.data.lecture.lessonList])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>강의계획서</b></Typography>
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
                            {lecture.lectureName}
                        </Link>
                        <Link color="#4952A9" underline='none'>
                            <b>강의계획서</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                {/* ------Your content start------! */}
                <Grid container>
                <Grid xs={12} sx={{ height:70}}/>
                <Grid xs={1}/>
                <Grid xs={10}>
                    <iframe src={syllabusFile} width="100%" height="900"></iframe>
                </Grid>
                <Grid xs={1}/>
                </Grid>
                {/* ------Your content end------! */}
                <br />
            </Paper>
        </Grid>
    )
}

export default Syllabus;