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

const GradeManage = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);
    const [examResult, setExamResult] = useState({
        totalScore:0, examNo:0, stdNo:''
    })
    const [studentList, setStudentList] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);
    const [examResultList, setExamResultList] = useState([]);
    const [homeworkSubmitList, setHomeworkSubmitList] = useState([]);
    const [homeworkCount, setHomeworkCount] = useState([]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(`${url}/gradeManageDetail?lecNo=${lecture.lecNo}`,
                    {
                        headers: { Authorization: JSON.stringify(token) }
                    }
                );
                console.log(response.data);
                setStudentList(response.data.studentList);
                setAttendanceList(response.data.attendanceList);
                setExamResultList(response.data.examResultList);
                setHomeworkSubmitList(response.data.homeworkSubmitList);
                setHomeworkCount(response.data.homeworkCount);
                // let mockData = [];
                // for (let index = 0; index < 15; index++) {
                //     mockData.push({ week: index + 1, attendanceList: attendanceList });
                // }
                // setLessonList(mockData);
            } catch (error) {
                console.error("Error fetching lessons", error);
                // Mock data in case of error

            }
        };

        fetchLessons();

    }, [token, lecture]);

    const changevalue = (e, stdNo, sect) => {
        console.log(stdNo)
        
        const updatedExamResultList = examResultList.map((std, i) => {
            if (std.stdNo === stdNo && std.sect===sect) {
                return { ...std, totalScore: e.target.value };
            }
            return std;
        });
        setExamResultList(updatedExamResultList);
    }

    const getattendance = (stdNo) => {
        let attcount = 0;
        let latecount = 0;
        for (let index = 0; index < 30; index++) {
            switch (attendanceList.find(att => att.stdNo === stdNo)?.status[index]) {
                case '1': attcount++;
                    break;
                case '2': attcount++; latecount++;
                    break;
                default: break;
            }
        }
        if (latecount / 3 > 0) { attcount = attcount - Math.floor(latecount / 3) };

        return attcount;
    };

    const getHomeworkScores = (stdNo) => {

        const scores = homeworkSubmitList.filter(hw => hw.stdNo === stdNo).map(hw => hw.score);
        const totalScore = scores.reduce((acc, score) => acc + score, 0);
        return scores.length > 0 ? totalScore + `/${homeworkCount * 100}` : '없음';
   

    };

    const calculateScore = (stdNo) => {
        const attendanceScore = getattendance(stdNo) / 30 * 100 * 0.2;
        const homeworkScore = homeworkSubmitList.filter(hw => hw.stdNo === stdNo).length > 0 ? homeworkSubmitList.filter(hw => hw.stdNo === stdNo).map(hw => hw.score).reduce((acc, score) => acc + score, 0) * 0.2 / homeworkCount : 0;
        const midtermScore = examResultList.find(exam => exam.stdNo === stdNo && exam.sect === '중간고사')?.totalScore * 0.3 || 0;
        const finalScore = examResultList.find(exam => exam.stdNo === stdNo && exam.sect === '기말고사')?.totalScore * 0.3 || 0;
        console.log(attendanceScore)
        console.log(homeworkScore)
        console.log(midtermScore)
        console.log(finalScore)
        
        return (attendanceScore + homeworkScore + midtermScore + finalScore).toFixed(2);
    };

    const modifyExamResult = () => {
        axios.post(`${url}/examResultModify`, {examResultList:examResultList},
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
        .then((res)=>{
            Swal.fire({
                title: res.data,
                // text: "That thing is still around?",
                icon: "success"
              }); 
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const createResult = (e, stdNo, sect) => {
        examResultList.push({...examResult, stdNo : stdNo, totalScore : e.target.value, sect:sect, lecNo:lecture.lecNo })
    }

    const submitGrade = () => {
        Swal.fire({
            title: "정말로 등급을 확정하시겠습니까?",
            // text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "아니오",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "성적이 확정되었습니다.",
                icon: "success"
              });
              const updatedStudentList = studentList.map((std,i) => ({
                ...std,
                grade: calculateScore(std.stdNo)
            }));
            console.log(updatedStudentList)
            axios.post(`${url}/gradeWrite`, {studentList:updatedStudentList},
                {
                    headers: { Authorization: JSON.stringify(token) }
                }
            )
            .then((res)=>{
                console.log(res)
                setStudentList(res.data);
            })
            .catch((err)=>{
                console.log(err)
            })
            }
          });
        
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>성적관리</b></Typography>
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
                            <b>성적관리</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <div className="AttendManage_Body">
                    <div className="AttendManage_Header">
                        <Button className="AttendManage_Header_Button"
                        onClick={modifyExamResult}
                        >
                            성적수정
                        </Button>
                        <Button className="AttendManage_Header_Button"
                        onMouseUp={() => {  submitGrade(); }}>
                        
                            등급확정
                        </Button>
                    </div>
                    <div className="AttendManage_Table">
                        <Table bordered hover>
                            <thead >
                                <tr >
                                    {/* <th className="AttendManage_Table_thead">
                                        학생\주차
                                    </th> */}
                                    <th>이름</th>
                                    <th>학번</th>
                                    <th>출석</th>
                                    <th>중간고사</th>
                                    <th>기말고사</th>
                                    <th>과제</th>
                                    <th>총점수</th>
                                    <th>등급</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.map((std, index) => {
                                    return (
                                        <tr key={index}>
                                            <td >
                                                {std.stdName}
                                            </td>
                                            <td>
                                                {std.stdNo}
                                            </td>
                                            <td>
                                                {getattendance(std.stdNo) + '/30'}
                                            </td>
                                            <td>
                                                <Input
                                                    className="GradeManage_Table_Input"
                                                    id=""
                                                    name=""
                                                    value={examResultList.find(att => att.stdNo === std.stdNo && att.sect === '중간고사')? examResultList.find(att => att.stdNo === std.stdNo && att.sect === '중간고사').totalScore : 0}
                                                    onChange={(e)=> examResultList.find(att => att.stdNo === std.stdNo && att.sect === '중간고사') ? changevalue(e,std.stdNo,'중간고사') : createResult(e, std.stdNo, '중간고사')}
                                                />
                                                /100
                                            </td>
                                            <td>
                                                <Input
                                                    className="GradeManage_Table_Input"
                                                    id=""
                                                    name=""
                                                    value={examResultList.find(att => att.stdNo === std.stdNo && att.sect === '기말고사')? examResultList.find(att => att.stdNo === std.stdNo && att.sect === '기말고사').totalScore : 0}
                                                    onChange={(e)=>examResultList.find(att => att.stdNo === std.stdNo && att.sect === '기말고사') ? changevalue(e,std.stdNo,'기말고사') : createResult(e, std.stdNo, '기말고사')}
                                                />
                                                /100
                                            </td>
                                            <td>
                                                {getHomeworkScores(std.stdNo)}
                                            </td>
                                            <td>
                                                {calculateScore(std.stdNo)}
                                            </td>
                                            <td>
                                                {std.grade}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            
                        </Table>
                    </div>
                </div>

            </Paper>
        </Grid>
    )
}
export default GradeManage;