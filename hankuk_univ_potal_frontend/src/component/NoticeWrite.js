import axios from 'axios';
import { Input, Button, Label, Col, Form, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";


const NoticeWrite = () => {
    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr'],
        ['ul', 'ol', 'task'],
        ['table', 'link'],
        ['image'],
        ['code'],
        ['scrollSync'],
    ];

    const [board, setBoard] = useState({ title: '', content: '', writer: 'S241234' });
    const navigate = useNavigate();

    const submit = (e) => {
        const formData = new FormData();
        formData.append("title", board.title);
        formData.append("content", board.content);
        formData.append("writer", board.writer);
        formData.append("isRequired", board.isRequired);

        axios.post(`http://3.27.240.208:8090/NoticeWrite`, formData)
            .then(res => {
                console.log(res.data);
                navigate("/noticeBoard");
            })
            .catch(err => {
                console.log(err)
            })
    } 

    const changeValue = (e) => {
        setBoard({ ...board, [e.target.name]: e.target.value })
    }

    const handleCheckChange = (event) => {
        setBoard({ ...board, isRequired: event.target.checked });
    };


    return (
        <div style={{ margin : '0 auto', width:'80%', padding:'50px'}}>
            <div className="board-title">학사공지 작성</div>
            <Form>
                <FormGroup row style={{alignItems:'center'}}>
                    <Col sm={10}>
                        <Input type="text" id="title" name="title" onChange={changeValue} placeholder='제목을 작성해주세요.' />
                    </Col>
                    <Col sm={2}>
                        <Input type="checkbox" name="isRequired" onChange={handleCheckChange} /> &nbsp; 필독 여부
                    </Col>
                </FormGroup>
                <FormGroup row >
                    <Col sm={12}>
                        <Editor
                            height="550px"
                            placeholder="학사공지를 작성해주세요."
                            toolbarItems={toolbarItems}
                            hideModeSwitch={true}
                            previewStyle="vertical"
                            
                        />
                    </Col>
                </FormGroup>
                <div style={{ textAlign: 'center' }}>
                    <Button className="searchBtn" onClick={submit} >게시</Button>&nbsp;&nbsp;
                </div>
            </Form>
        </div>
    )
}

export default NoticeWrite;