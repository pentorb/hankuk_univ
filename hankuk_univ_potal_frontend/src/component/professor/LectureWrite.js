import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './prof.css'
const LectureWrite = () => {
    return (
        <div className="Lecture_Write_body">
            <div style={{ marginLeft: "690px" }}>
                <Button
                    className='Button_Lecture_Write'
                >
                    목록
                </Button>
                <Button
                    className='Button_Lecture_Write'
                >
                    신청
                </Button>
            </div>
            <div>
                <div>
                    <div className="Lecture_Write_header">강의정보</div>
                    <Form>
                        <div style={{width:"970px", height:"87px", margin:"20px 0 20px 0"}}>
                        <FormGroup className="Lecture_Write_FormGroup left">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleEmail">
                                개설년도
                            </Label>
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleEmail"
                                name="email"
                                placeholder="개설년도를 쓰세요"
                                type="email"
                            />
                        </FormGroup>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormGroup className="Lecture_Write_FormGroup right">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleSelect">
                                개설학기
                            </Label>
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    1학기
                                </option>
                                <option>
                                    2학기
                                </option>
                            </Input>
                        </FormGroup>
                        </div>
                        <div style={{width:"970px", height:"87px", margin:"20px 0 20px 0"}}>
                        <FormGroup className="Lecture_Write_FormGroup left">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleSelect">
                                과목명
                            </Label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    공업수학
                                </option>
                                <option>
                                    컴퓨터수학
                                </option>
                                <option>
                                    게이밍이론
                                </option>
                            </Input>
                        </FormGroup>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormGroup className="Lecture_Write_FormGroup right">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleSelect">
                                과목코드
                            </Label>
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    1
                                </option>
                                <option>
                                    2
                                </option>
                                <option>
                                    3
                                </option>
                                <option>
                                    4
                                </option>
                                <option>
                                    5
                                </option>
                            </Input>
                        </FormGroup>
                        </div>
                        <div style={{width:"970px", height:"87px", margin:"20px 0 20px 0"}}>
                        <FormGroup className="Lecture_Write_FormGroup left">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleEmail">
                                학점
                            </Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleEmail"
                                name="email"
                                placeholder=""
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup className="Lecture_Write_FormGroup right">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleSelect">
                                온오프라인
                            </Label>
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    온라인
                                </option>
                                <option>
                                    오프라인
                                </option>
                            </Input>
                        </FormGroup>
                        </div>
                        <div style={{width:"970px", height:"87px",margin:"20px 0 20px 0"}}>
                        <FormGroup className="Lecture_Write_FormGroup left">
                            <Label 
                                style={{fontSize:"24px", marginRight:"4px"}}
                                // className="Lecture_Write_Label"
                                for="exampleEmail">
                                1차시시간
                            </Label>
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleEmail"
                                name="email"
                                placeholder=""
                                type="text"
                            />
                        </FormGroup>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormGroup className="Lecture_Write_FormGroup right">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleEmail">
                                2차시시간
                            </Label>
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleEmail"
                                name="email"
                                placeholder=""
                                type="text"
                            />
                        </FormGroup>
                        </div>
                        <div className="Lecture_Write_header">교수정보</div>
                        <div style={{width:"970px", height:"87px",margin:"20px 0 20px 0"}}>
                        <FormGroup className="Lecture_Write_FormGroup left">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleEmail">
                                교수번호
                            </Label>
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleEmail"
                                name="email"
                                placeholder=""
                                type="text"
                            />
                        </FormGroup>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormGroup className="Lecture_Write_FormGroup right">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleEmail">
                                교수명
                            </Label>
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleEmail"
                                name="email"
                                placeholder=""
                                type="text"
                            />
                        </FormGroup>
                        </div>
                        <div style={{width:"970px", height:"87px",margin:"20px 0 20px 0"}}>
                        <FormGroup className="Lecture_Write_FormGroup left">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleEmail">
                                이메일
                            </Label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleEmail"
                                name="email"
                                placeholder=""
                                type="email"
                            />
                        </FormGroup>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormGroup className="Lecture_Write_FormGroup right">
                            <Label 
                                className="Lecture_Write_Label"
                                for="exampleEmail">
                                휴대전화
                            </Label>
                            <Input
                                className="Lecture_Write_Input"
                                id="exampleEmail"
                                name="email"
                                placeholder=""
                                type="tel"
                            />
                        </FormGroup>
                        </div>
                        <div style={{width:"970px", height:"50px"}} 
                        className="Lecture_Write_header">강의계획서 첨부</div>
                        
                        <FormGroup >
                            <Label 
                                
                                className="Lecture_Write_Label"
                                for="exampleFile">
                            </Label>
                            <Input
                            
                                id="exampleFile"
                                name="file"
                                type="file"
                            />
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default LectureWrite;