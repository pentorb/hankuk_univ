import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
import { useNavigate } from "react-router";
import { Input } from "reactstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";

const AbsenceList = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);
    const navigate = useNavigate();
    const [status, setStatus] = useState('BOTH');
    const [week, setWeek] = useState(0);
    const [absenceList, setAbsenceList] = useState();

    useEffect(() => {

        // let profNo = JSON.parse(sessionStorage.getItem("prof"));
        submit(1);
    }, [token, lecture])

    const submit = () => {
        axios.get(`${url}/absenceList?lecNo=${lecture.lecNo}`,
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                console.log(res);
                setAbsenceList([...res.data])
            })
            .catch(err => {
                console.log(err);
            })
    }

    const setList = (status, week) => {
        if (!absenceList || absenceList.length === 0) {
            return (
                <tr>
                    <td colSpan="4">공결신청이 없습니다</td>
                </tr>
            );
        }

        if (week===0) {
            if(status === "BOTH"){
                return absenceList.map((abs, i) => (
                    <React.Fragment key={i}>
                        <tr
                            className="Appeal_Table_Tr"
                            onClick={() => navigate(`/professor/absenceDetail`, { state: { abs } })}>
                            <td className="Appeal_Table_Td Appeal_Table_Td_First">{abs.regDt}</td>
                            <td className="Appeal_Table_Td">{abs.stdNo}</td>
                            <td className="Appeal_Table_Td">{abs.stdName}</td>
                            <td className="Appeal_Table_Td">{abs.week}주차</td>
                            <td
                                className="Appeal_Table_Td Appeal_Table_Td_Last"
                                style={abs.status === 'NEW' ? { color: 'red' } : { color: 'blueviolet' }}>
                                {abs.status === 'NEW' ? '신규' : '완료'}
                            </td>
                        </tr>
                        <tr className="Appeal_Table_spacer"><td colSpan="4"></td></tr>
                    </React.Fragment>
                ));
            } else {
                return absenceList.filter((absence) => absence.status === status).map((abs, i) => (
                    <React.Fragment key={i}>
                        <tr className="Appeal_Table_Tr"
                            onClick={() => navigate(`/professor/absenceDetail`, { state: { abs } })}>
                            <td className="Appeal_Table_Td Appeal_Table_Td_First">{abs.regDt}</td>
                            <td className="Appeal_Table_Td">{abs.stdNo}</td>
                            <td className="Appeal_Table_Td">{abs.stdName}</td>
                            <td className="Appeal_Table_Td">{abs.week}주차</td>
                            <td
                                className="Appeal_Table_Td Appeal_Table_Td_Last"
                                style={abs.status === 'NEW' ? { color: 'red' } : { color: 'blueviolet' }}>
                                {abs.status === 'NEW' ? '신규' : '완료'}
                            </td>
                        </tr>
                        <tr className="Appeal_Table_spacer"><td colSpan="4"></td></tr>
                    </React.Fragment>
                ));
            }
        } 
        
        else {
            if(status === "BOTH"){
                console.log(week);
                return absenceList.filter((absence) => absence.week === week).map((abs, i) => (
                    <React.Fragment key={i}>
                        <tr className="Appeal_Table_Tr"
                            onClick={() => navigate(`/professor/absenceDetail`, { state: { abs } })}>
                            <td className="Appeal_Table_Td Appeal_Table_Td_First">{abs.regDt}</td>
                            <td className="Appeal_Table_Td">{abs.stdNo}</td>
                            <td className="Appeal_Table_Td">{abs.stdName}</td>
                            <td className="Appeal_Table_Td">{abs.week}주차</td>
                            <td
                                className="Appeal_Table_Td Appeal_Table_Td_Last"
                                style={abs.status === 'NEW' ? { color: 'red' } : { color: 'blueviolet' }}>
                                {abs.status === 'NEW' ? '신규' : '완료'}
                            </td>
                        </tr>
                        <tr className="Appeal_Table_spacer"><td colSpan="4"></td></tr>
                    </React.Fragment>
                ));
            } else {
                return absenceList.filter((absence) => absence.status === status && absence.week === week).map((abs, i) => (
                    <React.Fragment key={i}>
                        <tr className="Appeal_Table_Tr"
                            onClick={() => navigate(`/professor/absenceDetail`, { state: { abs } })}>
                            <td className="Appeal_Table_Td Appeal_Table_Td_First">{abs.regDt}</td>
                            <td className="Appeal_Table_Td">{abs.stdNo}</td>
                            <td className="Appeal_Table_Td">{abs.stdName}</td>
                            <td className="Appeal_Table_Td">{abs.week}주차</td>
                            <td
                                className="Appeal_Table_Td Appeal_Table_Td_Last"
                                style={abs.status === 'NEW' ? { color: 'red' } : { color: 'blueviolet' }}>
                                {abs.status === 'NEW' ? '신규' : '완료'}
                            </td>
                        </tr>
                        <tr className="Appeal_Table_spacer"><td colSpan="4"></td></tr>
                    </React.Fragment>
                ));
            }
            
        }

    };

    return(
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>공결신청목록</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/professor/">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none' href="/professor/lectureDashboard">
                            과목
                        </Link>
                        <Link color="inherit" underline='none'>
                            {lecture.subName}
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>공결신청목록</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                
                <div style={{width:'1170px'}}>
                <Input
                    className="Appeal_Input"
                    id="status"
                    name="status"
                    type="select"
                    // style={{width:'100px', marginLeft:'10px', display:'inline-block'}}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value='BOTH'>상태</option>
                    <option value='NEW'>신규</option>
                    <option value='END'>완료</option>
                </Input>

                <Input
                    className="Appeal_Input"
                    id="week"
                    name="week"
                    type="select"
                    // style={{width:'100px', marginLeft:'10px', display:'inline-block'}}
                    onChange={(e) => setWeek(Number(e.target.value))}
                >
                    <option value='0'>주차</option>
                    <option value='1'>1주차</option>
                    <option value='2'>2주차</option>
                    <option value='3'>3주차</option>
                    <option value='4'>4주차</option>
                    <option value='5'>5주차</option>
                    <option value='6'>6주차</option>
                    <option value='7'>7주차</option>
                    <option value='8'>8주차</option>
                    <option value='9'>9주차</option>
                    <option value='10'>10주차</option>
                    <option value='11'>11주차</option>
                    <option value='12'>12주차</option>
                    <option value='13'>13주차</option>
                    <option value='14'>14주차</option>
                    <option value='15'>15주차</option>
                </Input>
                </div>

                <div className='Appeal_body'>
                    <table className="Appeal_Table">
                        <thead className="Appeal_Table_Thead">
                            <th>등록날짜</th>
                            <th>학번</th>
                            <th>학생이름</th>
                            <th>주차</th>
                            <th>상태</th>
                        </thead>
                        <tbody className="Appeal_Table_TBody">
                            {setList(status, week)}
                        </tbody>
                    </table>
                </div>

                </Paper>
        </Grid>
    )
}
export default AbsenceList;