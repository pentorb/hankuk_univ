import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import { useNavigate, useParams } from "react-router";
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import homework from '../../assets/220072_homework.pdf';

const HomeworkSubmitList = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);
    const { hwNo, week, lessonCnt } = useParams();
    const [homeworkSubmitList, setHomeworkSubmitList] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {

        // let profNo = JSON.parse(sessionStorage.getItem("prof"));
        submit(1);
    }, [token, lecture])

    const hwOpen = () => {
        setIsOpen(true);
    }

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
        const updatedHomeworkSubmitList = homeworkSubmitList.map((sub, i) => {
            if (sub.hwsNo === hwsNo) {
                return { ...sub, score: e.target.value };
            }
            return sub;
        });
        setHomeworkSubmitList(updatedHomeworkSubmitList);
    }
    
    const submitScore = () => {
        axios.post(`${url}/homeworkSubmitModify`,{homeworkSubmitList:homeworkSubmitList},
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
        .then((res)=>{
            console.log(res)
            Swal.fire({
                title: res.data,
                icon: "success"
              });        
            })
        .catch((err)=>{
            console.log(err)
        })
        
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
                        <Button className="AttendManage_Header_Button" onMouseUp={() => {  submitScore(); }} >
                            점수저장
                        </Button>
                    </div>
                        <Table bordered hover style={{fontSize:'20px', textAlign:'center'}}>
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
                                            <td onClick={hwOpen}>
                                                <span style={{textDecoration:'underline', cursor:'pointer'}}>220072김공돌_과제제출.pdf</span>
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
                        <Modal isOpen={isOpen} toggle={toggle} >
                        <ModalHeader toggle={toggle} isOpen={isOpen} >과제 확인</ModalHeader>
                        <ModalBody>
                            <iframe src={homework} width="100%" height="600"></iframe>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>
                            닫기
                            </Button>
                        </ModalFooter>
                        </Modal>
                </div>

                </Paper>
        </Grid>
    )
}
export default HomeworkSubmitList;