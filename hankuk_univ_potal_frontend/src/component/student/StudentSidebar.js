import * as React from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import '../../config/activeTab.css';

export default function StudentSidebar() {
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
        <Grid item xs={4} sx={{backgroundColor:"#435480", height:"100vh"}}>
          <Tabs orientation="vertical" aria-label="icon label tabs example" value={false}>
            <Tab icon={<ManageAccountsIcon sx={{ fontSize: 50 }} />} label="계정" id={1 === activeTab ? "active" : ""}
            onClick={() => setActiveTab(1)} sx={{color: "white"}} />
            <Tab icon={<AccountCircleIcon sx={{ fontSize: 50 }} />} label="마이페이지" id={2 === activeTab ? "active" : ""}
            onClick={() => setActiveTab(2)} sx={{color: "white", paddingLeft:0, paddingRight:0}}/>
            <Tab icon={<MenuBookIcon sx={{ fontSize: 50 }} />} label="과목" id={3 === activeTab ? "active" : ""}
            onClick={() => setActiveTab(3)} sx={{color: "white"}}/>
            <Tab icon={<CalendarMonthIcon sx={{ fontSize: 50 }} />} label="캘린더" id={4 === activeTab ? "active" : ""}
            onClick={() => setActiveTab(4)} sx={{color: "white"}}/>
            <Tab icon={<QuestionAnswerIcon sx={{ fontSize: 50 }} />} label="쪽지" id={5 === activeTab ? "active" : ""}
            onClick={() => setActiveTab(5)} sx={{color: "white"}}/>
          </Tabs>
        </Grid>
        <Grid item xs={8}>
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
              <ListItemButton onClick={handleSecondClick}>
                <ListItemText primary="성적" />
                {secondOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={secondOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="전체성적" />
                  </ListItemButton>
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
              <ListItemButton>
                <ListItemText primary="3번째 메뉴" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="3번째 메뉴" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="3번째 메뉴" />
              </ListItemButton>
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