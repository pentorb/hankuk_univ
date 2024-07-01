import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './prof.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import axios from "axios";
import { url } from "../../config/config";
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
const HomeworkWrite = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);

    const { lecNo, week } = useParams();
    const [homework, setHomework] = useState({
        title:'',week:week,startDt:'',endDt:'',content:'',lecNo:lecNo,lessonCnt:0
    });

    const navigate=useNavigate();

    const changeValue = (e) => {
        setHomework({...homework, [e.target.name]:e.target.value})
    }
    const submit = () => {
        console.log(homework);
        axios.post(`${url}/homeworkWrite`,{homework:homework},
        {
            headers: { Authorization: JSON.stringify(token) }
        }
        )
            .then(res=>{
                console.log(res)
                navigate(`/professor/contents`)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    const setSampleValues = () => {
        setHomework({
            ...homework,
            title: '재료거동학 14주차 과제',
            content: 'chapter 8. 연습문제 풀이 후 사진 찍어서 제출하시오.',
            startDt:'2024-06-27',
            endDt:'2024-06-28',
            lessonCnt:'1'
        });
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom>
                <b>과제등록</b>
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
                            <b>{week}주차 과제등록</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                
                <div className="Homework_body">
                    <div className="Homework_Form">
                        <Form>
                            <FormGroup className="col-12">
                                <Label
                                    style={{ marginRight: "23px" }}
                                    className="Homework_Write_Label"
                                    for="title"
                                >
                                    <b>제목</b>
                                </Label>
                                <Input
                                    style={{ width: '789px' }}
                                    className="Homework_Write_Input"
                                    id="title"
                                    name="title"
                                    value={homework.title} 
                                    type="text"
                                    onChange={changeValue}
                                />
                            </FormGroup>
                            <div className="col-12" style={{ display:'flex' }}>
                                <FormGroup className="Homework_FormGrop col-6" style={{ display:'flex', justifyContent:'space-between', padding:'0px 15px  0px 0px' }}>
                                    <Label

                                        className="Homework_Write_Label"
                                        for="week"
                                    >
                                        <b>주차</b>
                                    </Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input
                                        style={{ width: '250px' }}
                                        className="Homework_Write_Input"
                                        id="week"
                                        name="week"
                                        disabled value={week}
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup className="Homework_FormGrop col-6" style={{ display:'flex', justifyContent:'space-between', padding:'0px 15px' }}>
                                    <Label

                                        className="Homework_Write_Label"
                                        for="lessonCnt"
                                    >
                                        <b>차시</b>
                                    </Label>&nbsp;&nbsp;&nbsp;
                                    <Input
                                        style={{ width: '250px' }}
                                        className="Homework_Write_Input"
                                        id="lessonCnt"
                                        name="lessonCnt"
                                        value={homework.lessonCnt}
                                        type="text"
                                        onChange={changeValue}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12" style={{ display:'flex' }}>
                                <FormGroup className="Homework_FormGrop col-6" style={{ display:'flex', justifyContent:'space-between', padding:'0px 15px  0px 0px' }}>
                                    <Label className="Homework_Write_Label" for="startDt" >
                                        <b>시작</b>
                                    </Label>
                                    <Input
                                        style={{ width: '300px' }}
                                        className="Homework_Write_Input"
                                        id="startDt"
                                        name="startDt"
                                        value={homework.startDt}
                                        type="date"
                                        onChange={changeValue}
                                    />
                                </FormGroup>
                                <FormGroup className="Homework_FormGrop col-6" style={{ display:'flex', justifyContent:'space-between', padding:'0px 15px' }}>
                                    <Label

                                        className="Homework_Write_Label"
                                        for="endDt"
                                    >
                                        <b>마감</b>
                                    </Label>
                                    <Input
                                        style={{ width: '300px' }}
                                        className="Homework_Write_Input"
                                        id="endDt"
                                        name="endDt"
                                        value={homework.endDt}
                                        type="date"
                                        onChange={changeValue}
                                    />
                                </FormGroup>
                            </div>
                            <FormGroup className="Homework_FormGrop ">
                                <Label

                                    className="Homework_Write_Label"
                                    for="content"
                                >
                                    <b>내용</b>
                                </Label>
                                <Input
                                    style={{
                                        width: '860px', height: '200px',
                                        resize: 'none', padding: "30px 30px"
                                    }}
                                    className="Homework_Write_Input"
                                    id="content"
                                    name="content"
                                    value={homework.content}
                                    type="textarea"
                                    onChange={changeValue}
                                />
                            </FormGroup>
                        </Form>
                        <Button
                            className='Button_Homework_Write'
                            onClick={submit}
                        >
                            등록
                        </Button>
                        {/* 새로운 버튼 추가 */}
                        <Button 
                            onClick={setSampleValues}
                            style={{ marginLeft: '10px' }}
                        >
                            데이터입력
                        </Button>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
export default HomeworkWrite;