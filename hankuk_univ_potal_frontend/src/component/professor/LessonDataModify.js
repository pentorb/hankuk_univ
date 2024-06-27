import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './prof.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import { useNavigate, useParams } from "react-router";
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";

const LessonDataModify = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);
    
    const {ldNo} = useParams();
    // private Integer hwNo;
	// private Date regDt;
	// private Date startDt;
	// private Date endDt;
	// private String title;
	// private String content;
	// private String files;
	// private String lecNo;
	// private Integer lessonNo;
	// private Integer week;
	// private Integer lessonCnt;
    const [lessonData, setLessonData] = useState({
        ldNo:ldNo,title:'',week:0,content:'',lecNo:'',lessonCnt:0
    });
    const navigate=useNavigate();

    useEffect(() => {
        axios.get(`${url}/lessonDataDetail/${ldNo}`,
        {
            headers: { Authorization: JSON.stringify(token) }
        }
        )
            .then(res => {
                console.log(res);
                setLessonData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[token])

    const submit = () => {
        axios.post(`${url}/lessonDataModify`,{lessonData:lessonData},
        {
            headers: { Authorization: JSON.stringify(token) }
        }
        )
            .then(res=>{
                console.log(res)
                navigate(`/professor/contents`);
            })
            .catch(err=>{
                console.log(err)
            })
    }

    const changeValue = (e) => {
        setLessonData({...lessonData, [e.target.name]:e.target.value})
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom>
                <b>과제상세 및 수정</b>
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
                            <b>{lessonData.week}주차 강의자료</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                
                <div className="Homework_body">
                    <div className="Homework_Form">
                        <Form>
                            <FormGroup>
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
                                    placeholder=""
                                    type="text"
                                    value={lessonData.title}
                                    onChange={changeValue}
                                />
                            </FormGroup>
                            <div className="col-12" style={{display:'flex'}}>
                                <FormGroup className="Homework_FormGrop col-6" style={{ display:'flex', justifyContent:'space-between', padding:'0px 15px  0px 0px' }}>
                                    <Label className="Homework_Write_Label" for="week">
                                        <b>주차</b>
                                    </Label>
                                    <Input
                                        style={{ width: '250px' }}
                                        className="Homework_Write_Input"
                                        id="week"
                                        name="week"
                                        placeholder=""
                                        type="text"
                                        disabled value={lessonData.week}
                                    />
                                </FormGroup>
                                <FormGroup className="Homework_FormGrop col-6" style={{ display:'flex', justifyContent:'space-between', padding:'0px 15px' }}>
                                    <Label

                                        className="Homework_Write_Label"
                                        for="lessonCnt"
                                    >
                                        <b>차시</b>
                                    </Label>
                                    <Input
                                        style={{ width: '250px' }}
                                        className="Homework_Write_Input"
                                        id="lessonCnt"
                                        name="lessonCnt"
                                        placeholder=""
                                        type="text"
                                        disabled value={lessonData.lessonCnt}
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
                                    placeholder=""
                                    type="textarea"
                                    value={lessonData.content}
                                    onChange={changeValue}
                                />
                            </FormGroup>
                        </Form>
                        <Button
                            className='Button_Homework_Write'
                            onClick={submit}
                        >
                            수정
                        </Button>
                        <Button
                            className='Button_Homework_Write'
                            onClick={()=>navigate(`/professor/contents`)}
                        >
                            목록
                        </Button>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
export default LessonDataModify;