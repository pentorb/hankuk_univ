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
import { Card, CardBody, Collapse } from "reactstrap";

const Lecture = () => {
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

    const toggle = (index) => {
        setOpenIndexes((prevState) => {
            if (prevState.includes(index)) {
                return prevState.filter(i => i !== index);
            } else {
                return [...prevState, index];
            }
        });
    };

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
                            {lecture.lectureName}
                        </Link>
                        <Link color="#4952A9" underline='none'>
                            <b>강의콘텐츠</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                {/* ------Your content start------! */}
                <div className="Contents_Body">
                    {lessonList.map((lesson, i) => (
                        <div key={i} onClick={() => toggle(i)}
                            className="Contents_Top_Buttons"
                            style={{
                                backgroundColor: openIndexes.includes(i) ? '#1F3468' : 'white',
                                color: openIndexes.includes(i) ? 'white' : '#1F3468'
                            }}>
                            {i + 1}
                        </div>

                    ))}
                    {lessonList.map((lesson, i) => (
                        <div key={i}>
                            <div onClick={() => toggle(i)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}>
                                <div style={{ display: 'inline-block', fontSize: '20px', margin: '10px 0' }}>{lesson.week}주차</div>
                                <div style={{ float: 'right', marginTop: '15px' }}>{openIndexes.includes(i) ? '△' : '▽'}</div>
                            </div>
                            <Collapse isOpen={openIndexes.includes(i)}>
                                <Card>
                                    <CardBody>
                                        <div>1차시</div><hr />
                                        {lesson.lessonData.map((data, i) => {
                                            console.log(data);
                                            if (data.lessonCnt === 1) {
                                                return (
                                                    <div key={i} className="Contents_Divs">
                                                        ↳<div className="Contents_Divs_Title">{data.title}</div>
                                                        <Button
                                                            className="Contents_Divs_Button"
                                                            onClick={() => navigate(`/professor/lessonDataModify/${data.ldNo}`)}>
                                                            강의자료보기
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })}
                                        {lesson.homework.map((data, i) => {
                                            console.log(data);
                                            if (data.lessonCnt === 1) {
                                                return (
                                                    <div key={i} className="Contents_Divs">
                                                        ↳<div className="Contents_Divs_Title">{data.title}</div>
                                                        <Button
                                                            className="Contents_Divs_Button"
                                                            onClick={() => navigate(`/professor/homeworkModify/${data.hwNo}`)}>
                                                            과제보기
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })}
                                        <div>2차시</div><hr />
                                        {lesson.lessonData.map((data, i) => {
                                            console.log(data);
                                            if (data.lessonCnt === 2) {
                                                return (
                                                    <div key={i} className="Contents_Divs">
                                                        ↳<div className="Contents_Divs_Title">{data.title}</div>
                                                        <Button
                                                            className="Contents_Divs_Button"
                                                            onClick={() => navigate(`/professor/lessonDataModify/${data.ldNo}`)}>
                                                            강의자료보기
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })}
                                        {lesson.homework.map((data, i) => {
                                            console.log(data);
                                            if (data.lessonCnt === 2) {
                                                return (
                                                    <div key={i} className="Contents_Divs">
                                                        ↳<div className="Contents_Divs_Title">{data.title}</div>
                                                        <Button
                                                            className="Contents_Divs_Button"
                                                            onClick={() => navigate(`/professor/homeworkModify/${data.hwNo}`)}>
                                                            과제보기
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })}
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </div>
                    ))}
                </div>
                {/* ------Your content end------! */}
                <br />
            </Paper>
        </Grid>
    )
}

export default Lecture;