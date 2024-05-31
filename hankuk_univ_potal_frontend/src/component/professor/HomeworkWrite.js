import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './prof.css';
const HomeworkWrite = () => {
    return(
        <div className="Homework_body">
            <div className="Homework_Form">
                <Form>
                    <FormGroup>
                        <Label
                            style={{marginRight:"23px"}}
                            className="Homework_Write_Label"
                            for="title"
                        >
                            제목
                        </Label>
                        <Input
                            style={{width:'789px'}}
                            className="Homework_Write_Input"
                            id="title"
                            name="title"
                            placeholder=""
                            type="text"
                        />
                    </FormGroup>
                    <div style={{width:'860px'}}>
                    <FormGroup className="Homework_FormGrop " style={{marginRight:'16px'}}>
                        <Label
                            
                            className="Homework_Write_Label"
                            for="title"
                        >
                            강의명
                        </Label>
                        <Input
                            style={{width:'350px'}}
                            className="Homework_Write_Input"
                            id="title"
                            name="title"
                            placeholder=""
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup className="Homework_FormGrop">
                        <Label
                            
                            className="Homework_Write_Label"
                            for="title"
                        >
                            주차시
                        </Label>
                        <Input
                            style={{width:'350px'}}
                            className="Homework_Write_Input"
                            id="title"
                            name="title"
                            placeholder=""
                            type="text"
                        />
                    </FormGroup>
                    </div>
                    <div style={{width:"860px"}}>
                    <FormGroup className="Homework_FormGrop " style={{marginRight:'13px'}}>
                        <Label
                            
                            className="Homework_Write_Label"
                            for="title"
                        >
                            시작&nbsp;&nbsp;&nbsp;
                        </Label>
                        <Input
                            style={{width:'350px'}}
                            className="Homework_Write_Input"
                            id="title"
                            name="title"
                            placeholder=""
                            type="date"
                        />
                    </FormGroup>
                    <FormGroup className="Homework_FormGrop ">
                        <Label
                            
                            className="Homework_Write_Label"
                            for="title"
                        >
                            마감&nbsp;&nbsp;&nbsp;
                        </Label>
                        <Input
                            style={{width:'350px'}}
                            className="Homework_Write_Input"
                            id="title"
                            name="title"
                            placeholder=""
                            type="date"
                        />
                    </FormGroup>
                    </div>
                    <FormGroup className="Homework_FormGrop ">
                        <Label
                            
                            className="Homework_Write_Label"
                            for="title"
                        >
                            내용
                        </Label>
                        <Input
                            style={{width:'860px', height:'200px',
                             resize:'none', padding:"30px 30px"}}
                            className="Homework_Write_Input"
                            id="title"
                            name="title"
                            placeholder=""
                            type="textarea"
                        />
                    </FormGroup>
                </Form>
                <Button
                    className='Button_Homework_Write'
                >
                    등록
                </Button>
            </div>
        </div>
    )
}
export default HomeworkWrite;