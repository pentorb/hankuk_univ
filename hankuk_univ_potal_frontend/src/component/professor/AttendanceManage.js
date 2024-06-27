import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Swal from 'sweetalert2'
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
import { Button, Input, Table } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import React from 'react';


const AttendanceManage = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);
    const [lessonList, setLessonList] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(`${url}/attendanceManageDetail?lecNo=${lecture.lecNo}`,
                    {
                        headers: { Authorization: JSON.stringify(token) }
                    }
                );
                // Assuming response.data is an array of lessons
                console.log(response.data);
                setAttendanceList(response.data.attendanceList);

                let mockData = [];
                for (let index = 0; index < 15; index++) {
                    mockData.push({ week: index + 1, attendanceList: attendanceList });
                }
                setLessonList(mockData);
            } catch (error) {
                console.error("Error fetching lessons", error);
                // Mock data in case of error

            }
        };

        fetchLessons();

    }, [token, lecture]);


    const handleStatusChange = (e, attIndex, weekIndex, offset) => {
        const newStatus = e.target.value;
        const updatedAttendanceList = attendanceList.map((att, i) => {
            if (i === attIndex) {
                const newStatusArray = att.status.split('');
                newStatusArray[weekIndex + offset] = newStatus === '출석' ? '1' : newStatus === '지각' ? '2' : '3';
                return { ...att, status: newStatusArray.join('') };
            }
            return att;
        });
        setAttendanceList(updatedAttendanceList);
    };

    const modify = () => {
        axios.post(`${url}/attendanceModify`,{attendanceList:attendanceList},
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
        .then((res)=>{
            console.log(res)
            Swal.fire({
                title: "출결 현황이 변경되었습니다.",
                // text: "That thing is still around?",
                icon: "success"
              });        
            })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>출결관리</b></Typography>
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
                            <b>출결관리</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <div className="AttendManage_Body">
                    <div className="AttendManage_Header">
                        <Button className="AttendManage_Header_Button"
                                onClick={modify}>
                            저장
                        </Button>
                    </div>
                    <div className="AttendManage_Table">
                        <Table bordered hover>
                            <thead>
                                <tr >
                                    <th className="AttendManage_Table_thead" rowSpan="2">
                                        
                                    </th>
                                    
                                    {lessonList.map((lesson, i) => {
                                        return (
                                            <th className="AttendManage_Table_thead" key={i} colSpan="2" 
                                            >{i + 1}주차</th>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    {lessonList.map((lesson, i) => (
                                        <React.Fragment key={i}>
                                            <th className="AttendManage_Table_thead">1차시</th>
                                            <th className="AttendManage_Table_thead">2차시</th>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceList && lessonList && attendanceList.map((att, index) => (
                                    <tr key={index} className="AttendManage_Table_td">
                                        <th className="AttendManage_Table_thead">
                                            {att.stdName}
                                        </th>
                                        {lessonList.map((less, i) => (
                                            <React.Fragment key={i}>
                                            <td key={i} className="AttendManage_Table_td">
                                                <select
                                                    value={att.status.substr((i)*2, 1) === '1' ? '출석' : att.status.substr((i)*2, 1) === '2' ? '지각' : '결석'}
                                                    style={att.status.substr((i)*2, 1) === '1' ? {color:'black'} : att.status.substr((i)*2, 1) === '2' ? {color:'blueviolet'} : {color:'red'}}
                                                    onChange={(e) => handleStatusChange(e, index, (i)*2, 0)}
                                                    className="AttendManage_Select"
                                                >
                                                    <option value="출석" style={{color:'black'}}>출석</option>
                                                    <option value="지각" style={{ color: 'blue' }}>지각</option>
                                                    <option value="결석" style={{ color: 'red' }}>결석</option>
                                                </select>
                                                {/* /
                                                <select
                                                    value={att.status.substr(15+i, 1) === '1' ? '출석' : att.status.substr(15+i, 1) === '2' ? '지각' : '결석'}
                                                    style={att.status.substr(15+i, 1) === '1' ? {color:'black'} : att.status.substr(15+i, 1) === '2' ? {color:'blueviolet'} : {color:'red'}}
                                                    onChange={(e) => handleStatusChange(e, index, i, 15)}
                                                    className="AttendManage_Select"
                                                >
                                                    <option value="출석" style={{color:'black'}}>출석</option>
                                                    <option value="지각" style={{ color: 'blue' }}>지각</option>
                                                    <option value="결석" style={{ color: 'red' }}>결석</option>
                                                </select> */}
                                            </td>
                                            <td className="AttendManage_Table_td">
                                            <select
                                                value={att.status.substr((i)*2+1, 1) === '1' ? '출석' : att.status.substr((i)*2+1, 1) === '2' ? '지각' : '결석'}
                                                style={att.status.substr((i)*2+1, 1) === '1' ? {color:'black'} : att.status.substr((i)*2+1, 1) === '2' ? {color:'blueviolet'} : {color:'red'}}
                                                onChange={(e) => handleStatusChange(e, index, (i)*2+1, 0)}
                                                className="AttendManage_Select"
                                            >
                                                <option value="출석" style={{color:'black'}}>출석</option>
                                                <option value="지각" style={{ color: 'blue' }}>지각</option>
                                                <option value="결석" style={{ color: 'red' }}>결석</option>
                                            </select>
                                        </td>
                                        </React.Fragment>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>

            </Paper>
        </Grid>
    )
}
export default AttendanceManage;