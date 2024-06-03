import { useState } from "react";
import { Button, Card, CardBody, Collapse, Input, Label } from "reactstrap";
import './prof.css';

const ExamQuestionForm = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [questionCnt, setQuesCnt] = useState(0);
    const [questionType, setQuesType] = useState("객관식");

    const toggle = (question_cnt) => {
        setIsOpen(!isOpen);
    }
    const QuestionList = () => {
        let questions = [];
        if (questionType === '객관식') {
            for (let i = 0; i < questionCnt; i++) {
                questions.push(
                    <div key={i} className="ExamQuestionForm_For_Div">
                        <Label
                            // className="ExamQuestionForm_For_Label"
                            for={`question-${i}`}>
                            {i + 1}번문제
                        </Label>
                        <Input
                            className="ExamQuestionForm_For_Input"
                            type="text"
                            id={`question-${i}`}
                            name={`question-${i}`}
                            placeholder={`${i + 1}번 문제를 입력하세요`} />
                        <br />
                        <Label
                            for={`question-${i}`}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.
                        </Label>
                        <Input
                            className="ExamQuestionForm_For_Input"
                            type="text"
                            id={`question-${i}`}
                            name={`question-${i}`}
                            placeholder={`${i + 1}번 문제를 입력하세요`} />
                        <br />
                        <Label for={`question-${i}`}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.
                        </Label>
                        <Input
                            className="ExamQuestionForm_For_Input"
                            type="text"
                            id={`question-${i}`}
                            name={`question-${i}`}
                            placeholder={`${i + 1}번 문제를 입력하세요`} />
                        <br />
                        <Label for={`question-${i}`}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.
                        </Label>
                        <Input
                            className="ExamQuestionForm_For_Input"
                            type="text"
                            id={`question-${i}`}
                            name={`question-${i}`}
                            placeholder={`${i + 1}번 문제를 입력하세요`} />
                        <br />
                        <Label for={`question-${i}`}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.
                        </Label>
                        <Input
                            className="ExamQuestionForm_For_Input"
                            type="text"
                            id={`question-${i}`}
                            name={`question-${i}`}
                            placeholder={`${i + 1}번 문제를 입력하세요`} />
                        <Label for={`question-${i}`}>
                            &nbsp;&nbsp;정답
                        </Label>
                        <Input
                            className="ExamQuestionForm_For_Input_Answer"
                            type="text"
                            id={`question-${i}`}
                            name={`question-${i}`}
                            placeholder={`${i + 1}번 문제를 입력하세요`} />
                    </div>
                );
            }
        } else {
            for (let i = 0; i < questionCnt; i++) {
                questions.push(
                    <div key={i} className="ExamQuestionForm_For_Div">
                        <Label for={`question-${i}`}>
                            {i + 1}번문제
                        </Label>
                        <Input
                            type="text"
                            id={`question-${i}`}
                            name={`question-${i}`}
                            placeholder={`${i + 1}번 문제를 입력하세요`} />
                        <Label for={`question-${i}`}>
                            정답
                        </Label>
                        <Input
                            type="text"
                            id={`question-${i}`}
                            name={`question-${i}`}
                            placeholder={`${i + 1}번 문제를 입력하세요`} />

                    </div>
                );

            }


        }
        questions.push(
            <Button
                className='ExamQuestionForm_Div_Button'
            >
                등록
            </Button>
        )
        return questions;
    }

    return (
        <div className="ExamQuestionForm_Body">
            <Label

                className=""
                for=""
            >
                시험 시작일&nbsp;
            </Label>
            <Input
                className="ExamQuestionForm_Input"
                id=""
                name=""
                placeholder=""
                type="date"
            />
            <Label

                className=""
                for=""
            >
                &nbsp;마감일&nbsp;
            </Label>
            <Input
                className="ExamQuestionForm_Input"
                id=""
                name=""
                placeholder=""
                type="date"
            /><br />
            <Label for="">
                문제&nbsp;
            </Label>
            <Input
                className="ExamQuestionForm_Input"
                id=""
                name=""
                type="select"

            >
                <option selected>중간고사</option>
                <option>기말고사</option>
            </Input>&nbsp;&nbsp;&nbsp;
            <Input
                className="ExamQuestionForm_Input"
                id=""
                name=""
                type="select"
                onChange={(e) => setQuesType(e.target.value)}
            >
                <option>객관식</option>
                <option>주관식</option>
            </Input>&nbsp;&nbsp;&nbsp;
            <Input
                className="ExamQuestionForm_Input"
                id=""
                name=""
                type="text"
                placeholder="문항수 입력(숫자만)"
                onChange={(e) => setQuesCnt(e.target.value)}
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
                        {QuestionList()}
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}
export default ExamQuestionForm;