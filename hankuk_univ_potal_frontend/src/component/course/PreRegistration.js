import { Typography, Paper, Button, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { tokenAtom, memberAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import { url } from '../../config/config';
import Swal from "sweetalert2";

const PreRegistration = () => {
    const token = useAtomValue(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [preRegistrationList, setPreRegistrationList] = useState([]);
    const [confirmationList, setConfirmationList] = useState([]);
    const [confirmationCount, setConfirmationCount] = useState({countOfLecture:'', maximumOfCredit:'', wholeCredit:''});
    
    useEffect(() => {
        checkConfirmation();  
        checkPreRegistration();        
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

    const checkPreRegistration = () => {
        let formData = new FormData();
        formData.append("stdNo", member.id);

        const preRegistrationUrl = `${url}/pre-registration`;
        console.log(preRegistrationUrl);
        axios.post(preRegistrationUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setPreRegistrationList([...res.data.preRegistrationList])
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

    const registerForCourse = (preRegistration) => {
        let formData = new FormData();
        formData.append("stdNo", member.id);
        formData.append("lecNo", preRegistration.lectureNumber);

        const registrationUrl = `${url}/register-for-course`;
        console.log(registrationUrl);
        axios.post(registrationUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
            })
            .then(res => {
                removePreRegistration(preRegistration);             
            })
            .catch(err => {
                console.log(err);
            })
    }

    const removePreRegistration = (preRegistration) => {
        let formData = new FormData();
        formData.append("lbNo", preRegistration.lbNumber);

        const removalUrl = `${url}/remove-pre-registration`;
        console.log(removalUrl);
        axios.post(removalUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
            })
            .then(res => {
                checkConfirmation();
                checkPreRegistration();                
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
                checkConfirmation();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Grid container>
            <Grid item xs={1}/>
            <Grid item xs={10}>                
            <Typography mt={3} mb={2} variant="h4" color="#444444" gutterBottom><b>예비 수강신청</b></Typography>
                <TableContainer component={Paper} sx={{ marginTop: 4, marginBottom: 10 }}>
                    <Table aria-label="simple table" sx={{overflowY: "scroll"}}>
                        <TableHead sx={{ backgroundColor: "firstColor.main", color: "white" }}>
                            <TableRow>
                                <TableCell align="center" sx={{ color: "white" }}>이수구분</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>강의명</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>강의코드</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>교수명</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>학점</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>시간</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>강의실</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>수강신청</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {preRegistrationList.length !== 0 && (preRegistrationList.map(preRegistration => (
                                <TableRow key={preRegistration.lbNumber}>
                                    <TableCell align="center">{preRegistration.type}</TableCell>
                                    <TableCell align="center">{preRegistration.lectureName}</TableCell>
                                    <TableCell align="center">{preRegistration.lectureNumber}</TableCell>
                                    <TableCell align="center">{preRegistration.professorName}</TableCell>
                                    <TableCell align="center">{preRegistration.credit}</TableCell>                                    
                                    {preRegistration.secondTimeOfLecture === null
                                        ? <TableCell align="center">{preRegistration.firstTimeOfLecture}</TableCell>
                                        : <TableCell align="center">{preRegistration.firstTimeOfLecture}, {preRegistration.secondTimeOfLecture}</TableCell>                                    
                                    }                                    
                                    <TableCell align="center">{preRegistration.LectureRoom}</TableCell>
                                    <TableCell align="center" sx={{paddingTop:0, paddingBottom:0}}>
                                        <Button variant="contained"
                                            size="small"
                                            onClick={()=>{registerForCourseWithAlert(preRegistration)}}
                                            sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3, width:70 }}>신청</Button>                                            
                                    </TableCell>
                                    <TableCell align="center" sx={{paddingTop:0, paddingBottom:0}}>
                                            <Button variant="contained"
                                            size="small"
                                            onClick={()=>removePreRegistration(preRegistration)}
                                            sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3, width:70 }}>삭제</Button>
                                    </TableCell>
                                </TableRow>
                            )))}
                            {preRegistrationList.length === 0 &&
                                <TableRow>
                                    <TableCell align="center" colSpan={9}>예비 수강신청 내역이 없습니다</TableCell>
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
                <TableContainer component={Paper} sx={{ marginTop: 8, marginBottom: 8 }}>
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

export default PreRegistration;