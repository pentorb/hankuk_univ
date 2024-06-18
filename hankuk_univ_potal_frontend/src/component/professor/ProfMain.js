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
import { useAtom, useAtomValue } from 'jotai';
import { memberAtom, tokenAtom } from '../../atoms';

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

    useEffect(() => {
        console.log(member)
        axios.get(`${url}/calendar?id=${member.id}`)
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
                console.log(formattedEvents);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [token]);



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
                            <div style={{ paddingBottom: '15px' }}><h5>{member.majName} | {member.position} | {member.email}{member.emailDo}</h5></div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="iconBtn" ><CreateOutlinedIcon style={{ height: '30px', width: '30px' }} /></div>&nbsp;&nbsp;&nbsp;
                                <div className="iconBtn" ><LogoutOutlinedIcon style={{ height: '30px', width: '30px' }} onClick={logout} /></div>
                            </div>
                        </Grid>
                        <Grid item xs={4} style={{ textAlign: 'center' }}>
                            {/* 투두리스트  */}
                            {/* <div className="todoBox">
                                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }}>
                                    <BoltIcon style={{ height: '50px', width: '50px', color: '#403E98' }} /> <h4 style={{ marginBottom: '0px', fontWeight: '700' }}>To Do List</h4>
                                </div>
                                <div style={{ paddingTop: '10px' }}>
                                    <List style={{ fontSize: 'larger', textAlign: 'left' }}>
                                        <li style={{ paddingBottom: '5px' }}>
                                            게임프로그래밍 기말대체과제 제출
                                        </li>
                                        <li style={{ paddingBottom: '5px' }}>
                                            6시 반 헬스장 갔다오기
                                        </li>
                                        <li style={{ paddingBottom: '5px' }}>
                                            자바의 정석 챕터 3 요약
                                        </li>
                                        <li style={{ paddingBottom: '5px' }}>
                                            휴학 신청하기
                                        </li>
                                    </List>
                                </div>
                            </div> */}
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
                        <div className="secBox">
                            <div className="header">
                                <h3 onClick={() => { navigate('/my-potal/calendar') }}><b>나의 강의</b></h3>
                                <span style={{ color: '#999696' }}><i>누르면 해당 강의로 이동합니다.</i></span>
                            </div>
                            <div style={{ display: 'flex', fontFamily: 'Pretendard-Regular', paddingBottom: '15px' }}>
                                <Card sx={{ width: 200, marginRight: '20px', height: 'fit-content' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image="../../image/blue.jpg"
                                            alt="bobo"
                                        />
                                        <CardContent>
                                            <h5><b>게임프로그래밍</b></h5>
                                            <div style={{ color: "#a7a2a2" }}>
                                                2024년도 2학기 <br />
                                                공과대학 502호
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                <Card sx={{ width: 200, marginRight: '20px', height: 'fit-content' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image="src/image/gosim.jpg"
                                            alt="bobo"
                                        />
                                        <CardContent>
                                            <h5><b>게임프로그래밍</b></h5>
                                            <div style={{ color: "#a7a2a2" }}>
                                                2024년도 2학기 <br />
                                                공과대학 502호
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                <Card sx={{ width: 200, marginRight: '20px', height: 'fit-content' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image="src/image/gosim.jpg"
                                            alt="bobo"
                                        />
                                        <CardContent>
                                            <h5><b>게임프로그래밍</b></h5>
                                            <div style={{ color: "#a7a2a2" }}>
                                                2024년도 2학기 <br />
                                                공과대학 502호
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                            <div style={{ display: 'flex', fontFamily: 'Pretendard-Regular' }}>
                                <Card sx={{ width: 200, marginRight: '20px', height: 'fit-content' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image="src/image/gosim.jpg"
                                            alt="bobo"
                                        />
                                        <CardContent>
                                            <h5><b>게임프로그래밍</b></h5>
                                            <div style={{ color: "#a7a2a2" }}>
                                                2024년도 2학기 <br />
                                                공과대학 502호
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                <Card sx={{ width: 200, marginRight: '20px', height: 'fit-content' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image="src/image/gosim.jpg"
                                            alt="bobo"
                                        />
                                        <CardContent>
                                            <h5><b>게임프로그래밍</b></h5>
                                            <div style={{ color: "#a7a2a2" }}>
                                                2024년도 2학기 <br />
                                                공과대학 502호
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                <Card sx={{ width: 200, marginRight: '20px', height: 'fit-content' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image="src/image/gosim.jpg"
                                            alt="bobo"
                                        />
                                        <CardContent>
                                            <h5><b>게임프로그래밍</b></h5>
                                            <div style={{ color: "#a7a2a2" }}>
                                                2024년도 2학기 <br />
                                                공과대학 502호
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </div>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}
export default ProfMain;