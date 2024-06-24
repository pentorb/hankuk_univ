import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './prof.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import { useAtom } from "jotai";
import { tokenAtom } from "../../atoms";

const LectureModify = () => {
    const [token, setToken] = useAtom(tokenAtom);

    const { lecNo } = useParams();
    const [lecture, setLecture] = useState({});
    const [time2Check, setTime2Check] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${url}/lectureDetail/${lecNo}`,
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                console.log(res);
                setLecture(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    }, [token])

    const submit = () => {
        const formData = new FormData();
        formData.append("lecNo", lecture.lecNo);
        formData.append("semester", lecture.semester);
        formData.append("credit", lecture.credit);
        formData.append("sect", lecture.sect);
        formData.append("time1", lecture.time1);
        formData.append("time2", lecture.time2);
        formData.append("email", lecture.email);
        formData.append("tel", lecture.tel);
        axios.post(`${url}/lectureModify`, formData)
            .then(res => {
                console.log(res)
                navigate('/professor/lectureList');
            })
            .catch(err => {
                console.log(err)
            })
    }

    const changeValue = (e) => {
        setLecture({ ...lecture, [e.target.name]: e.target.value })

    }


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
                        <Link color="inherit" underline='none' href="/professor/lectureList">
                            강의계획
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>계획서 상세 및 수정</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <div className="Lecture_Write_body">
                    <div style={{ marginLeft: "850px" }}>
                        <Button
                            onClick={() => navigate('/professor/lectureList')}
                            className='Button_Lecture_Write'
                        >
                            목록
                        </Button>
                        <Button
                            className='Button_Lecture_Write'
                            onClick={submit}
                        >
                            수정
                        </Button>
                    </div>
                    <div className="Lecture_Write_Container">
                        <div>
                            <div className="Lecture_Write_header">강의정보</div>
                            <Form>
                                <div style={{ width: "100%" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="year">
                                            개설년도
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="year"
                                            name="year"
                                            type="text"
                                            disabled value={lecture.year}
                                        />
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="semester">
                                            개설학기
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="semester"
                                            name="semester"
                                            type="select"
                                            onChange={changeValue}
                                            value={lecture.semester}
                                        >
                                            <option>
                                                학기선택
                                            </option>
                                            <option value={1}>
                                                1학기
                                            </option>
                                            <option value={2}>
                                                2학기
                                            </option>
                                        </Input>
                                    </FormGroup>


                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            style={{ marginRight: '5px', marginLeft: '-7px' }}
                                            className="Lecture_Write_Label"
                                            for="lecRoom">
                                            건물/강의실
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="lecRoom"
                                            name="lecRoom"
                                            type="text"
                                            value={lecture.lecRoom}
                                        >
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div style={{ width: "100%", paddingLeft: "16px" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="subName">
                                            과목명
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="subCd"
                                            name="subCd"
                                            type="text"
                                            disabled value={lecture.subName}
                                        >
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            style={{ paddingLeft: "35px" }}
                                            className="Lecture_Write_Label"
                                            for="credit">
                                            학점
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="credit"
                                            name="credit"
                                            type="text"
                                            onChange={changeValue}
                                            value={lecture.credit}
                                        />
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="sect">
                                            온오프라인
                                        </Label>
                                        <Input
                                            style={{ width: "228px", marginLeft: '-14.5px' }}
                                            className="Lecture_Write_Input"
                                            id="sect"
                                            name="sect"
                                            type="select"
                                            onChange={changeValue}
                                            value={lecture.sect}
                                        >
                                            <option value=''>
                                                온/오프라인선택
                                            </option>
                                            <option value='On'>
                                                온라인
                                            </option>
                                            <option value='Off'>
                                                오프라인
                                            </option>
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            style={{ marginRight: '20.5px', marginLeft: '17px' }}
                                            className="Lecture_Write_Label"
                                            for="numOfStd">
                                        수강인원
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="numOfStd"
                                            name="numOfStd"
                                            type="text"
                                            value={lecture.numOfStd}
                                            onChange={changeValue}
                                        >
                                        </Input>
                                    </FormGroup>
                                </div><br /><br />
                                <div style={{ width: "100%" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left" style={{ marginLeft: '402px' }}>
                                        <Label
                                            style={{ fontSize: "larger", marginLeft: "-12px", marginRight: "18px" }}
                                            // className="Lecture_Write_Label"
                                            for="day1">
                                            1차시 요일 / 시간
                                        </Label>
                                        <Input
                                            style={{ width: '90px', marginRight: '-40px' }}
                                            className="Lecture_Write_Input"
                                            id="day1"
                                            name="day1"
                                            type="select"
                                            onChange={changeValue}
                                            value={lecture.time1}
                                        >
                                            <option value=''>
                                                요일
                                            </option>
                                            <option value='월'>
                                                월
                                            </option>
                                            <option value='화'>
                                                화
                                            </option>
                                            <option value='수'>
                                                수
                                            </option>
                                            <option value='목'>
                                                목
                                            </option>
                                            <option value='금'>
                                                금
                                            </option>
                                            </Input>
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            // style={{marginLeft:'50px'}}
                                            className="Lecture_Write_Label"
                                            for="start1">

                                        </Label>
                                        <Input
                                            style={{ width: '190px' }}
                                            className="Lecture_Write_Input"
                                            id="start1"
                                            name="start1"
                                            type="select"
                                            onChange={changeValue}
                                            value={lecture.time1}
                                        >
                                            <option value=''>시간시간</option>
                                            <option value='1'>1교시(09:00~09:50)</option>
                                            <option value='2'>2교시(10:00~10:50)</option>
                                            <option value='3'>3교시(11:00~11:50)</option>
                                            <option value='4'>4교시(12:00~12:50)</option>
                                            <option value='5'>5교시(13:00~13:50)</option>
                                            <option value='6'>6교시(14:00~14:50)</option>
                                            <option value='7'>7교시(15:00~15:50)</option>
                                            <option value='8'>8교시(16:00~16:50)</option>
                                            <option value='9'>9교시(17:00~17:50)</option>
                                            <option value='10'>10교시(18:00~18:50)</option>
                                        </Input>
                                        &nbsp;&nbsp;~&nbsp;&nbsp;
                                        <Input
                                            style={{ width: '190px' }}
                                            className="Lecture_Write_Input"
                                            id="end1"
                                            name="end1"
                                            type="select"
                                            onChange={changeValue}
                                            value={lecture.time1}
                                        >
                                            <option value=''>종료시간</option>
                                            <option value='1'>1교시(09:00~09:50)</option>
                                            <option value='2'>2교시(10:00~10:50)</option>
                                            <option value='3'>3교시(11:00~11:50)</option>
                                            <option value='4'>4교시(12:00~12:50)</option>
                                            <option value='5'>5교시(13:00~13:50)</option>
                                            <option value='6'>6교시(14:00~14:50)</option>
                                            <option value='7'>7교시(15:00~15:50)</option>
                                            <option value='8'>8교시(16:00~16:50)</option>
                                            <option value='9'>9교시(17:00~17:50)</option>
                                            <option value='10'>10교시(18:00~18:50)</option>
                                        </Input>
                                    </FormGroup>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left" style={{ marginLeft: '355px' }}>
                                        <Input
                                            style={{ margin: '19px 30px 0 0px' }}
                                            type="checkbox" onChange={() => time2Check ? setTime2Check(false) : setTime2Check(true)} />
                                        <Label
                                            style={{ fontSize: "larger", marginLeft: "-14px", marginRight: "18px", color: time2Check ? 'black' : 'grey' }}
                                            // className="Lecture_Write_Label"
                                            for="day2">
                                            2차시 요일 / 시간
                                        </Label>
                                        <Input
                                            style={{ width: '90px', marginRight: '-40px', color: time2Check ? 'black' : 'grey' }}
                                            className="Lecture_Write_Input"
                                            id="day2"
                                            name="day2"
                                            type="select"
                                            disabled={!time2Check}
                                            onChange={changeValue}
                                            value={time2Check? lecture.time2 : ''}
                                        >
                                            <option value=''>
                                                요일
                                            </option>
                                            <option value='월'>
                                                월
                                            </option>
                                            <option value='화'>
                                                화
                                            </option>
                                            <option value='수'>
                                                수
                                            </option>
                                            <option value='목'>
                                                목
                                            </option>
                                            <option value='금'>
                                                금
                                            </option>
                                            </Input>
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            style={{ color: time2Check ? 'black' : 'grey' }}
                                            className="Lecture_Write_Label"
                                            for="start2">
                                        </Label>
                                        <Input
                                            style={{ width: '190px', color: time2Check ? 'black' : 'grey' }}
                                            disabled={!time2Check}
                                            className="Lecture_Write_Input"
                                            id="start2"
                                            name="start2"
                                            type="select"
                                            value={lecture.time2}
                                            onChange={changeValue}
                                        >
                                            <option value=''>시작시간</option>
                                            <option value='1'>1교시(09:00~09:50)</option>
                                            <option value='2'>2교시(10:00~10:50)</option>
                                            <option value='3'>3교시(11:00~11:50)</option>
                                            <option value='4'>4교시(12:00~12:50)</option>
                                            <option value='5'>5교시(13:00~13:50)</option>
                                            <option value='6'>6교시(14:00~14:50)</option>
                                            <option value='7'>7교시(15:00~15:50)</option>
                                            <option value='8'>8교시(16:00~16:50)</option>
                                            <option value='9'>9교시(17:00~17:50)</option>
                                            <option value='10'>10교시(18:00~18:50)</option>
                                        </Input>
                                        &nbsp;&nbsp;~&nbsp;&nbsp;
                                        <Input
                                            style={{ width: '190px', color: time2Check ? 'black' : 'grey' }}
                                            disabled={!time2Check}
                                            className="Lecture_Write_Input"
                                            id="end2"
                                            name="end2"
                                            type="select"
                                            value={lecture.time2}
                                            onChange={changeValue}
                                        >
                                            <option value=''>종료시간</option>
                                            <option value='1'>1교시(09:00~09:50)</option>
                                            <option value='2'>2교시(10:00~10:50)</option>
                                            <option value='3'>3교시(11:00~11:50)</option>
                                            <option value='4'>4교시(12:00~12:50)</option>
                                            <option value='5'>5교시(13:00~13:50)</option>
                                            <option value='6'>6교시(14:00~14:50)</option>
                                            <option value='7'>7교시(15:00~15:50)</option>
                                            <option value='8'>8교시(16:00~16:50)</option>
                                            <option value='9'>9교시(17:00~17:50)</option>
                                            <option value='10'>10교시(18:00~18:50)</option>
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div className="Lecture_Write_header" style={{ marginTop: "40px" }}>
                                    교수정보</div><br />
                                <div style={{ width: "100%" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="profNo">
                                            교수번호
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="profNo"
                                            name="profNo"
                                            type="text"
                                            disabled value={lecture.profNo}
                                        />
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            style={{ marginLeft: "12px" }}
                                            className="Lecture_Write_Label"
                                            for="profName">
                                            교수명
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="profName"
                                            name="profName"
                                            type="text"
                                            disabled value={lecture.profName}
                                        />
                                    </FormGroup>

                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="email">
                                            이메일
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={changeValue}
                                        />
                                    </FormGroup>
                                </div>

                                <div style={{ width: "959px", height: "50px" }}
                                    className="Lecture_Write_header">강의계획서 첨부</div>

                                <FormGroup style={{ width: "959px", marginLeft: "50px" }}>
                                    <Label

                                        className="Lecture_Write_Label"
                                        for="files">
                                    </Label>
                                    <Input

                                        id="files"
                                        name="files"
                                        type="file"
                                    />
                                </FormGroup>
                            </Form>
                        </div><br />

                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
export default LectureModify;