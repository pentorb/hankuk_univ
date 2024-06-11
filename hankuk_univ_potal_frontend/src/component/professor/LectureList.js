import React, { useEffect, useState } from 'react';
import './prof.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input } from 'reactstrap';
import { Grid, Paper, Typography } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router';
import { url } from '../../config/config';
import axios from 'axios';
import { useAtom } from 'jotai';
import { tokenAtom } from '../../atoms';

const LectureList = ({ direction, ...args }) => {
    const [token, setToken] = useAtom(tokenAtom);
    const [member, setMember] = useState({
        stdNo: '', profNo: '', stfNo: '', dept: '', name: '', position: '', joinDt: '', tel: '', addr: '', detailAddr: '', postCode: '', gender: '', birthday: '', email: '', emailDo: '', status: '', profile: '', finCredit: '', finSem: '', majCd: ''
    })
    const [year, setYear] = useState(2024);
    const [div, setDiv] = useState("");
    const [lectureList, setLectureList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        // let profNo = JSON.parse(sessionStorage.getItem("prof"));
        submit(1);
    }, [token])

    const submit = (page) => {
        axios.get(`${url}/lectureList?profNo=P1001&year=${year}&div=${div}`,
        {
            headers: { Authorization: JSON.stringify(token) }
        }
        )
            .then(res => {
                console.log(res);
                setLectureList([...res.data])
            })
            .catch(err => {
                console.log(err);
            })
    }

    const LectureList = () => {
        let questions = [];
        for (let i = 0; i < lectureList.length; i++) {
            questions.push(
                <div key={i} className='table_tr' onClick={() => navigate(`/professor/lectureModify/${lectureList[i].lecNo}`)}>
                    <div className='table_td td1' style={{ marginLeft: '70px', marginRight: '50px' }}>{lectureList[i].year}</div>
                    <div className='table_td' style={{ marginLeft: '34px', marginRight: '50px' }}>{lectureList[i].semester}</div>
                    <div className='table_td' style={{ marginLeft: '150px', marginRight: '100px' }}>{lectureList[i].subName}</div>
                    <div className='table_td' style={{ marginLeft: '115px', marginRight: '0px' }}>{lectureList[i].status}</div>
                </div>
            );
        }
        return questions;
    }
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>강의계획서</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 마이페이지  <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>강의계획서</b></Typography>
                </Typography>
                <div className='container_body'>

                    <Input
                        style={{ marginLeft: '480px', marginRight: '20px' }}
                        className="Lecture_List_Input"
                        id="year"
                        name="year"
                        type="select"
                        onChange={(e) => setYear(e.target.value)}>
                        <option >2024</option>
                        <option >2023</option>
                    </Input>
                    <Input
                        style={{ marginRight: '10px' }}
                        className="Lecture_List_Input"
                        id="div"
                        name="div"
                        type="select"
                        onChange={(e) => setDiv(e.target.value)}>
                        <option value="">상태</option>
                        <option value="REQ">승인</option>
                        <option value="APP">신청</option>
                        <option value="REJ">반려</option>
                    </Input>
                    <Button
                        className='Button_Lecture'
                        onClick={submit}
                    >
                        조회
                    </Button>
                    <Button
                        className='Button_Lecture'
                        onClick={() => { navigate('/professor/lectureWrite') }}
                    >
                        등록
                    </Button>

                    <div className='table_body'>
                        <div>
                            <div className='thead' style={{ marginLeft: '50px', marginRight: '50px' }}>개설년도</div>
                            <div className='thead' style={{ marginLeft: '20px', marginRight: '90px' }}>학기</div>
                            <div className='thead' style={{ marginLeft: '150px', marginRight: '100px' }}>과목</div>
                            <div className='thead' style={{ marginLeft: '150px', marginRight: '100px' }}>상태</div>
                        </div>
                        {LectureList()}
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
export default LectureList;