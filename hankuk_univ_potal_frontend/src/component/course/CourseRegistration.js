import { Typography, Paper, Button, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { tokenAtom, memberAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import { url } from '../../config/config';

const CourseRegistration = () => {
    const token = useAtomValue(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [courseList, setCourseList] = useState([]);
    const [confirmationList, setConfirmationList] = useState([]);
    const [semester, setSemester] = useState(1);
    const [year, setYear] = useState(1);
    
    useEffect(() => {        
        checkCourseRegistration();
        checkConfirmation();
    }, [])

    const checkCourseRegistration = () => {
        let formData = new FormData();
        formData.append("majCd", 100);
        formData.append("targetGrd", 2);

        const courseRegistrationUrl = `${url}/course-registration`;
        console.log(courseRegistrationUrl);
        axios.post(courseRegistrationUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setCourseList([...res.data.courseList])
            })
            .catch(err => {
                console.log(err);
            })
    }

    const checkConfirmation = () => {
        let formData = new FormData();
        formData.append("stdNo", member.id);

        const confirmationUrl = `${url}/course-registration-confirmation`;
        console.log(confirmationUrl);
        axios.post(confirmationUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
            })
            .then(res => {
                setConfirmationList([...res.data.confirmationList])
            })
            .catch(err => {
                console.log(err);
            })
    }

    const registerForCourse = (course) => {
        let formData = new FormData();
        formData.append("stdNo", member.id);
        formData.append("lecNo", course.lectureNumber);

        const registrationUrl = `${url}/register-for-course`;
        console.log(registrationUrl);
        axios.post(registrationUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
            })
            .then(res => {
                checkCourseRegistration();
                checkConfirmation();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const removeCourseRegistration = (confirmation) => {
        let formData = new FormData();
        formData.append("lbsNo", confirmation.lbsNumber);

        const confirmationUrl = `${url}/remove-course-registration`;
        console.log(confirmationUrl);
        axios.post(confirmationUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
            })
            .then(res => {
                checkCourseRegistration();
                checkConfirmation();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const preRegister = (course) => {
        let formData = new FormData();
        formData.append("stdNo", member.id);
        formData.append("lecNo", course.lectureNumber);

        const registrationUrl = `${url}/pre-register`;
        console.log(registrationUrl);
        axios.post(registrationUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
            })
            .then(res => {
            })
            .catch(err => {
                console.log(err);
            })        
    }

    return (
        <Grid container>
            <Grid item xs={1}/>
            <Grid item xs={10}>                
                <Typography mt={3} mb={2} variant="h4" color="#444444" gutterBottom><b>수강신청</b></Typography>
                <div>
                    <FormControl sx={{ m: 1, minWidth: 250, float: "left", margin: "0 auto", marginRight: 4 }} size="small">
                        <Select value={year} onChange={(event) => setYear(event.target.value)}>
                            <MenuItem value={1}>1학년</MenuItem>
                            <MenuItem value={2}>2학년</MenuItem>
                            <MenuItem value={3}>3학년</MenuItem>
                            <MenuItem value={4}>4학년</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 250, float: "left", margin: "0 auto", marginRight: 4 }} size="small">
                        <Select value={year} onChange={(event) => setYear(event.target.value)}>
                            <MenuItem value={1}>1학년</MenuItem>
                            <MenuItem value={2}>2학년</MenuItem>
                            <MenuItem value={3}>3학년</MenuItem>
                            <MenuItem value={4}>4학년</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 250, float: "left", margin: "0 auto", marginRight: 4 }} size="small">
                        <Select value={semester} onChange={(event) => setSemester(event.target.value)}>
                            <MenuItem value={1}>1학기</MenuItem>
                            <MenuItem value={2}>2학기</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "firstColor.main" }}>조회</Button>
                </div>
                <TableContainer component={Paper} sx={{ marginTop: 10, marginBottom: 10 }}>
                    <Table aria-label="simple table" sx={{overflowY: "scroll"}}>
                        <TableHead sx={{ backgroundColor: "firstColor.main", color: "white" }}>
                            <TableRow>
                                <TableCell align="center" sx={{ color: "white" }}>이수구분</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>강의명</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>강의코드</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>교수명</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>학점</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>수강인원</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>시간</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>강의실</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>수강신청</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>예비 수강신청</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courseList.length !== 0 && (courseList.map(course => (
                                <TableRow key={course.lectureNumber}>
                                    <TableCell align="center">{course.type}</TableCell>
                                    <TableCell align="center">{course.lectureName}</TableCell>
                                    <TableCell align="center">{course.lectureNumber}</TableCell>
                                    <TableCell align="center">{course.professorName}</TableCell>
                                    <TableCell align="center">{course.credit}</TableCell>
                                    {course.countOfStudent === course.numOfStd
                                        ? <TableCell align="center" sx={{ color:"red"}}>{course.countOfStudent} / {course.numOfStd}</TableCell>
                                        : <TableCell align="center">{course.countOfStudent} / {course.numOfStd}</TableCell>
                                    }
                                    {course.secondTimeOfLecture === null
                                        ? <TableCell align="center">{course.firstTimeOfLecture}</TableCell>
                                        : <TableCell align="center">{course.firstTimeOfLecture}, {course.secondTimeOfLecture}</TableCell>                                    
                                    }                                    
                                    <TableCell align="center">{course.LectureRoom}</TableCell>
                                    <TableCell align="center" sx={{paddingTop:0, paddingBottom:0}}>
                                        {course.countOfStudent === course.numOfStd
                                            ? <Button variant="contained"
                                                size="small"                                                
                                                sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3, width:70 }} disabled>신청</Button>
                                            : <Button variant="contained"
                                                size="small"
                                                onClick={()=>registerForCourse(course)}
                                                sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3, width:70 }}>신청</Button>                                            
                                        }                            
                                    </TableCell>
                                    <TableCell align="center" sx={{paddingTop:0, paddingBottom:0}}>
                                            <Button variant="contained"
                                            size="small"
                                            onClick={()=>preRegister(course)}
                                            sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3, width:70 }}>신청</Button>
                                    </TableCell>
                                </TableRow>
                            )))}
                            {courseList.length === 0 &&
                                <TableRow>
                                    <TableCell align="center" colSpan={10}>개설된 강의가 없습니다</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <Typography mt={3} mb={2} variant="h6" color="#444444" gutterBottom><b>수강신청 내역</b></Typography>
                <TableContainer component={Paper} sx={{ marginTop: 4, marginBottom: 10 }}>
                    <Table aria-label="simple table" sx={{overflowY: "scroll"}}>
                        <TableHead sx={{ backgroundColor: "firstColor.main", color: "white" }}>
                            <TableRow>
                                <TableCell align="center" sx={{ color: "white" }}>이수구분</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>강의명</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>강의코드</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>교수명</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>학점</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>수강인원</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>시간</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>강의실</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>수강신청</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {confirmationList.length !== 0 && (confirmationList.map(confirmation => (
                                <TableRow key={confirmation.lbsNumber}>
                                    <TableCell align="center">{confirmation.type}</TableCell>
                                    <TableCell align="center">{confirmation.lectureName}</TableCell>
                                    <TableCell align="center">{confirmation.lectureNumber}</TableCell>
                                    <TableCell align="center">{confirmation.professorName}</TableCell>
                                    <TableCell align="center">{confirmation.credit}</TableCell>
                                    {confirmation.countOfStudent === confirmation.numOfStd
                                        ? <TableCell align="center" sx={{ color:"red"}}>{confirmation.countOfStudent} / {confirmation.numOfStd}</TableCell>
                                        : <TableCell align="center">{confirmation.countOfStudent} / {confirmation.numOfStd}</TableCell>
                                    }
                                    {confirmation.secondTimeOfLecture === null
                                        ? <TableCell align="center">{confirmation.firstTimeOfLecture}</TableCell>
                                        : <TableCell align="center">{confirmation.firstTimeOfLecture}, {confirmation.secondTimeOfLecture}</TableCell>                                    
                                    }                                    
                                    <TableCell align="center">{confirmation.LectureRoom}</TableCell>
                                    <TableCell align="center" sx={{paddingTop:0, paddingBottom:0}}>
                                            <Button variant="contained"
                                            size="small"
                                            onClick={()=>removeCourseRegistration(confirmation)}
                                            sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3, width:70 }}>취소</Button>
                                    </TableCell>
                                </TableRow>
                            )))}
                            {confirmationList.length === 0 &&
                                <TableRow>
                                    <TableCell align="center" colSpan={9}>수강신청 내역이 없습니다</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    )
}

export default CourseRegistration;