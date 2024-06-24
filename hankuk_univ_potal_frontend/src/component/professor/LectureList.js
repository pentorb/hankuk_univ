import React, { useEffect, useState } from 'react';
import './prof.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input } from 'reactstrap';
import { Breadcrumbs, Grid, Link, Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router';
import { url } from '../../config/config';
import axios from 'axios';
import { useAtom, useAtomValue } from 'jotai';
import { memberAtom, tokenAtom } from '../../atoms';

const LectureList = ({ direction, ...args }) => {
    const [token, setToken] = useAtom(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [year, setYear] = useState(new Date().getFullYear());
    const [status, setStatus] = useState("ALL");
    const [lectureList, setLectureList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        setCurrentYear(currentYear);
        setYear(currentYear);
        submit(currentYear, status); // 'status'의 초기값은 'ALL'
    }, [token])

    const submit = (year,status) => {
        axios.get(`${url}/lectureList?profNo=${member.id}&year=${year}&status=${status}`,
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

    const setList = (status) => {
        if (!lectureList || lectureList.length === 0) {
            return (
                <tr>
                    <td colSpan="4">신청된 강의계획서가 없습니다</td>
                </tr>
            );
        }

        if (status === "ALL") {
            return lectureList.map((lec, i) => (
                <React.Fragment key={i}>
                    <tr
                        className="Appeal_Table_Tr"
                        onClick={() => navigate(`/professor/lectureModify/${lec.lecNo}`)}>
                        <td className="Appeal_Table_Td Appeal_Table_Td_First">{lec.year}</td>
                        <td className="Appeal_Table_Td">{lec.semester}</td>
                        <td className="Appeal_Table_Td">{lec.subName}</td>
                        <td
                            className="Appeal_Table_Td Appeal_Table_Td_Last"
                            style={lec.status === 'REQ' ? { color: 'red' } : lec.status === 'APPR' ? { color: 'blueviolet' } : { color: 'black' }}>
                            {lec.status === 'REQ' ? '신규' : lec.status === 'APPR' ? '승인' : '반려'}
                        </td>
                    </tr>
                    <tr className="Appeal_Table_spacer"><td colSpan="4"></td></tr>
                </React.Fragment>
            ));
        } else {
            return lectureList.filter(lecture=>lecture.status===status).map((lec, i) => (
                <React.Fragment key={i}>
                    <tr
                        className="Appeal_Table_Tr"
                        onClick={() => navigate(`/professor/lectureModify/${lec.lecNo}`)}>
                        <td className="Appeal_Table_Td Appeal_Table_Td_First">{lec.year}</td>
                        <td className="Appeal_Table_Td">{lec.semester}</td>
                        <td className="Appeal_Table_Td">{lec.subName}</td>
                        <td
                            className="Appeal_Table_Td Appeal_Table_Td_Last"
                            style={lec.status === 'REQ' ? { color: 'red' } : lec.status === 'APPR' ? { color: 'blueviolet' } : { color: 'black' }}>
                            {lec.status === 'REQ' ? '신규' : lec.status === 'APPR' ? '승인' : '반려'}
                        </td>
                    </tr>
                    <tr className="Appeal_Table_spacer"><td colSpan="4"></td></tr>
                </React.Fragment>
            ));
        }

    };

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>강의계획서</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/professor/">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            마이페이지
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>강의계획서</b>
                        </Link>
                    </Breadcrumbs>
                </div>


                <div style={{ width: '1170px' }}>
                    <Button
                        className='Button_Lecture'
                        onClick={() => { navigate('/professor/lectureWrite') }}
                    >
                        등록
                    </Button>
                    <Button
                        className='Button_Lecture'
                        onClick={()=>submit(year,status)}
                    >
                        조회
                    </Button>
                    <Input
                        className="Appeal_Input"
                        id="year"
                        name="year"
                        type="select"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value={currentYear}>{currentYear}</option>
                        <option value={currentYear - 1}>{currentYear - 1}</option>
                        <option value={currentYear - 2}>{currentYear - 2}</option>
                        <option value={currentYear - 3}>{currentYear - 3}</option>
                        <option value={currentYear - 4}>{currentYear - 4}</option>
                        <option value={currentYear - 5}>{currentYear - 5}</option>
                        <option value={currentYear - 6}>{currentYear - 6}</option>
                        <option value={currentYear - 7}>{currentYear - 7}</option>
                        <option value={currentYear - 8}>{currentYear - 8}</option>
                        <option value={currentYear - 9}>{currentYear - 9}</option>
                    </Input>
                    <Input
                        className="Appeal_Input"
                        id="status"
                        name="status"
                        type="select"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="ALL">상태</option>
                        <option value="APPR">승인</option>
                        <option value="REQ">신청</option>
                        <option value="REJ">반려</option>
                    </Input>


                </div>

                <div className='Appeal_body'>
                    <table className="Appeal_Table">
                        <thead className="Appeal_Table_Thead">
                            <th>개설년도</th>
                            <th>학기</th>
                            <th>과목</th>
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
export default LectureList;