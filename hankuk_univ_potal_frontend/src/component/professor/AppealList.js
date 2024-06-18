import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
import { Button, Input } from "reactstrap";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
const AppealList = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);
    const navigate = useNavigate();
    const [status, setStatus] = useState('BOTH');
    const [appealList, setAppealList] = useState();

    useEffect(() => {

        // let profNo = JSON.parse(sessionStorage.getItem("prof"));
        submit(1);
    }, [token, lecture])

    const submit = (page) => {
        axios.get(`${url}/appealList?lecNo=${lecture.lecNo}`,
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                console.log(res);
                setAppealList([...res.data])
            })
            .catch(err => {
                console.log(err);
            })
    }

    const setList = (status) => {
        if (!appealList || appealList.length === 0) {
            return (
                <tr>
                    <td colSpan="4">이의신청이 없습니다</td>
                </tr>
            );
        }

        if (status === "BOTH") {
            return appealList.map((app, i) => (
                <React.Fragment key={i}>
                    <tr
                        className="Appeal_Table_Tr"
                        onClick={() => navigate(`/professor/appealDetail`, { state: { app } })}>
                        <td className="Appeal_Table_Td Appeal_Table_Td_First">{app.reqDt}</td>
                        <td className="Appeal_Table_Td">{app.stdNo}</td>
                        <td className="Appeal_Table_Td">{app.stdName}</td>
                        <td
                            className="Appeal_Table_Td Appeal_Table_Td_Last"
                            style={app.status === 'NEW' ? { color: 'red' } : { color: 'blueviolet' }}>
                            {app.status === 'NEW' ? '신규' : '완료'}
                        </td>
                    </tr>
                    <tr className="Appeal_Table_spacer"><td colSpan="4"></td></tr>
                </React.Fragment>
            ));
        } else {
            return appealList.filter((appeal) => appeal.status === status).map((app, i) => (
                <React.Fragment key={i}>
                    <tr className="Appeal_Table_Tr">
                        <td className="Appeal_Table_Td Appeal_Table_Td_First">{app.reqDt}</td>
                        <td className="Appeal_Table_Td">{app.stdNo}</td>
                        <td className="Appeal_Table_Td">{app.stdName}</td>
                        <td
                            className="Appeal_Table_Td Appeal_Table_Td_Last"
                            style={app.status === 'NEW' ? { color: 'red' } : { color: 'blueviolet' }}>
                            {app.status === 'NEW' ? '신규' : '완료'}
                        </td>
                    </tr>
                    <tr className="Appeal_Table_spacer"><td colSpan="4"></td></tr>
                </React.Fragment>
            ));
        }

    };

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>이의신청목록</b></Typography>
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
                            <b>이의신청목록</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                
                <div style={{width:'1170px'}}>
                <Input
                    className="Appeal_Input"
                    id="status"
                    name="status"
                    type="select"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value='BOTH'>상태</option>
                    <option value='NEW'>신규</option>
                    <option value='END'>완료</option>
                </Input>
                </div>
                
                <div className='Appeal_body'>
                    <table className="Appeal_Table">
                        <thead className="Appeal_Table_Thead">
                            <th>등록날짜</th>
                            <th>학번</th>
                            <th>학생이름</th>
                            <th>상태</th>
                        </thead>
                        <tbody className="Appeal_Table_TBody">
                            {setList(status)}
                        </tbody>
                    </table>
                </div>
            </Paper>
        </Grid>
    )
}
export default AppealList;