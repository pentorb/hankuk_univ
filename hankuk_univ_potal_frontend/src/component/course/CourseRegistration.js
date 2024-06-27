import { Typography, Paper, Button, Grid, OutlinedInput } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { tokenAtom, memberAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import { url } from '../../config/config';
import Swal from "sweetalert2";

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const CourseRegistration = () => {
    const token = useAtomValue(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [courseList, setCourseList] = useState([]);
    const [confirmationList, setConfirmationList] = useState([]);
    const [collegeList, setCollegeList] = useState([]);
    const [majorList, setMajorList] = useState([]);
    const [collegeCode, setCollegeCode] = useState();
    const [majorCode, setMajorCode] = useState('');
    const [targetGrade, setTargetGrade] = useState(0);
    const [searchType, setSearchType] = useState();
    const [searchWord, setSearchWord] = useState();
    const [confirmationCount, setConfirmationCount] = useState({countOfLecture:'', maximumOfCredit:'', wholeCredit:''});
    let today = new Date();
    let year = today.getFullYear();


    useEffect(() => {
        loadWholeCourses();
        checkConfirmation();
        loadCollege();
    }, [token])

    const registerForCourseWithAlert = (e) => {
        let randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);
        let answer = randomFourDigitNumber.toString();
        Swal.fire({
            title: '화면의 숫자를 입력해주세요',
            text: `${randomFourDigitNumber}`,
            input: "text",
            showCancelButton: true,
            confirmButtonText: '확인',
            showLoaderOnConfirm: true,
            inputAttributes: {
                maxlength: "4",
                autocapitalize: "off",
                autocorrect: "off"
            }
        }).then((result) => {
            console.log(result)
            if(result.value == answer){
                Swal.fire({
                    icon: 'success',
                    title: '신청되었습니다.'
                });
                registerForCourse(e);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '잘못된 번호입니다.'
                });
            }
        });
    }

    const loadWholeCourses = () => {
        let formData = new FormData();
        formData.append("year", year);
        formData.append("stdNo", member.id);

        const initialCourseRegistrationUrl = `${url}/whole-courses`;
        console.log(initialCourseRegistrationUrl);
        axios.post(initialCourseRegistrationUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setCourseList([...res.data.courseList])
            })
            .catch(err => {
                console.log(err);
            })
    }

    const loadCollege = () => {
        const collegeUrl = `${url}/college`;
        console.log(collegeUrl);
        axios.post(collegeUrl, null, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setCollegeList([...res.data.collegeList])
            })
            .catch(err => {
                console.log(err);
            })
    }

    const loadMajor = () => {
        let formData = new FormData();
        formData.append("colCd", collegeCode);

        const majorUrl = `${url}/major`;
        console.log(majorUrl);
        axios.post(majorUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setMajorList([...res.data.majorList])
            })
            .catch(err => {
                console.log(err);
            })
    }   

    const loadCoursesBySelectedCondition = (event) => {
        setTargetGrade(event.target.value);
        let formData = new FormData();
        formData.append("majCd", majorCode);
        formData.append("targetGrd", event.target.value);

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

    const loadCoursesBySearchCondition = () => {
        let formData = new FormData();
        formData.append("year", year);
        formData.append("stdNo", member.id);
        formData.append("majCd", majorCode);
        formData.append("targetGrd", targetGrade);
        formData.append("searchType", searchType);
        formData.append("searchWord", searchWord);

        const courseSearchUrl = `${url}/course-search`;
        console.log(courseSearchUrl);
        axios.post(courseSearchUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                console.log(res.data)
                setCourseList([...res.data.courseList])             
            })
            .catch(err => {
                console.log(err);
            })
    }

    const checkCourseRegistration = () => {
        let formData = new FormData();
        formData.append("year", year);
        formData.append("stdNo", member.id);
        formData.append("majCd", majorCode);
        formData.append("targetGrd", targetGrade);

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
                setConfirmationCount({...res.data.confirmationCount})
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
                if(targetGrade == 0){
                    loadWholeCourses();
                } else {
                    checkCourseRegistration();
                }                
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
                if(targetGrade == 0){
                    loadWholeCourses();
                } else {
                    checkCourseRegistration();
                }                
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
                <Typography mt={3} mb={6} variant="h4" color="#444444" gutterBottom><b>수강신청</b></Typography>
                <div style={{ display:"flex", marginBottom:20}}>
                    <FormGrid item xs sx={{ display:"block" }}>
                        <Typography sx={{ display: "inline-block" }}><b>단과</b></Typography>
                        &nbsp;&nbsp;                  
                        <Select value={collegeCode || ''} onChange={(e) => setCollegeCode(e.target.value)} sx={{ width:150, height:43 }}>
                            {collegeList.map(college => (
                                <MenuItem key={college.colCd} value={college.colCd}>{college.name}</MenuItem>
                            ))}
                        </Select>
                    </FormGrid>
                    <FormGrid item xs sx={{ display:"block" }}>
                        <Typography sx={{ display: "inline-block" }}><b>학과</b></Typography>
                        &nbsp;&nbsp;
                        <Select value={majorCode || ''} onFocus={()=>loadMajor()} onChange={(e) => setMajorCode(e.target.value)} sx={{ width:150, height:43 }}>
                            {majorList.map(major => (
                                <MenuItem key={major.majCd} value={major.majCd}>{major.name}</MenuItem>
                            ))}
                        </Select>
                    </FormGrid>
                    <FormGrid item xs sx={{ display:"block" }}>
                        <Typography sx={{ display: "inline-block" }}><b>학년</b></Typography>
                        &nbsp;&nbsp;
                        <Select value={targetGrade || ''} onChange={(e) => loadCoursesBySelectedCondition(e)} sx={{ width:150, height:43 }}>
                            <MenuItem value={1}>1학년</MenuItem>
                            <MenuItem value={2}>2학년</MenuItem>
                            <MenuItem value={3}>3학년</MenuItem>
                            <MenuItem value={4}>4학년</MenuItem>
                        </Select>
                    </FormGrid>
                    <FormGrid item xs={5} sx={{ display:"block" }}>
                        <Typography sx={{ display: "inline-block", verticalAlign:"middle" }}><b>구분</b></Typography>
                        &nbsp;&nbsp;                   
                        <Select value={searchType || ''} onChange={(e) => setSearchType(e.target.value)} sx={{ width:120, height:43, verticalAlign:"middle" }}>
                            <MenuItem value="name">강의명</MenuItem>
                            <MenuItem value="type">이수구분</MenuItem>
                            <MenuItem value="code">강의코드</MenuItem>
                            <MenuItem value="professorName">교수명</MenuItem>
                        </Select>
                        &nbsp;&nbsp;
                        <OutlinedInput onChange={(e) => setSearchWord(e.target.value)} sx={{ width:200, height:43, verticalAlign:"middle" }} />
                        &nbsp;&nbsp;
                        <Button variant="contained" size="medium" onClick={loadCoursesBySearchCondition} sx={{ margin: "0 auto", backgroundColor: "firstColor.main", verticalAlign:"middle" }}>검색</Button>
                    </FormGrid>
                </div>
                <TableContainer component={Paper} sx={{ marginTop: 4, marginBottom: 8 }}>
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
                                        {(course.countOfStudent === course.numOfStd || course.unvalidLecture === true)
                                            ? <Button variant="contained"
                                                size="small"                                                
                                                sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3, width:70 }} disabled>신청</Button>
                                            : <Button variant="contained"
                                                size="small"
                                                onClick={()=>registerForCourseWithAlert(course)}
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
                <Typography mt={3} mb={3} variant="h5" color="#444444" gutterBottom><b>수강신청 내역</b></Typography>
                <div>
                    <Typography sx={{ float:"left" }}>신청 과목 수 {confirmationCount.countOfLecture}</Typography>
                    <Typography sx={{ float:"left" }}>&nbsp;&nbsp;/&nbsp;&nbsp;</Typography>
                    <Typography sx={{ float:"left" }}>신청 가능학점 {confirmationCount.maximumOfCredit}</Typography>
                    <Typography sx={{ float:"left" }}>&nbsp;&nbsp;/&nbsp;&nbsp;</Typography>
                    <Typography sx={{ float:"left" }}>신청학점 {confirmationCount.wholeCredit}</Typography>
                </div>
                <TableContainer component={Paper} sx={{ marginTop: 8, marginBottom: 10 }}>
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