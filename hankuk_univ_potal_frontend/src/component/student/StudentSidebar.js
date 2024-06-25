import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import '../../config/activeTab.css';
import { Tab, Tabs, Grid, Typography, List, ListSubheader, Collapse, ListItemButton, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { activeTabAtom, lectureNameAtom, lectureNumberAtom } from '../../atoms';
import './css/studentSidebar.css';

export default function StudentSidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const lectureNumber = useAtomValue(lectureNumberAtom);
  const lectureName = useAtomValue(lectureNameAtom);
  const navigate = useNavigate();

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  const handleFirstClick = () => {
    setFirstOpen(!firstOpen);
  };

  const handleSecondClick = () => {
    setSecondOpen(!secondOpen);
  };

  const handleThirdClick = () => {
    setThirdOpen(!thirdOpen);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ backgroundColor: "#435480", height: "140vh" }}>
          <Tabs orientation="vertical" aria-label="icon label tabs example" value={false}>
            <Tab icon={<PersonIcon sx={{ fontSize: 50 }} />}
              label={<span style={{ fontWeight: 'bold' }}>마이페이지</span>}
              id={1 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(1)} sx={{ color: "white", paddingLeft: 0, paddingRight: 0 }} />

            <Tab icon={<MenuBookIcon sx={{ fontSize: 50 }} />}
              label={<span style={{ fontWeight: 'bold' }}>강의</span>}
              id={(2 === activeTab || 5 === activeTab) ? "active" : ""}
              onClick={() => { setActiveTab(2); navigate("/student/lecture"); setSelectedIndex(8); }} sx={{ color: "white" }} />

            <Tab icon={<AppRegistrationIcon sx={{ fontSize: 50 }} />}
              label={<span style={{ fontWeight: 'bold' }}>학적</span>}
              id={(3 === activeTab ) ? "active" : ""}
              onClick={() => { setActiveTab(3); }} sx={{ color: "white" }} />

            <Tab icon={<CalendarMonthIcon sx={{ fontSize: 50 }} />}
              label={<span style={{ fontWeight: 'bold' }}>일정</span>}
              id={4 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(4)} sx={{ color: "white" }} />

          </Tabs>
        </Grid>
        <Grid item xs={8} backgroundColor={"#FFFFFF"}>
          {activeTab === 0 &&
            <>
              <Link to="/student/" style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton sx={{ pl: 3, borderRadius: 10, width: 180 }} selected={selectedIndex === 0} onClick={(e) => handleListItemClick(e, 0)}>
                  <ListItemText primary="대시보드" />
                </ListItemButton>
              </Link>
            </>}
          {activeTab === 1 &&
            <>
              <Link to="/student/mypage" style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton sx={{ pl: 3, borderRadius: 10, width: 180 }} selected={selectedIndex === 1} onClick={(e) => handleListItemClick(e, 1)}>
                  <ListItemText primary="정보 수정" />
                </ListItemButton>
              </Link>
            </>}
          {activeTab === 2 &&
            <>
              <Link to="/student/lecture" style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton sx={{ pl: 3, borderRadius: 10, width: 180 }} selected={selectedIndex === 2} onClick={(e) => handleListItemClick(e, 2)}>
                  <ListItemText primary="대시보드" />
                </ListItemButton>
              </Link>
            </>}
          {activeTab === 3 &&
            <>
              <ListItemButton onClick={handleFirstClick}>
                <ListItemText primary="학적" />
                {firstOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={firstOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/student/mypage" style={{ textDecoration: "none", color: 'black' }}>
                    <ListItemButton sx={{ pl: 4, borderRadius: 10, width: 180 }} selected={selectedIndex === 3} onClick={(e) => handleListItemClick(e, 3)}>
                      <ListItemText primary="상세보기" />
                    </ListItemButton>
                  </Link>
                  <Link to="/student/regHuehak" style={{ textDecoration: "none", color: 'black' }}>
                    <ListItemButton sx={{ pl: 4, borderRadius: 10, width: 180 }} selected={selectedIndex === 4} onClick={(e) => handleListItemClick(e, 4)}>
                      <ListItemText primary="휴학신청" />
                    </ListItemButton>
                  </Link>
                  <Link to="/student/resSemester" style={{ textDecoration: "none", color: 'black' }}>
                    <ListItemButton sx={{ pl: 4, borderRadius: 10, width: 180 }} selected={selectedIndex === 5} onClick={(e) => handleListItemClick(e, 5)}>
                      <ListItemText primary="휴학내역조회" />
                    </ListItemButton>
                  </Link>
                  <Link to="/student/regBokhak" style={{ textDecoration: "none", color: 'black' }}>
                    <ListItemButton sx={{ pl: 4, borderRadius: 10, width: 180 }} selected={selectedIndex === 6} onClick={(e) => handleListItemClick(e, 6)}>
                      <ListItemText primary="복학신청" />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
              <ListItemButton onClick={handleSecondClick}>
                <ListItemText primary="성적" />
                {secondOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={secondOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/student/check-grade" style={{ textDecoration: "none", color: "black" }}>
                    <ListItemButton sx={{ pl: 4, borderRadius: 10, width: 180 }} selected={selectedIndex === 7} onClick={(e) => handleListItemClick(e, 7)}>
                      <ListItemText primary="전체성적" />
                    </ListItemButton>
                  </Link>
                  <Link to="/student/appeal-list" style={{ textDecoration: "none", color: "black" }}>
                    <ListItemButton sx={{ pl: 4, borderRadius: 10, width: 180 }} selected={selectedIndex === 8} onClick={(e) => handleListItemClick(e, 8)}>
                      <ListItemText primary="이의신청 내역" />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
              <ListItemButton onClick={handleThirdClick}>
                <ListItemText primary="졸업" />
                {thirdOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={thirdOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/student/my-grade" style={{ textDecoration: "none", color: "black" }}>
                    <ListItemButton sx={{ pl: 2, borderRadius: 10, width: 180 }} selected={selectedIndex === 9} onClick={(e) => handleListItemClick(e, 9)}>
                      <ListItemText primary="전체학기 성적조회" />
                    </ListItemButton>
                  </Link>
                  <Link to="/student/credits" style={{ textDecoration: "none", color: "black" }}>
                    <ListItemButton sx={{ pl: 4, borderRadius: 10, width: 180 }} selected={selectedIndex === 10} onClick={(e) => handleListItemClick(e, 10)}>
                      <ListItemText primary="학점이수 현황" />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
            </>}
          {activeTab === 4 &&
            <>
              <Link to="/student/calendar" style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton selected={selectedIndex === 12} onClick={(e) => handleListItemClick(e, 11)} sx={{ borderRadius: 10, width: 180 }}>
                  <ListItemText primary="일정 조회" sx={{ pl: 1 }} />
                </ListItemButton>
              </Link>
              <Link to="/student/insert-calendar" style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton selected={selectedIndex === 13} onClick={(e) => handleListItemClick(e, 12)} sx={{ borderRadius: 10, width: 180 }}>
                  <ListItemText primary="일정 등록" sx={{ pl: 1 }} />
                </ListItemButton>
              </Link>
            </>}
          {(activeTab === 5) &&
            <>
              <ListSubheader component="div" id="nested-list-subheader">
                <Typography fontWeight={"bold"} sx={{ marginTop: 4, marginBottom: 4, color: "#4952A9", fontSize:'20px' }}>{lectureName}</Typography>
              </ListSubheader>
              <Link to={`/student/${lectureNumber}/content`} style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton selected={selectedIndex === 1} onClick={(e) => handleListItemClick(e, 1)} sx={{ borderRadius: 10, width: 180 }}>
                  <ListItemText primary="강의콘텐츠" sx={{ pl: 1 }} />
                </ListItemButton>
              </Link>
              <Link to={`/student/${lectureNumber}/syllabus`} style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton selected={selectedIndex === 2} onClick={(e) => handleListItemClick(e, 2)} sx={{ borderRadius: 10, width: 180 }}>
                  <ListItemText primary="강의계획서" sx={{ pl: 1 }} />
                </ListItemButton>
              </Link>
              <Link to={`/student/${lectureNumber}/attendance`} style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton selected={selectedIndex === 3} onClick={(e) => handleListItemClick(e, 3)} sx={{ borderRadius: 10, width: 180 }}>
                  <ListItemText primary="출결현황" sx={{ pl: 1 }} />
                </ListItemButton>
              </Link>
              <Link to={`/student/${lectureNumber}/homework`} style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton selected={selectedIndex === 4} onClick={(e) => handleListItemClick(e, 4)} sx={{ borderRadius: 10, width: 180 }}>
                  <ListItemText primary="과제" sx={{ pl: 1 }} />
                </ListItemButton>
              </Link>
            </>}

        </Grid>
      </Grid>
    </>

  );
}