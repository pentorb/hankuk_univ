import { useState } from "react";
import { Button, Card, CardBody, Collapse, Input, Label } from "reactstrap";
import './prof.css';
import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from "axios";
import { url } from "../../config/config";
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
import Swal from "sweetalert2";

const ExamQuestionForm = (args) => {
    const [token, setToken] = useAtom(tokenAtom);

    const [isOpen, setIsOpen] = useState(false);
    const lecture = useAtomValue(lectureAtom);

    const [questionCnt, setQuesCnt] = useState(0);
    const [questionType, setQuesType] = useState("객관식");

    const [exam, setExam] = useState({
        startDt: '', endDt: '', sect: '중간고사', type: '객관식', qnum: 0, lecNo: lecture.lecNo
    })

    const [question, setQuestion] = useState({ examNo: 0, quesNo: 0, question: '', choice1: '', choice2: '', choice3: '', choice4: '', answer: '' });
    const [questionList, setQuestionList] = useState([]);

    const toggle = (question_cnt) => {
        setIsOpen(!isOpen);
    }

    const changeValue = (e) => {
        setExam({ ...exam, [e.target.name]: e.target.value })
    }

    const changeQstForm = (examCnt) => {
        let qlist = [];
        for (let i = 0; i < examCnt; i++) {
            qlist.push(question);
        }
        setQuestionList([...qlist]);
    }

    const handleInputChange = (index, e) => {
        const updatedList = questionList.map((ques, i) =>
            i === index ? { ...ques, [e.target.name]: e.target.value } : ques
        );
        setQuestionList(updatedList);
    };

    const submit = () => {
        console.log(questionList);
        console.log(exam);
        axios.post(`${url}/examQuestionWrite`, { exam: exam, questionList: questionList },
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                Swal.fire({
                    title: '시험이 출제되었습니다',
                    // text: "That thing is still around?",
                    icon: "success"
                  })        
                
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>시험출제</b></Typography>
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
                        <Link underline="hover" color="#4952A9">
                            <b>시험출제</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                
                <div className="ExamQuestionForm_Body">
                    <Label

                        className=""
                        for="startDt"
                    >
                        시험 시작일&nbsp;
                    </Label>
                    <Input
                        className="ExamQuestionForm_Input"
                        id="startDt"
                        name="startDt"
                        placeholder=""
                        type="date"
                        onChange={changeValue}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Label

                        className=""
                        for="endDt"
                    >
                        &nbsp;마감일&nbsp;
                    </Label>
                    <Input
                        className="ExamQuestionForm_Input"
                        id="endDt"
                        name="endDt"
                        placeholder=""
                        type="date"
                        onChange={changeValue}
                    /><br />
                    <Label for="">
                        문제&nbsp;
                    </Label>
                    <Input
                        className="ExamQuestionForm_Input"
                        id="sect"
                        name="sect"
                        type="select"
                        onChange={changeValue}
                    >
                        <option selected>중간고사</option>
                        <option>기말고사</option>
                    </Input>&nbsp;&nbsp;&nbsp;
                    <Input
                        className="ExamQuestionForm_Input"
                        id="type"
                        name="type"
                        type="select"
                        onChange={(e) => {
                            setQuesType(e.target.value);
                            changeValue(e);
                            changeQstForm(exam.Qnum);
                        }}
                    >
                        <option selected value="객관식">객관식</option>
                        <option value="주관식">주관식</option>
                    </Input>&nbsp;&nbsp;&nbsp;
                    <Input
                        className="ExamQuestionForm_Input"
                        id="qnum"
                        name="qnum"
                        type="text"
                        placeholder="문항수 입력(숫자만)"
                        onChange={(e) => {
                            setQuesCnt(e.target.value);
                            changeValue(e);
                            changeQstForm(e.target.value);
                        }}
                    >
                    </Input>
                    <Button
                        className='ExamQuestionForm_Button'
                        onClick={toggle}
                    >
                        형식만들기
                    </Button>
                    <Collapse
                        isOpen={isOpen} {...args}>
                        <Card className="ExamQuestionForm_Collapse">
                            <CardBody className="ExamQuestionForm_Collapse">
                                {/* {QuestionList()} */}

                                {questionType === '객관식' &&

                                    questionList.map((ques, i) => (
                                        <div key={i} className="ExamQuestionForm_For_Div">
                                            <Label
                                                // className="ExamQuestionForm_For_Label"
                                                for={`question-${i}`}>
                                                {1 + i}번문제
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input"
                                                type="text"
                                                id={`question-${i}`}
                                                name='question'
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e) => {
                                                    ques.quesNo = i + 1;
                                                    handleInputChange(i, e)

                                                }} />
                                            <br />
                                            <Label
                                                for={`question-${i}`}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input"
                                                type="text"
                                                id={`question-${i}`}
                                                name='choice1'
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e) => {
                                                    handleInputChange(i, e);
                                                }} />
                                            <br />
                                            <Label for={`question-${i}`}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input"
                                                type="text"
                                                id={`question-${i}`}
                                                name='choice2'
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e) => {
                                                    handleInputChange(i, e);
                                                }} />
                                            <br />
                                            <Label for={`question-${i}`}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input"
                                                type="text"
                                                id={`question-${i}`}
                                                name='choice3'
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e) => {
                                                    handleInputChange(i, e);
                                                }} />
                                            <br />
                                            <Label for={`question-${i}`}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input"
                                                type="text"
                                                id={`question-${i}`}
                                                name='choice4'
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e) => {
                                                    handleInputChange(i, e);
                                                }} />
                                            <Label for={`question-${i}`}>
                                                &nbsp;&nbsp;정답
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input_Answer"
                                                type="text"
                                                id={`question-${i}`}
                                                name='answer'
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e) => {
                                                    handleInputChange(i, e);
                                                }} />
                                        </div>)

                                    )

                                }
                                {questionType.trim() === '주관식' &&
                                    questionList.map((ques, i) => (
                                        <div key={i} className="ExamQuestionForm_For_Div">
                                            <Label for={`question-${i}`}>
                                                {i + 1}번문제
                                            </Label>
                                            <Input
                                                type="text"
                                                id={`question-${i}`}
                                                name={`question-${i}`}
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e) => {
                                                    ques.quesNo = i + 1;
                                                    handleInputChange(i, e.target.value)

                                                }} />
                                            <Label for={`question-${i}`}>
                                                정답
                                            </Label>
                                            <Input
                                                type="text"
                                                id={`question-${i}`}
                                                name={`question-${i}`}
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e) => {
                                                    ques.answer = e.target.value;
                                                }} />

                                        </div>)
                                    )
                                }

                            </CardBody>
                            <Button
                                className='ExamQuestionForm_Div_Button'
                                onClick={submit}
                            >
                                등록
                            </Button>
                        </Card>
                    </Collapse>
                </div>
            </Paper>
        </Grid>
    )
}
export default ExamQuestionForm;