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
import './css/proff.css'

const ScoreList = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const navigate = useNavigate();
    const [stdName, setStdName] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [studentList, setStudentList] = useState([]);
    const [lectureByStdList, setLectureByStdList] = useState([]);
    const [selectedStd, setSelectedStd] = useState('');
    const [courYear, setCourYear] = useState(1);
    const [semester, setSemester] = useState(1);

    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        setCurrentYear(currentYear);
        setYear(currentYear);
        submit(currentYear, '');
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
                setLectureByStdList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const toggleSelectedStd = (stdId) => {
        if (selectedStd === '') {
            setSelectedStd(stdId);
        } else if (selectedStd === stdId) {
            setSelectedStd('');
        } else {
            setSelectedStd(stdId);
        }
    }

    const getFinCredit = (stdNo) => {
        let finCredit = 0;
        const lectures = lectureByStdList[stdNo] || [];
        lectures.filter(lec => lec.grade !== null).forEach((lec) => {
            finCredit += lec.credit;
        });
        return finCredit;
    }

    const getFinMajCredit = (stdNo) => {
        let finMajCredit = 0;
        const lectures = lectureByStdList[stdNo] || [];
        lectures.filter(lec => lec.lecNo.substr(0, 3) !== 'BLS').forEach((lec) => {
            finMajCredit += lec.credit;
        });
        return finMajCredit;
    }

    const getTotalScore = (stdNo) => {
        let totalScore = 0;
        const lectures = lectureByStdList[stdNo] || [];
        lectures.filter(lec => lec.grade !== null).forEach((lec) => {
            switch (lec.grade) {
                case 'A+': totalScore += 4.5; break;
                case 'A': totalScore += 4.0; break;
                case 'B+': totalScore += 3.5; break;
                case 'B': totalScore += 3.0; break;
                case 'C+': totalScore += 2.5; break;
                default: break;
            }
        });
        return (totalScore / lectures.filter(lec => lec.grade !== null).length).toFixed(2);
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
                        <option value={currentYear}>{currentYear % 100}학번</option>
                        <option value={currentYear - 1}>{(currentYear - 1) % 100}학번</option>
                        <option value={currentYear - 2}>{(currentYear - 2) % 100}학번</option>
                        <option value={currentYear - 3}>{(currentYear - 3) % 100}학번</option>
                        <option value={currentYear - 4}>{(currentYear - 4) % 100}학번</option>
                        <option value={currentYear - 5}>{(currentYear - 5) % 100}학번</option>
                        <option value={currentYear - 6}>{(currentYear - 6) % 100}학번</option>
                        <option value={currentYear - 7}>{(currentYear - 7) % 100}학번</option>
                        <option value={currentYear - 8}>{(currentYear - 8) % 100}학번</option>
                        <option value={currentYear - 9}>{(currentYear - 9) % 100}학번</option>
                    </Input>
                </div>
                <div style={{ margin: '0px 130px' }}>
                    <table className='tttt' style={{ textAlign: 'center', fontSize: '20px' }}>
                        <thead>
                            <tr>
                                <th>학번</th>
                                <th>이름</th>
                                <th>이수 학점</th>
                                <th>전공 학점</th>
                                <th>총 학점</th>
                                <th>상세보기</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: 'white' }}>
                            {studentList.map((std, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td>{std.id}</td>
                                        <td>{std.name}</td>
                                        <td>{getFinCredit(std.id)}</td>
                                        <td>{getFinMajCredit(std.id)}</td>
                                        <td>{getTotalScore(std.id)}</td>
                                        <td>
                                            <Button onClick={() => { toggleSelectedStd(std.id); setCourYear(1); setSemester(1); }}>
                                                보기
                                            </Button>
                                        </td>
                                    </tr>
                                    {selectedStd === std.id && (
                                        <tr>
                                            <td colSpan={6}>
                                                <div className='ScoreList_Lecture_Body' style={{ width: '80%', margin: '0 auto' }}>
                                                    <div className='ScoreList_Lecture_Header'>
                                                        <Input
                                                            className="ScoreList_Lecture_Input"
                                                            id="semester"
                                                            name="semester"
                                                            type="select"
                                                            onChange={(e) => { setSemester(e.target.value % 2 === 0 ? 1 : 2); setCourYear(Math.floor(e.target.value / 2) + 1) }}
                                                        >
                                                            <option value={0}>1학년 1학기</option>
                                                            <option value={1}>1학년 2학기</option>
                                                            <option value={2}>2학년 1학기</option>
                                                            <option value={3}>2학년 2학기</option>
                                                            <option value={4}>3학년 1학기</option>
                                                            <option value={5}>3학년 2학기</option>
                                                            <option value={6}>4학년 1학기</option>
                                                            <option value={7}>4학년 2학기</option>
                                                        </Input>
                                                    </div>
                                                    <div>
                                                        <table style={{ width: '100%' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>학기</th>
                                                                    <th>강의명</th>
                                                                    <th>교수명</th>
                                                                    <th>성적</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {lectureByStdList && lectureByStdList[std.id]?.filter(lec => lec.courYear === courYear && lec.semester === semester).map((lec, index) => (
                                                                    <tr key={index}>
                                                                        <td>{lec.courYear}학년 {lec.semester}학기</td>
                                                                        <td>{lec.subName}</td>
                                                                        <td>{lec.profName}</td>
                                                                        <td>{lec.grade}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                        {/* <div className="ScoreList_Lecture_Table">
                                        <div className="ScoreList_Lecture_Thead">
                                            <div style={{ width: '180.83px' }}>학기</div>
                                            <div style={{ width: '258.33px' }}>강의명</div>
                                            <div style={{ width: '129.17px' }}>교수명</div>
                                            <div style={{ width: '77.50px' }}>성적</div>
                                        </div>
                                        <div className="ScoreList_Lecture_Tbody">
                                            {lectureByStdList && lectureByStdList[std.id]?.filter(lec => lec.courYear === courYear && lec.semester === semester).map((lec, index) => (
                                                <div key={index} className="ScoreList_Lecture_Tr">
                                                    <div style={{ width: '180.83px' }} className="ScoreList_Lecture_Td ScoreList_Student_Td_First">{lec.courYear}학년 {lec.semester}학기</div>
                                                    <div style={{ width: '258.33px' }} className="ScoreList_Lecture_Td">{lec.subName}</div>
                                                    <div style={{ width: '129.17px' }} className="ScoreList_Lecture_Td">{lec.profName}</div>
                                                    <div style={{ width: '77.50px' }} className="ScoreList_Lecture_Td ScoreList_Student_Td_Last">{lec.grade}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div> */}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                </div>

                {/* <div className="ScoreList_StudentBody">
                    <div className="ScoreList_Student_Table">
                        <div className="ScoreList_Student_Thead">
                            <div style={{ width: '188.46px' }} className="ScoreList_Student_Th">학번</div>
                            <div style={{ width: '134.62px' }} className="ScoreList_Student_Th">이름</div>
                            <div style={{ width: '107.69px' }} className="ScoreList_Student_Th">이수학점</div>
                            <div style={{ width: '107.69px' }} className="ScoreList_Student_Th">전공학점</div>
                            <div style={{ width: '53.85px' }} className="ScoreList_Student_Th">총학점</div>
                            <div style={{ width: '107.69px' }} className="ScoreList_Student_Th">상세보기</div>
                        </div>
                        <div className="ScoreList_Student_Tbody">
                            {studentList.map((std, i) => (
                                <React.StrictMode key={i}>
                                    <div className="ScoreList_Student_Tr">
                                        <div style={{ width: '188.46px' }} className="ScoreList_Student_Td ScoreList_Student_Td_First">{std.id}</div>
                                        <div style={{ width: '134.62px' }} className="ScoreList_Student_Td">{std.name}</div>
                                        <div style={{ width: '107.69px' }} className="ScoreList_Student_Td">{getFinCredit(std.id)}</div>
                                        <div style={{ width: '107.69px' }} className="ScoreList_Student_Td ScoreList_Student_Td_Last">{getFinMajCredit(std.id)}</div>
                                        <div style={{ width: '53.85px' }} className="ScoreList_Student_Td ScoreList_Student_Td_Last">{getTotalScore(std.id)}</div>
                                        <div style={{ width: '107.69px', padding: '15px 0' }} className="ScoreList_Student_Td ScoreList_Student_Td_Last">
                                            <Button onClick={() => {toggleSelectedStd(std.id); setCourYear(1); setSemester(1);}}>보기</Button>
                                        </div>
                                    </div>
                                    {selectedStd === '' ? (<></>) : std.id === selectedStd ? (

                                        <div className='ScoreList_Lecture_Body'>
                                            <div className='ScoreList_Lecture_Header'>
                                                <Input
                                                    className="ScoreList_Lecture_Input"
                                                    id="semester"
                                                    name="semester"
                                                    type="select"
                                                    onChange={(e) => {setSemester(e.target.value%2===0 ? 1 : 2); setCourYear(Math.floor(e.target.value/2)+1)}}
                                                >
                                                    <option value={0}>1학년 1학기</option>
                                                    <option value={1}>1학년 2학기</option>
                                                    <option value={2}>2학년 1학기</option>
                                                    <option value={3}>2학년 2학기</option>
                                                    <option value={4}>3학년 1학기</option>
                                                    <option value={5}>3학년 2학기</option>
                                                    <option value={6}>4학년 1학기</option>
                                                    <option value={7}>4학년 2학기</option>
                                                </Input>
                                            </div>
                                            <div>
                                                <div className="ScoreList_Lecture_Table">
                                                    <div className="ScoreList_Lecture_Thead">
                                                        <div style={{ width: '180.83px' }}>학기</div>
                                                        <div style={{ width: '258.33px' }}>강의명</div>
                                                        <div style={{ width: '129.17px' }}>교수명</div>
                                                        <div style={{ width: '77.50px' }}>성적</div>
                                                    </div>
                                                    <div className="ScoreList_Lecture_Tbody">
                                                        {lectureByStdList && lectureByStdList[std.id]?.filter(lec=>lec.courYear===courYear && lec.semester===semester).map((lec, index) => (
                                                            <div key={index} className="ScoreList_Lecture_Tr">
                                                                <div style={{ width: '180.83px' }} className="ScoreList_Lecture_Td ScoreList_Student_Td_First">{lec.courYear}학년 {lec.semester}학기</div>
                                                                <div style={{ width: '258.33px' }} className="ScoreList_Lecture_Td">{lec.subName}</div>
                                                                <div style={{ width: '129.17px' }} className="ScoreList_Lecture_Td">{lec.profName}</div>
                                                                <div style={{ width: '77.50px' }} className="ScoreList_Lecture_Td ScoreList_Student_Td_Last">{lec.grade}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (<></>)}
                                </React.StrictMode>
                            ))}
                        </div> */}


                {/* </div> */}
                {/* </div> */}


            </Paper>
        </Grid>
    )
}
export default ScoreList;