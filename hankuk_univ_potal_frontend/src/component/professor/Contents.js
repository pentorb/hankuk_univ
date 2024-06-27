import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button, Card, CardBody, Collapse } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, openIndexesAtom, tokenAtom } from "../../atoms";
import { useLocation, useNavigate, useParams } from "react-router";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import './css/proff.css';

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
        if (!openIndexes.includes(i)) {
            window.scrollTo({
                top: (i + 1) * 200,
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
                    {/* 주차 확인  */}
                    {/* 주차 넓게 퍼진 거 아니면 한 쪽에 붙어있는 거 둘 중 뭐가 더 나은지 물어보기  */}
                    <div style={{ marginBottom: '15px' }}>
                        {lessonList.map((lesson, i) => (
                            <div key={i} onClick={() => { toggle(i); scrollToTop(i); }}
                                className="Contents_Top_Buttons"
                                style={{
                                    backgroundColor: openIndexes.includes(i) ? '#1F3468' : 'white',
                                    color: openIndexes.includes(i) ? 'white' : '#1F3468'
                                }}>
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    {lessonList.map((lesson, i) => (
                        <div key={i} style={{ backgroundColor: '#a2b2d93d' }}>

                            <div onClick={() => { toggle(i); scrollToTop(i); }} className="weekBox">
                                <div style={{ margin: '0px 10px' }}>{openIndexes.includes(i) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</div>
                                <div style={{ fontSize: '22px', fontWeight: 'bold' }}>{lesson.week}주차</div>
                            </div>

                            <Collapse isOpen={openIndexes.includes(i)} style={{ paddingBottom: '20px', borderBottom: 'solid 1px lightgrey' }}>
                                <div className="contentBox">
                                    {/* 버튼 아니면 글씨 중에 뭐가 더 나은지  */}
                                    <div className="timeBox" style={{ justifyContent: 'space-between' }}>
                                        1차시 ({lecture.time1})
                                        <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                                            <div style={{ fontSize: '15px', textDecoration: 'underline', color: '#1f3468', cursor: 'pointer' }} onClick={() => navigate(`/professor/lessonDataWrite/${lesson.week}/${lecture.lecNo}`)}>
                                                강의자료등록
                                            </div> &nbsp;&nbsp;
                                            <div style={{ fontSize: '15px', textDecoration: 'underline', color: '#1f3468', cursor: 'pointer' }} onClick={() => navigate(`/professor/homeworkWrite/${lesson.week}/${lecture.lecNo}`)}>
                                                과제 등록
                                            </div>
                                            
                                        </div>
                                    </div>
                                    {/* 강의자료와 과제가 모두 업로드 되지 않았을 때  */}
                                    <div>
                                        {/* 강의 자료  */}
                                        {lesson.lessonData.map((data, i) => {
                                            if (data.lessonCnt === 1) {
                                                return (
                                                    <>
                                                    {/* 강의자료가 없으면 이 div도 안 뜨게 하고 싶은데 어떻게 조건을 줘야될지 잘 모르겟다 하준오빠한테 물어봐야겠다  */}
                                                        <div key={i} className="contentss" onClick={() => navigate(`/professor/lessonDataModify/${data.ldNo}`)}>
                                                            {lesson.lessonData === null && data.lessonCnt === i ? (
                                                                <div className="conCategori" style={{height:'65px', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center'}}>업로드된 강의자료가 없습니다.</div>
                                                                ) : (<>
                                                                <div className="conCategori">강의자료</div>
                                                                <div><FilePresentIcon />&nbsp;[1차시 강의자료]&nbsp; <b>{data.title}</b></div>
                                                            </>)}
                                                        </div>
                                                    </>
                                                )
                                            }
                                            return null;
                                        })}

                                        {/* 과제  */}
                                        {lesson.homework.map((data, i) => {
                                            if (data.lessonCnt === 1) {
                                                return (
                                                    <div key={i} className="contentss">
                                                        {lesson.lessonData === null ? (
                                                                 <div className="conCategori" style={{height:'65px', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center'}}>업로드된 과제가 없습니다.</div>
                                                        ):(<>
                                                            <div className="conCategori">과제</div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/professor/homeworkModify/${data.hwNo}`)}>
                                                                <DriveFileRenameOutlineIcon />&nbsp;[1차시 과제]&nbsp; <b>{data.title}</b>
                                                            </div>
                                                            <Button style={{ backgroundColor: '#1F3468' }}
                                                                onClick={() => navigate(`/professor/homeworkSubmitList/${data.hwNo}/${data.week}/1`)}>
                                                                과제란
                                                            </Button>
                                                        </div>
                                                                </>)}
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })}
                                    </div>

                                </div>

                                {/* 2차시가 없을 땐 보이지 않음 */}
                                {lecture.time2 !== null ? (
                                    <>
                                        <div className="contentBox">
                                            <div className="timeBox" style={{ justifyContent: 'space-between' }}>
                                                2차시 ({lecture.time2})
                                                <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                                                    <div style={{ fontSize: '15px', textDecoration: 'underline', color: '#1f3468', cursor: 'pointer' }} onClick={() => navigate(`/professor/lessonDataWrite/${lesson.week}/${lecture.lecNo}`)}>
                                                        강의자료등록
                                                    </div> &nbsp;&nbsp;
                                                    <div style={{ fontSize: '15px', textDecoration: 'underline', color: '#1f3468', cursor: 'pointer' }} onClick={() => navigate(`/professor/homeworkWrite/${lesson.week}/${lecture.lecNo}`)}>
                                                        과제 등록
                                                    </div>
                                                </div>
                                            </div>

                                            {lesson.lessonData.map((data, i) => {
                                                if (data.lessonCnt === 2) {
                                                    return (
                                                        <div key={i} className="contentss" onClick={() => navigate(`/professor/lessonDataModify/${data.ldNo}`)}>
                                                            <div className="conCategori">강의자료</div>
                                                            <div><FilePresentIcon />&nbsp;[2차시 강의자료]&nbsp; <b>{data.title}</b></div>
                                                        </div>
                                                    )
                                                }
                                                return null;
                                            })}

                                            {lesson.homework.map((data, i) => {
                                                if (data.lessonCnt === 2) {
                                                    return (
                                                        <div key={i} className="contentss">
                                                            <div className="conCategori">과제</div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/professor/homeworkModify/${data.hwNo}`)}>
                                                                    <DriveFileRenameOutlineIcon />&nbsp;[2차시 과제]&nbsp; <b>{data.title}</b>
                                                                </div>
                                                                <Button style={{ backgroundColor: '#1F3468' }}
                                                                    onClick={() => navigate(`/professor/homeworkSubmitList/${data.hwNo}/${data.week}/2`)}>
                                                                    과제란
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </>
                                ) : (<></>)}


                                {/* <Card style={{ border: 'none', borderRadius:'30px' ,backgroundColor:'aliceblue'}}>
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
                                    
                                    </CardBody> */}
                                {/* </Card> */}
                            </Collapse>
                        </div>
                    ))}
                </div>
            </Paper>
        </Grid>
    );
};

export default Contents;
