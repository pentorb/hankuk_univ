import Toc from "./Toc";
import { Link } from 'react-router-dom';
import '../comm/css/Main.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import NoticeBoard from "./NoticeBoard";
import NewsCarousel from "./NewsCarousel";

const Main = () => {
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
                    <div style={{ display: 'flex', position: 'relative', zIndex: 2, marginLeft: '20px' }}>
                        <span style={{ margin: '10px 5px' }}><img src="/images/logo2.png" alt="" style={{ width: '40px' }} /></span>
                        <span style={{
                            fontSize: '24px', fontFamily: 'ChosunLo', color: 'white', margin: '13px 3px'
                        }}>
                            한국대학교
                        </span>
                        <span style={{ fontSize: '22px', color: 'white', margin: '13px 3px' }}> / 종합학사포탈</span>
                    </div>

                    {/* 본문 시작 */}
                    <div >
                        <div style={{ bottom: 0, left: 0 }}>
                            <div className="slogan">
                                끝없는 도전으로 새로운 길을 개척하는 힘
                            </div>
                        </div>
                        <Link to="/login" className="loginBtn">
                            <div style={{ fontSize: '25px', fontWeight: '700' }}>로그인(Login)</div>
                        </Link>
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
                                    // events={events}
                                    // eventContent={renderEventContent}
                                    dayMaxEventRows={true}
                                    dayMaxEvents={2}
                                    contentHeight={400}
                                />
                            </div>
                        </div>
                        <div style={{ margin: '200px 0 0 80px' }}>
                            <div className="ttt" style={{ margin: '0px 0px 10px 10px' }}>NOTICE</div>

                            <div style={{ width: '700px', height: '460px', backgroundColor: 'var(--maincolor6)' }}>
                                {/* <NoticeBoard/> */}
                                <div style={{ padding: '50px 30px', backgroundColor: '#F5F9FA', fontSize:'18px'}}>

                                    <div style={{ display: 'flex', paddingBottom:'10px'}}>
                                        <div className="col-10"><li>2024-2학기, 복학, 휴학, 유급 신청 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-02-08</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom:'10px'}}>
                                        <div className="col-10"> <li>졸업예정자 대상 이수구분 변경 신청, 졸업 확정 신고 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-02-08</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom:'10px'}}>
                                        <div className="col-10"><li>2024-여름계절제 국내대학 학점교류 신청 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-02-08</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom:'10px'}}>
                                        <div className="col-10"><li>2024학년도 여름계절학기 등록금 납부 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-02-08</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom:'10px'}}>
                                        <div className="col-10"><li>2024학년도 휴학생 여름계절제 수강신청 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-02-08</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom:'10px'}}>
                                        <div className="col-10"><li>2024학년도 여름계절제 수업 일정 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-02-08</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom:'10px'}}>
                                        <div className="col-10"><li>2024-1학기 소그룹채플 안내 사항</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-02-08</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom:'10px'}}>
                                        <div className="col-10"><li>2024학년도 1학기 조기취업자 출석 및 성적 인정 처리 지침 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-02-08</div>
                                    </div>
                                    <div style={{ display: 'flex', paddingBottom:'10px'}}>
                                        <div className="col-10"><li>2024년도 1학기 온라인강좌 기말고사 일정 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-02-08</div>
                                    </div>
                                    <div style={{ display: 'flex'}}>
                                        <div className="col-10"><li>2024학년도 신(편)입생 학생증 체크카드 발급방법 안내</li></div>
                                        <div className="col-2" style={{ justifyContent: 'right', display: 'flex' }}>2024-02-08</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </span>
                    <div>
                        <div style={{ margin: '50px 0 0 60px', }}>
                            <div className="ttt" style={{ margin: '10px 0 10px 60px' }}>NEWS</div>
                            <NewsCarousel/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
