import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import '../../config/activeTab.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './css/studentSidebar.css';

export default function StudentSidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
            <Tab icon={<AccountCircleIcon sx={{ fontSize: 50 }} />} label={<Typography sx={{ fontWeight: 'bold' }}>마이페이지</Typography>} id={1 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(1)} sx={{ color: "white", paddingLeft: 0, paddingRight: 0 }} />
            <Tab icon={<MenuBookIcon sx={{ fontSize: 50 }} />} label={<Typography sx={{ fontWeight: 'bold' }}>과목</Typography>} id={2 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(2)} sx={{ color: "white" }} />
            <Tab icon={<CalendarMonthIcon sx={{ fontSize: 50 }} />} label={<Typography sx={{ fontWeight: 'bold' }}>캘린더</Typography>} id={3 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(3)} sx={{ color: "white" }} />
            <Tab icon={<QuestionAnswerIcon sx={{ fontSize: 50 }} />} label={<Typography sx={{ fontWeight: 'bold' }}>쪽지</Typography>} id={4 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(4)} sx={{ color: "white" }} />
          </Tabs>
        </Grid>
        <Grid item xs={8} backgroundColor={"#FFFFFF"}>          
          {activeTab === 0 &&
            <>
              <Link to="/student/" style={{textDecoration: "none", color:"black"}}>
                <ListItemButton selected={selectedIndex === 0} onClick={(e) => handleListItemClick(e, 0)}>
                  <ListItemText primary="대시보드" />
                </ListItemButton>
              </Link>
            </>}
          {activeTab === 1 &&
            <>
              <ListItemButton onClick={handleFirstClick}>
                <ListItemText primary="학적" />
                {firstOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={firstOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/student/resSemester"  style={{textDecoration:"none", color:'black'}}>
                  <ListItemButton sx={{ pl: 4 }}  selected={selectedIndex === 1} onClick={(e) => handleListItemClick(e, 1)}>
                    <ListItemText primary="상세보기" />
                  </ListItemButton>
                  </Link>
                  <Link to="/student/regHuehak" style={{textDecoration:"none", color:'black'}}>
                  <ListItemButton sx={{ pl: 4 }}  selected={selectedIndex === 2} onClick={(e) => handleListItemClick(e, 2)}>
                    <ListItemText primary="휴학신청" />
                  </ListItemButton>
                  </Link>
                  <Link to="/student/regBokhak" style={{textDecoration:"none", color:'black'}}>
                  <ListItemButton sx={{ pl: 4 }}  selected={selectedIndex === 3} onClick={(e) => handleListItemClick(e, 3)}>
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
                  <Link to="/student/check-grade" style={{textDecoration: "none", color:"black"}}>
                    <ListItemButton sx={{ pl: 4 }}  selected={selectedIndex === 4} onClick={(e) => handleListItemClick(e, 4)}>
                      <ListItemText primary="전체성적" />
                    </ListItemButton>
                  </Link>
                  <ListItemButton sx={{ pl: 4 }}  selected={selectedIndex === 5} onClick={(e) => handleListItemClick(e, 5)}>
                    <ListItemText primary="이의신청 내역" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={handleThirdClick}>
                <ListItemText primary="졸업" />
                {thirdOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={thirdOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}  selected={selectedIndex === 6} onClick={(e) => handleListItemClick(e, 6)}>
                    <ListItemText primary="전체학기 성적조회" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}  selected={selectedIndex === 7} onClick={(e) => handleListItemClick(e, 7)}>
                    <ListItemText primary="학점이수 현황" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>}
          {activeTab === 2 &&
            <>
              <ListItemButton  selected={selectedIndex === 8} onClick={(e) => handleListItemClick(e, 8)}>
                <ListItemText primary="3번째 메뉴" />
              </ListItemButton>
              <ListItemButton  selected={selectedIndex === 9} onClick={(e) => handleListItemClick(e, 9)}>
                <ListItemText primary="3번째 메뉴" />
              </ListItemButton>
              <ListItemButton selected={selectedIndex === 10} onClick={(e) => handleListItemClick(e, 10)}>
                <ListItemText primary="3번째 메뉴" />
              </ListItemButton>
              <ListItemButton selected={selectedIndex === 11} onClick={(e) => handleListItemClick(e, 11)}>
                <ListItemText primary="3번째 메뉴" />
              </ListItemButton>
            </>}
          {activeTab === 3 &&
            <>
              <Link to="/student/calendar" style={{textDecoration:"none", color:"black"}}>
                <ListItemButton selected={selectedIndex === 12} onClick={(e) => handleListItemClick(e, 12)}>
                  <ListItemText primary="일정 조회"/>
                </ListItemButton>
              </Link>
              <Link to="/student/insert-calendar" style={{textDecoration: "none", color:"black"}}>
                <ListItemButton selected={selectedIndex === 13} onClick={(e) => handleListItemClick(e, 13)}>
                  <ListItemText primary="일정 등록"/>
                </ListItemButton>
              </Link>
            </>}
          {activeTab === 4 &&
            <>
              <ListItemButton>
                <ListItemText primary="5번째 메뉴" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="5번째 메뉴" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="5번째 메뉴" />
              </ListItemButton>
            </>}
        </Grid>
      </Grid>
    </>

  );
}