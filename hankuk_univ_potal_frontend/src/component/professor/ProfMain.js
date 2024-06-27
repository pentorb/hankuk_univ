import Grid from '@mui/material/Grid';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BoltIcon from '@mui/icons-material/Bolt';
import '../student/css/StudentMain.css';
import { List } from 'reactstrap';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router';
import { url } from '../../config/config';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { CardBody, CardText, CardTitle, Label } from "reactstrap";
import { lectureAtom, memberAtom, tokenAtom } from '../../atoms';

const renderEventContent = (eventInfo) => {
    return (
        <>
            <i>{eventInfo.event.title}</i>
        </>
    );
};

const ProfMain = () => {
    const [member, setMember] = useAtom(memberAtom);
    const token = useAtomValue(tokenAtom);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const setLectureAtom = useSetAtom(lectureAtom);
    const [lectureList, setLectureList] = useState([]);

    const daycheck = (info) => {
        var number = document.createElement("a");
        number.classList.add("fc-daygrid-day-number");
        number.innerHTML = info.dayNumberText.replace("일", "");
        if (info.view.type === "dayGridMonth") {
            return {
                html: number.outerHTML
            };
        }
        return {
            domNodes: []
        };
    }

    const logout = () => {
        setMember(null);
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        navigate("/")
    }

    const myCalendar = () => {
        axios.get(`${url}/calendar?id=${member.id}`, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                const formattedEvents = res.data.map(event => {
                    return {
                        title: event.title,
                        start: new Date(event.start),
                        end: new Date(event.end),
                        backgroundColor: event.bgColor,
                        textColor: '#000000',
                        borderColor: event.bgColor,
                        allDay: event.allDay,
                    };
                });
                setEvents(formattedEvents);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }

    const myLecture = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12
        let semester;
        
        if (month >= 1 && month <= 6) {
            semester = 1;
        } else {
            semester = 2;
        }
        
        const link = `${url}/lectureDashboard?profNo=${member.id}&year=${year}&semester=${semester}`;
        axios.get(link,{headers: { Authorization: JSON.stringify(token) }})
        .then(res => {
            console.log(link)
            console.log(res);
            setLectureList([...res.data]);
        })
        .catch(err => {
            console.log(err);
        });
    };
    

    useEffect(() => {
        if(token && member && member.id) {
            myCalendar();
            myLecture();
        }
    }, [token, member]);

    const contents = (index) => {
        const selectedLecture = lectureList[index];
        setLectureAtom({ ...selectedLecture });
        console.log(selectedLecture);
        navigate(`/professor/contents`)
    }



    return (
        <Grid item xs={12}>
            <Grid item xs={1}></Grid>

            <Grid item xs={11}>
                <div className="firstBox">
                    <Grid item xs={12}>
                        <div className="info_back">
                            <AccountCircleIcon className="info" style={{ height: '150px', width: '150px' }} />
                        </div>
                    </Grid>
                    <Grid container spacing={2} style={{ position: 'absolute', top: '60px', display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={4} style={{ paddingTop: '0px' }}>
                        <div>
                                <div style={{ textAlign: 'center', marginBottom: '15px' }}><h5><b>오늘의 학식</b></h5></div>
                                <div className='horDiv' style={{ height: '70px' }}>
                                    <div className='col-2 menuT'><WbTwilightIcon />&nbsp;조식</div>
                                    <div className='col-10 menu'>브레드, 쌀시리얼&우유, 삶은 계란, 토마토채소샐러드, 후르츠칵테일</div>
                                </div>
                                <div className='horDiv' style={{ height: '70px' }}>
                                    <div className='col-2 menuT' style={{ backgroundColor: "rgb(187 193 233 / 70%)" }}><LightModeIcon />&nbsp;중식</div>
                                    <div className='col-10 menu'>쌀밥, 시금치된장국, 파채돈까스, 알감자새송이조림, 무말랭이무침, 배추김치</div>
                                </div>
                                <div className='horDiv' style={{ height: '70px' }}>
                                    <div className='col-2 menuT' style={{ backgroundColor: "#bbc1e9" }}><DarkModeIcon />&nbsp;석식</div>
                                    <div className='col-10 menu'>쌀밥, 만두국, 가자미구이, 비엔나김치볶음, <br />깻잎지무침, 깍두기</div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: 'center', marginTop: '45px' }}>
                            <div style={{ paddingBottom: '15px' }}><h4><b>{member.name}</b> 님, 환영합니다.</h4></div>
                            <div style={{ paddingBottom: '15px' }}><h5>{member.majName} | 정교수 | improf23@kosta.com</h5></div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="iconBtn" ><CreateOutlinedIcon style={{ height: '30px', width: '30px' }} /></div>&nbsp;&nbsp;&nbsp;
                                <div className="iconBtn" ><LogoutOutlinedIcon style={{ height: '30px', width: '30px' }} onClick={logout} /></div>
                            </div>
                        </Grid>
                        <Grid item xs={4} style={{ textAlign: 'center' }}>
                        </Grid>
                    </Grid>
                </div>

                <Grid container spacing={2}>
                    {/* 캘린더  */}
                    <Grid item xs={6}>
                        <div className="secBox">
                            <div className="header">
                                <h3 onClick={() => { navigate('/professor/calendar') }}><b>SCHEDULE</b></h3>
                                <span style={{ color: '#999696' }}><i>누르면 일정 조회 화면으로 이동합니다.</i></span>
                            </div>
                            <div >
                                <FullCalendar
                                    headerToolbar={{
                                        left: "",
                                        center: "title",
                                        right: "",
                                    }}
                                    defaultView="dayGridMonth"
                                    locale={'ko'}
                                    dayCellContent={daycheck}
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    events={events}
                                    eventContent={renderEventContent}
                                    dayMaxEventRows={true}
                                    dayMaxEvents={2}
                                    contentHeight={400}
                                />
                            </div>
                        </div>
                    </Grid>


                    {/* 내 강의리스트  */}
                    <Grid item xs={6}>
                        <div className="secBox" style={{ padding: '40px 20px 0px 20px' }}>
                            <div className="header">
                                <h3 onClick={() => { navigate('/my-potal/') }}><b>나의 강의</b></h3>
                                <span style={{ color: '#999696' }}><i>누르면 해당 강의로 이동합니다.</i></span>
                            </div>
                            <div className='lecture-grid'>
                                {lectureList.map((lecture, i) => (
                                    <Card key={lecture.lecNo} className="lecture-card"
                                          onClick={() => contents(i)}>
                                        <Label className="lecture-color-card" />
                                        <CardBody style={{ margin: '0px 10px 10px' }}>
                                            <CardTitle style={{ fontSize: 'larger' }}>
                                                <b>{lecture.subName}</b>
                                            </CardTitle>

                                            <CardText style={{ margin: '0px' }}>
                                                {lecture.year}-0{lecture.semester}<br />
                                                {lecture.time1} {lecture.time2} <br />
                                                {lecture.lecRoom}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>        
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default ProfMain;