import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button, Card, CardBody, Collapse } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, openIndexesAtom, tokenAtom } from "../../atoms";
import { useLocation, useNavigate, useParams } from "react-router";

const Contents = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);

    const [lessonDataList, setLessonDataList] = useState([]);
    const [homeworkList, setHomeworkList] = useState([]);
    const [lessonList, setLessonList] = useState([]);
    // const [openIndexes, setOpenIndexes] = useState([]);
    const [openIndexes, setOpenIndexes] = useAtom(openIndexesAtom);
    const navigate = useNavigate();

    const toggle = (index) => {
        setOpenIndexes((prevState) => {
            if (prevState.includes(index)) {
                return prevState.filter(i => i !== index);
            } else {
                return [...prevState, index];
            }
        });
    };

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(`${url}/contents?lecNo=${lecture.lecNo}`,
                    {
                        headers: { Authorization: JSON.stringify(token) }
                    }
                );
                // Assuming response.data is an array of lessons
                console.log(response.data);
                setLessonDataList(response.data.lessonDataList);
                setHomeworkList(response.data.homeworkList);
                let mockData = [];
                for (let index = 0; index < 15; index++) {
                    let lessonData = [];
                    let homeworkData = [];
                    response.data.lessonDataList.forEach(data => {
                        if (data.week === index + 1) {
                            lessonData.push(data);
                        }
                    })
                    response.data.homeworkList.forEach(homework => {
                        if (homework.week === index + 1) {
                            homeworkData.push(homework);
                        }
                    })
                    mockData.push({ week: index + 1, lessonData: lessonData, homework: homeworkData });
                }
                setLessonList(mockData);
            } catch (error) {
                console.error("Error fetching lessons", error);
                // Mock data in case of error

            }
        };

        fetchLessons();

    }, [token, lecture]);

    const scrollToTop = (i) => {
        if(!openIndexes.includes(i)){
        window.scrollTo({
            top: (i+1)*200,
            behavior: 'smooth'
        })
    }    
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom>
                <b>강의콘텐츠</b>
            </Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/professor/">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none' href="/professor/lectureDashboard">
                            과목
                        </Link>
                        <Link color="inherit" underline='none'>
                            {lecture.subName}
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>강의콘텐츠</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <div className="Contents_Body">
                    {lessonList.map((lesson, i) => (
                        <div key={i} onClick={() => {toggle(i);scrollToTop(i);}}
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
                            <div onClick={() => {toggle(i); scrollToTop(i);}} style={{ cursor: 'pointer', padding: '10px', borderBottom: '2px solid #ddd' }}>
                                <div style={{ display: 'inline-block', fontSize: '20px', margin: '10px 0', fontWeight: 'bold' }}
                                >{lesson.week}주차</div>
                                <div style={{ float: 'right', marginTop: '15px' }}>{openIndexes.includes(i) ? '△' : '▽'}</div>
                            </div>
                            <Collapse isOpen={openIndexes.includes(i)} style={{ borderRadius:'30px', marginTop:'10px'}}>
                                <Card style={{ border: 'none', borderRadius:'30px' ,backgroundColor:'aliceblue'}}>
                                    <CardBody style={{ marginLeft:'25px',paddingInline: '25px', borderRadius:'30px' }}>
                                        <Button onClick={() => navigate(`/professor/lessonDataWrite/${lesson.week}/${lecture.lecNo}`)}
                                                style={{ float: 'left', marginInline: '5px', backgroundColor:'#1F3468'}}
                                        >강의자료등록</Button>
                                        <Button onClick={() => navigate(`/professor/homeworkWrite/${lesson.week}/${lecture.lecNo}`)}
                                                style={{ float: 'left', marginInline: '5px', backgroundColor:'#1F3468' }}
                                        >과제등록</Button>
                                        <div  style={{marginTop:'40px', paddingTop: '5px', fontWeight:'bold' }} >1차시 ({lecture.time1})</div><hr />
                                        {lesson.lessonData.map((data, i) => {
                                            if (data.lessonCnt === 1) {
                                                return (
                                                    <div key={i} className="Contents_Divs">
                                                        ↳<div className="Contents_Divs_Title">{data.title}</div>
                                                        <Button
                                                            style={{ backgroundColor:'#1F3468'}}
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
                                            if (data.lessonCnt === 1) {
                                                return (
                                                    <div key={i} className="Contents_Divs">
                                                        ↳<div className="Contents_Divs_Title">{data.title}</div>
                                                        <Button
                                                            style={{ backgroundColor:'#1F3468', marginRight:'10px'}}
                                                            className="Contents_Divs_Button"
                                                            onClick={() => navigate(`/professor/homeworkModify/${data.hwNo}`)}>
                                                            과제상세보기
                                                        </Button>
                                                        <Button
                                                            style={{ backgroundColor:'#1F3468'}}
                                                            className="Contents_Divs_Button"
                                                            onClick={() => navigate(`/professor/homeworkSubmitList/${data.hwNo}/${data.week}/1`)}>
                                                            과제란
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })}
                                        {lecture.time2==='' ? 
                                        (<></>):(<><div  style={{ fontWeight:'bold' }}>2차시 ({lecture.time2})</div><hr /></>)}
                                        {lesson.lessonData.map((data, i) => {
                                            if (data.lessonCnt === 2) {
                                                return (
                                                    <div key={i} className="Contents_Divs">
                                                        ↳<div className="Contents_Divs_Title">{data.title}</div>
                                                        <Button
                                                            style={{ backgroundColor:'#1F3468', marginRight:'10px'}}
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
                                            if (data.lessonCnt === 2) {
                                                return (
                                                    <div key={i} className="Contents_Divs">
                                                        ↳<div className="Contents_Divs_Title">{data.title}</div>
                                                        <Button
                                                            style={{ backgroundColor:'#1F3468', marginRight:'10px'}}
                                                            className="Contents_Divs_Button"
                                                            onClick={() => navigate(`/professor/homeworkModify/${data.hwNo}`)}>
                                                            과제상세보기
                                                        </Button>
                                                        <Button
                                                            style={{ backgroundColor:'#1F3468'}}
                                                            className="Contents_Divs_Button"
                                                            onClick={() => navigate(`/professor/homeworkSubmitList/${data.hwNo}/${data.week}/2`)}>
                                                            과제란
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
            </Paper>
        </Grid>
    );
};

export default Contents;
