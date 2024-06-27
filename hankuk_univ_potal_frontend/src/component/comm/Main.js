import Toc from "./Toc";
import { Link } from 'react-router-dom';
import '../comm/css/Main.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import NoticeBoard from "./NoticeBoard";
import NewsCarousel from "./NewsCarousel";
import { memberAtom, tokenAtom } from "../../atoms";
import { useAtom, useAtomValue } from "jotai";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from '../../config/config';

const Main = () => {
    const [member, setMember] = useAtom(memberAtom);
    const token = useAtomValue(tokenAtom);
    const [events, setEvents] = useState([]);
    const [isMemberLoaded, setIsMemberLoaded] = useState(false);

    useEffect(() => {
        // member가 업데이트된 후에 isMemberLoaded를 true로 설정
        if (member !== undefined) {
            setIsMemberLoaded(true);
        }
        myCalendar();
    }, [member]);


    const logout = () => {
        setMember(null);
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        // window.location.reload(); 
        // 페이지 새로고침
    }

    const myCalendar = () => {
        axios.get(`${url}/calendar?id=S241234`, { headers: { Authorization: JSON.stringify(token) } })
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

    return (
        <div>
            {/* 배경 이미지 */}
            <div className="main-container">
                <div className="main-image"></div>
            </div>

            {/* 본문 */}
            <div className="body">
                <div className="secimage">
                    {/* 헤더 */}
                    <div style={{ display: 'flex', position: 'relative', zIndex: 2, marginLeft: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ margin: '10px 5px' }}><img src="/images/logo2.png" alt="" style={{ width: '40px' }} /></span>
                            <span style={{
                                fontSize: '24px', fontFamily: 'ChosunLo', color: 'white', margin: '13px 3px'
                            }}>
                                한국대학교
                            </span>
                            <span style={{ fontSize: '22px', color: 'white', margin: '13px 3px' }}> / 종합학사포탈</span>
                        </div>
                        <div>
                            {member && member.id ? (
                                <>
                                    {member.id.substring(0, 1) === "S" ? (
                                        <span style={{ fontSize: '22px', color: 'white', margin: '13px 3px' }}>
                                            <AccountCircleIcon /> {member.dept}
                                        </span>
                                    ) : (
                                        <span style={{ fontSize: '22px', color: 'white', margin: '13px 3px' }}>
                                            <AccountCircleIcon /> {member.name} 님
                                        </span>
                                    )}
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    </div>

                    {/* 본문 시작 */}
                    <div>
                        <div style={{ bottom: 0, left: 0 }}>
                            <div className="slogan">
                                끝없는 도전으로 새로운 길을 개척하는 힘
                            </div>
                        </div>
                        {member && member.id ? (
                            <div className="loginBtn" style={{ fontSize: '25px', fontWeight: '700' }} onClick={logout}>
                                로그아웃(Login)
                            </div>
                        ) : (
                            <Link to="/login" className="loginBtn">
                                <div style={{ fontSize: '25px', fontWeight: '700' }}>
                                    로그인(Login)
                                </div>
                            </Link>
                        )}
                    </div>
                    <div className="tocDiv">
                        <Toc />
                    </div>

                    <span style={{ display: 'flex' }}>
                        <div className="calDiv">
                            <div className="ttt" style={{ color: 'white', padding: '30px 0px 20px' }}>교내 일정</div>
                            <div style={{ backgroundColor: 'white', height: 'auto', padding: '20px 20px 10px 20px', margin: '0 50px' }}>
                                <FullCalendar
                                    headerToolbar={{
                                        left: "",
                                        center: "title",
                                        right: "",
                                    }}
                                    defaultView="dayGridMonth"
                                    // locale={'ko'}
                                    // dayCellContent={daycheck}
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    events={events}
                                    // eventContent={renderEventContent}
                                    dayMaxEventRows={true}
                                    dayMaxEvents={2}
                                    contentHeight={400}
                                />
                            </div>
                        </div>
                        <div style={{ margin: '200px 0 0 80px' }}>
                            <div className="ttt" style={{ margin: '0px 0px 10px 10px' }}>NOTICE</div>

                            <div style={{ width: '660px', height: '460px', backgroundColor: 'var(--maincolor6)' }}>
                                {/* <NoticeBoard/> */}
                                <div style={{ padding: '50px 30px', backgroundColor: '#F5F9FA' }}>

                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <div className="col-10"><li>한국대학교 의예과 신설 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-05-27</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <div className="col-10"><li>2024-2학기, 복학, 휴학, 유급 신청 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-06-25</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <div className="col-10"> <li>졸업예정자 대상 이수구분 변경 신청, 졸업 확정 신고 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-06-21</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <div className="col-10"><li>2024-여름계절제 국내대학 학점교류 신청 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-06-20</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <div className="col-10"><li>2024학년도 여름계절학기 등록금 납부 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-06-04</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <div className="col-10"><li>2024학년도 휴학생 여름계절제 수강신청 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-05-29</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <div className="col-10"><li>2024학년도 여름계절제 수업 일정 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-05-24</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <div className="col-10"><li>2024-1학기 소그룹채플 안내 사항</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-05-15</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <div className="col-10"><li>2024학년도 1학기 조기취업자 출석 및 성적 인정 처리 지침 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-05-01</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <div className="col-10"><li>2024년도 1학기 온라인강좌 기말고사 일정 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-04-28</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="col-10"><li>2024학년도 휴학 신청 누락자 대처 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-05-01</div>
                                    </div>
                                    
                                    
                                </div>
                            </div>

                        </div>

                    </span>
                    <div>
                        <div style={{ margin: '50px 0 0 60px', }}>
                            <div className="ttt" style={{ margin: '10px 0 10px 60px' }}>NEWS</div>
                            <NewsCarousel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
