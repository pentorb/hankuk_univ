import { Breadcrumbs, Grid, Link, Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button, Input, Table } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config/config';
import { useAtom, useAtomValue } from 'jotai';
import { lectureAtom, memberAtom, tokenAtom } from '../../atoms';
import { useNavigate } from 'react-router';
const ScoreList = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const navigate = useNavigate();
    const [stdName, setStdName] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        setCurrentYear(currentYear);
        setYear(currentYear);
        submit(currentYear,'');
    }, [token])

    const submit = (year, stdName) => {
        axios.get(`${url}/studentListAndLectureByStdList?profNo=${member.id}&year=${year}&stdName=${stdName}`,
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                console.log(res);
                setStudentList(res.data.studentList);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>성적조회</b></Typography>
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
                            <b>성적조회</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <div style={{ width: '350px' }}>
                    <div>
                        <div
                            className='ScoreList_SearchButton'
                            onClick={() => { submit(year, stdName) }}>
                            <img src='../images/searchIcon.png' style={{ width: '16px', height: '16px' }} alt='' /></div>
                        <Input
                            className="Appeal_Input ScoreList_SearchInput"
                            id="stdName"
                            name="stdName"
                            type="text"
                            placeholder='학생이름'
                            onChange={(e) => setStdName(e.target.value)}
                        >
                        </Input>

                    </div>
                    <Input
                        className="Appeal_Input"
                        id="year"
                        name="year"
                        type="select"
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value={24}>24학번</option>
                        <option value={24}>24학번</option>
                    </Input>
                </div>

                <div className="ScoreList_StudentBody">
                    <table className="ScoreList_Student_Table">
                        <thead className="ScoreList_Student_Thead">
                            <th className='ScoreList_Student_Th'>학번</th>
                            <th>이름</th>
                            <th>이수학점</th>
                            <th>전공학점</th>
                            <th>상세보기</th>
                        </thead>
                        <tbody className="ScoreList_Student_Tbody">
                            {studentList.map((std, i) => (
                                <React.Fragment key={i}>
                                    <tr
                                        className="ScoreList_Student_Tr"
                                        >
                                        <td className="ScoreList_Student_Td ScoreList_Student_Td_First">{std.id}</td>
                                        <td className="ScoreList_Student_Td">{std.name}</td>
                                        <td className="ScoreList_Student_Td">0</td>
                                        <td
                                            className="ScoreList_Student_Td ScoreList_Student_Td_Last"
                                            >
                                                0
                                        </td>
                                        <td className="ScoreList_Student_Td"><Button>보기</Button></td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                

            </Paper>
        </Grid>
    )
}
export default ScoreList;