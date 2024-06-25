import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Header from './Header';
import UnivCal from './UnivCal';
import NoticeBoard from './NoticeBoard';
import { Route, Routes } from 'react-router';
import NoticeWrite from '../NoticeWrite';


const linkStyle = {
    width: '230px',
    fontSize: '20px',
    textAlign: 'center',
    padding: '10px'
};

const activeLinkStyle = {
    backgroundColor: 'var(--maincolor)',
    color: 'white',
    fontWeight: 700
};

const subLinkStyle = {
    width: '145px',
    height: '45px',
    borderRadius: 0,
    textAlign: 'center',
    padding: '10px'
};


function BoardNav() {
    const [activeKey, setActiveKey] = useState('/TotalBoardlist');
    const [subActiveKey, setSubActiveKey] = useState('/notice');

    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey);
        // 통합게시판이 선택된 경우 기본적으로 공지사항이 활성화되도록 설정
        if (selectedKey === '/TotalBoardlist') {
            setSubActiveKey('/notice');
        }
    };

    const handleSubSelect = (selectedKey) => {
        console.log(selectedKey)
        setSubActiveKey(selectedKey);
    };

    return (
        <>
            <div className="main-container">
                <div className="main-image"></div>
            </div>

            <div style={{ width: '1300px', height: 'auto', margin: '0 auto', backgroundColor: 'white' }}>
                <Header />
                <Navbar style={{ backgroundColor: "var(--maincolor)", height: '85px', width: '1300px', margin: '0 auto' }} data-bs-theme="dark">
                    <Container style={{ margin: '0 305px', textAlign: 'center' }}>
                        <Nav activeKey={activeKey} onSelect={handleSelect}>
                            <Nav.Link eventKey="/Main" href="/" style={activeKey === '/Main' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}>Home</Nav.Link>
                            <Nav.Link eventKey="/student-dashboard" href="/student-dashboard" style={activeKey === '#features' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}>마이포탈</Nav.Link>
                            <Nav.Link eventKey="/TotalBoardlist" href="/TotalBoardlist" style={activeKey === '/TotalBoardlist' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}>통합게시판</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                {activeKey === '/TotalBoardlist' && (
                    <div style={{ display: 'flex', width: '1300px', height: '85px', margin: '0 auto' }}>
                        <Nav activeKey={subActiveKey} onSelect={handleSubSelect} style={{ margin: '20px auto' }}>
                            <Nav.Item onSelect={handleSubSelect}>

                                <Nav.Link eventKey="/notice" onClick={handleSubSelect} href="#" style={subActiveKey === '/notice' ? { ...subLinkStyle, ...activeLinkStyle } : subLinkStyle}>공지사항</Nav.Link>
                            </Nav.Item>
                            {/* <Nav.Item>
                            <Nav.Link eventKey="/news" onClick={handleSubSelect} href="#" style={subActiveKey === '/news' ? { ...subLinkStyle, ...activeLinkStyle } : subLinkStyle}>News</Nav.Link>
                            </Nav.Item> */}
                            <Nav.Item>
                                <Nav.Link eventKey="/schedule" onClick={handleSubSelect} href="#" style={subActiveKey === '/schedule' ? { ...subLinkStyle, ...activeLinkStyle } : subLinkStyle}>교내일정</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                )
                }

                {subActiveKey === '/notice' && (
                  <NoticeBoard/>
                )}

                {subActiveKey === '/schedule' && (
                    <UnivCal/>
                )}

                {/* <Routes>
                    <Route exact path="/noticeWrite" element={<NoticeWrite/>}/>
                </Routes> */}
            </div >
        </>
    );
}

export default BoardNav;
