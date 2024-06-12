import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClassIcon from '@mui/icons-material/Class';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import '../../config/activeTab.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


export default function StaffSidebar() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
        <Grid item xs={4} sx={{ backgroundColor: "#435480", height: "120vh" }}>
          <Tabs orientation="vertical" aria-label="icon label tabs example" value={false}>
            <Tab icon={<AccountCircleIcon sx={{ fontSize: 50 }} />} label={<Typography sx={{ fontWeight: 'bold' }}>계정</Typography>} id={1 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(1)} sx={{ color: "white" }} />
            <Tab icon={<ClassIcon sx={{ fontSize: 50 }} />} label={<Typography sx={{ fontWeight: 'bold' }}>학사 운영</Typography>} id={2 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(2)} sx={{ color: "white", paddingLeft: 0, paddingRight: 0 }} />
            <Tab icon={<ManageAccountsIcon sx={{ fontSize: 50 }} />} label={<Typography sx={{ fontWeight: 'bold' }}>학생 지원</Typography>} id={3 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(3)} sx={{ color: "white", paddingLeft: 0, paddingRight: 0 }} />
            <Tab icon={<CalendarMonthIcon sx={{ fontSize: 50 }} />} label={<Typography sx={{ fontWeight: 'bold' }}>캘린더</Typography>} id={4 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(4)} sx={{ color: "white" }} />
            <Tab icon={<QuestionAnswerIcon sx={{ fontSize: 50 }} />} label={<Typography sx={{ fontWeight: 'bold' }}>쪽지</Typography>} id={5 === activeTab ? "active" : ""}
              onClick={() => setActiveTab(5)} sx={{ color: "white" }} />
          </Tabs>
        </Grid>
        <Grid item xs={8} backgroundColor={0 === activeTab ? "#DDE1E8" : "#FFFFFF"}>
          {activeTab === 1 &&
            <>
              <ListItemButton onClick={handleFirstClick}>
                <ListItemText primary="학적" />
                {firstOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={firstOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="상세보기" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="휴학신청" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="복학신청" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>}
          {activeTab === 2 &&
            <>
              <ListItemButton onClick={handleFirstClick}>
                <ListItemText primary="학생" />
                {firstOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={firstOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="상세보기" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="휴학신청" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="복학신청" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={handleSecondClick}>
                <ListItemText primary="성적" />
                {secondOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={secondOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/staff/AccountManagement" style={{textDecoration: "none", color:"black"}}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="전체성적" />
                    </ListItemButton>
                  </Link>
                  <ListItemButton sx={{ pl: 4 }}>
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
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="전체학기 성적조회" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="학점이수 현황" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>}
          {activeTab === 3 &&
            <>
              <ListItemButton onClick={handleFirstClick}>
                <ListItemText primary="학생 지원" />
                {firstOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={firstOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/staff/AccountManagement" style={{textDecoration: "none", color:"black"}}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="계정 관리" />
                  </ListItemButton>
                  </Link>
                  <Link to="/staff/confirmHuehak" style={{textDecoration: "none", color:"black"}}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="휴학 관리" />
                  </ListItemButton>
                  </Link>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="성적 확정" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>}
          {activeTab === 4 &&
            <>
              <ListItemButton>
                <ListItemText primary="4번째 메뉴" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="4번째 메뉴" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="4번째 메뉴" />
              </ListItemButton>
            </>}
          {activeTab === 5 &&
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