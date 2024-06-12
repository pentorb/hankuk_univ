import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
import { Input, Table} from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
const AttendanceManage = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);
    const [lessonList, setLessonList] = useState([]);
    const [studentList, setStudentList] = useState([{},{},{}]);
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
                // setStudentList(response.data.studentList);

                let mockData = [];
                for (let index = 0; index < 15; index++) {
                    let lessonData = [];
                    let homeworkData = [];
                    // response.data.lessonDataList.forEach(data => {
                    //     if (data.week === index + 1) {
                    //         lessonData.push(data);
                    //     }
                    // })
                    // response.data.homeworkList.forEach(homework => {
                    //     if (homework.week === index + 1) {
                    //         homeworkData.push(homework);
                    //     }
                    // })
                    mockData.push({ week: index + 1, lessonData: lessonData, homework: homeworkData });
                }
                setLessonList(mockData);
                console.log(lessonList);
            } catch (error) {
                console.error("Error fetching lessons", error);
                // Mock data in case of error

            }
        };

        fetchLessons();

    }, [token, lecture]);


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
                    <div>

                    </div>
                    <div className="AttendManage_Table">
                    <Table bordered hover>
                        <thead >
                            <tr >
                                <th className="AttendManage_Table_thead">
                                    학생\주차
                                </th>
                                {lessonList.map((lesson, i) => {
                                    return (
                                        <th className="AttendManage_Table_thead" key={i} >{i + 1}주차</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((stud, i) => (
                                    <tr className="AttendManage_Table_td">
                                        <th  className="AttendManage_Table_thead">
                                            홍길동
                                        </th>
                                        {lessonList.map((i) => (
                                                <td className="AttendManage_Table_td">
                                                    <select type="" className="AttendManage_Select">
                                                        <option>-</option>
                                                        <option>출석</option>
                                                        <option style={{color:'blue'}}>지각</option>
                                                        <option style={{color:'red'}}>결석</option>
                                                    </select>
                                                </td>
                                            )
                                        )}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                    </div>
                </div>

            </Paper>
        </Grid>
    )
}
export default AttendanceManage;