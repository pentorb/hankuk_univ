import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import { useNavigate, useParams } from "react-router";
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
import { Button, Input, Table } from 'reactstrap';

const HomeworkSubmitList = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);
    const { hwNo, week, lessonCnt } = useParams();
    const [homeworkSubmitList, setHomeworkSubmitList] = useState([]);

    useEffect(() => {

        // let profNo = JSON.parse(sessionStorage.getItem("prof"));
        submit(1);
    }, [token, lecture])

    const submit = () => {
        axios.get(`${url}/homeworkSubmitList?hwNo=${hwNo}`,
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                console.log(res);
                setHomeworkSubmitList([...res.data])
            })
            .catch(err => {
                console.log(err);
            })
    }

    const changevalue = (e, hwsNo) => {
        console.log(hwsNo)
        const updatedHomeworkSubmitList = homeworkSubmitList.filter((std, i) => {
            // if (std.stdNo === stdNo && std.sect===sect) {
            //     return { ...std, totalScore: e.target.value };
            // }
            // return std;
        });
        setHomeworkSubmitList(updatedHomeworkSubmitList);
    }
    
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom>
                <b>과제란</b>
            </Typography>
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
                        <Link color="inherit" underline='none' href="/professor/contents">
                            강의콘텐츠
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>{week}주차 {lessonCnt}차시 과제란</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <div className="AttendManage_Body">
                    <div className="AttendManage_Header">
                        <Button className="AttendManage_Header_Button"
                        // onClick={modifyExamResult}
                        >
                            시험수정
                        </Button>
                        <Button className="AttendManage_Header_Button"
                        // onMouseUp={() => {  submitGrade(); }}
                        >
                        
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
                                    <th>과제첨부파일</th>
                                    <th>제출일자</th>
                                    <th>점수입력</th>
                                </tr>
                            </thead>
                            <tbody>
                                {homeworkSubmitList.map((sub, index) => {
                                    return (
                                        <tr key={index}>
                                            <td >
                                                {sub.stdName}
                                            </td>
                                            <td>
                                                {sub.stdNo}
                                            </td>
                                            <td>
                                                첨부파일
                                            </td>
                                            <td>
                                                {sub.submitDt}
                                            </td>
                                            <td>
                                                <Input
                                                    className="GradeManage_Table_Input"
                                                    id="score"
                                                    name="score"
                                                    value={sub.score}
                                                    onChange={(e)=>changevalue(e,sub.hwsNo)}
                                                />
                                                /100
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
export default HomeworkSubmitList;