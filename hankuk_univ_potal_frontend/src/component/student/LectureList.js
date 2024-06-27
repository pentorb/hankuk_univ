import { Typography, Paper, Grid, Breadcrumbs } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { tokenAtom, memberAtom, lectureNumberAtom, lectureNameAtom, activeTabAtom } from '../../atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { url } from '../../config/config';
import { useNavigate } from 'react-router';
import { CardBody, CardText, CardTitle, Label } from 'reactstrap';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

const LectureList = () => {
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const setLectureNumber = useSetAtom(lectureNumberAtom);
    const setLectureName = useSetAtom(lectureNameAtom);
    const setActiveTab = useSetAtom(activeTabAtom);
    const [lectureList, setLectureList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let formData = new FormData();
        formData.append("stdNo", member.id);

        axios.post(`${url}/lecture`, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setLectureList([...res.data.lectureList])
            })
            .catch(err => {
                console.log(err);
                setLectureList(null)
            })
    }, [token])

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>나의 강의</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
               
                <div id="breadCrumb" style={{ margin: '24px 40px 32px', color:'black' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            마이페이지
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>강의 대시보드</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <Grid>
                <div style={{padding:'0px 100px', marginLeft:'80px'}}>
                        {lectureList !== null && (lectureList.map(lecture => (
                            <Card key={lecture.lecNo} className="lecture-card" style={{ width: '300px', margin:'20px', textAlign:'left' }}
                            onClick={() => {
                                setLectureNumber(lecture.lecNo); setLectureName(lecture.lectureName); setActiveTab(5);
                                navigate(`/student/${lecture.lecNo}/content`);}}>
                                <Label className="lecture-color-card" style={{height:'130px'}} />
                                <CardBody style={{ margin: '0px 10px 10px' }}>
                                    <CardTitle style={{ fontSize: 'larger' }}>
                                        <b>{lecture.lectureName}</b>
                                    </CardTitle>

                                    <CardText style={{ margin: '0px' }}>
                                        {lecture.now}<br />
                                        {lecture.time1} {lecture.time2} <br />
                                        {lecture.lectureRoom}
                                    </CardText>
                                </CardBody>
                            </Card>
                        )))}
                        </div>
                </Grid>

                {/* <Grid container>
                    <Grid item xs={12} sx={{ height: 100 }} />
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <div style={{textAlign:'center'}}>
                        {lectureList !== null && (lectureList.map(lecture => (
                            <Card key={lecture.lecNo} className="lecture-card" style={{ width: '300px', margin:'20px', textAlign:'left' }}
                            onClick={() => {
                                setLectureNumber(lecture.lecNo); setLectureName(lecture.lectureName); setActiveTab(5);
                                navigate(`/student/${lecture.lecNo}/content`);}}>
                                <Label className="lecture-color-card" style={{height:'130px'}} />
                                <CardBody style={{ margin: '0px 10px 10px' }}>
                                    <CardTitle style={{ fontSize: 'larger' }}>
                                        <b>{lecture.lectureName}</b>
                                    </CardTitle>

                                    <CardText style={{ margin: '0px' }}>
                                        {lecture.now}<br />
                                        {lecture.time1} {lecture.time2} <br />
                                        {lecture.lectureRoom}
                                    </CardText>
                                </CardBody>
                            </Card>
                        )))}
                        </div>
                    </Grid>
                    <Grid item xs={1} />
                </Grid> */}

                <br /><br />
                {/* ------Your content end------! */}
                <br />
            </Paper>
        </Grid>
    )
}

export default LectureList;
