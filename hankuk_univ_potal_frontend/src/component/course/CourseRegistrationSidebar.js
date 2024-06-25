import { useState, useEffect } from 'react';
import '../../config/activeTab.css';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { memberAtom, tokenAtom } from '../../atoms';
import { Grid, Typography, ListSubheader, ListItemButton, ListItemText } from '@mui/material';
import axios from 'axios';
import { url } from '../../config/config';

export default function CourseRegistrationSidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const member = useAtomValue(memberAtom);
  const token = useAtomValue(tokenAtom);
  const [information, setInformation] = useState({majorName:'', finCredit:'', courYear:'', semester:''});
  let today = new Date();
  let year = today.getFullYear();

  useEffect(() => {
    let formData = new FormData();
    formData.append("stdNo", member.id);

    axios.post(`${url}/load-student-information`, formData, {
        headers: { Authorization: JSON.stringify(token) }
    })
        .then(res => {
            setInformation({...information, ...res.data.studentInformation});
        })
        .catch(err => {
            console.log(err);
        })
  }, [token])

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} backgroundColor={"firstColor.main"} height={230} margin={0}>
          <div style={{ padding:"25px 60px 60px 40px"}}>
            <Typography variant="h6" color={"white"} sx={{marginBottom:1, marginTop:0}}><b>{member.name}</b></Typography>
            <Typography variant="h7" color={"white"}>학번 : {member.id}</Typography><br/>
            <Typography variant="h7" color={"white"}>학과 : {information.majorName}</Typography><br/>
            <Typography variant="h7" color={"white"}>학년 : {information.courYear}학년</Typography><br/>
            <Typography variant="h7" color={"white"}>취득학점 : {information.finCredit}</Typography><br/>
          </div>
        </Grid>
        <Grid item xs={12} backgroundColor={"#E8EAF0"} height={"115vh"}>
          <ListSubheader component="div" id="nested-list-subheader" sx={{marginTop:2, marginBottom:2, backgroundColor:"#E8EAF0"}}>
            <Typography variant="h7" sx={{marginLeft:4, color:"black"}}>{year}학년도 {information.semester}학기 수강신청</Typography>
          </ListSubheader>
          <Link to="/course-registration" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton selected={selectedIndex === 0} onClick={(e) => handleListItemClick(e, 0)} sx={{marginLeft:3, borderRadius:10, width:250}}>
              <ListItemText primary="수강신청" sx={{pl:1}}/>
            </ListItemButton>
          </Link>
          <Link to="/course-registration/pre-registration" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton selected={selectedIndex === 1} onClick={(e) => handleListItemClick(e, 1)} sx={{marginLeft:3, borderRadius:10, width:250}}>
              <ListItemText primary="예비 수강신청" sx={{pl:1}}/>
            </ListItemButton>
          </Link>
        </Grid>
      </Grid>
    </>

  );
}