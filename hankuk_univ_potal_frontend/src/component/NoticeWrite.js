import axios from 'axios';
import { Input, Button, Col, Form, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { tokenAtom } from '../atoms';
import { useAtomValue } from 'jotai';

const NoticeWrite = ({ onWriteComplete }) => {
    const token = useAtomValue(tokenAtom);
    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr'],
        ['ul', 'ol', 'task'],
        ['table', 'link'],
        ['image'],
        ['code'],
        ['scrollSync'],
    ];

    const [board, setBoard] = useState({ title: '', content: '', writer: 'S241234', isRequired: false });
    const editorRef = useRef();
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault(); // 폼의 기본 동작 방지
    
        // 에디터의 내용을 가져와 상태 업데이트
        if (editorRef.current) {
            const editorInstance = editorRef.current.getInstance();
            const content = editorInstance.getMarkdown();
            setBoard((prevBoard) => ({ ...prevBoard, content }));
        }

        // 상태 업데이트 후 폼 데이터 전송
        const formData = new FormData();
        formData.append("title", board.title);
        formData.append("content", board.content);
        formData.append("writer", board.writer);
        formData.append("isRequired", board.isRequired);
    
        axios.post(`http://localhost:8090/NoticeWrite`, formData, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                console.log(res.data); // 성공 시 서버에서 반환한 데이터 확인
                if (onWriteComplete) onWriteComplete();  // 콜백 호출
                // navigate("/noticeBoard"); // 저장 후 공지사항 목록 페이지로 이동
            })
            .catch(err => {
                console.error('Error submitting data:', err); // 에러 처리
            });
    }
    
    const changeValue = (e) => {
        setBoard({ ...board, [e.target.name]: e.target.value })
    }

    const handleCheckChange = (event) => {
        setBoard({ ...board, isRequired: event.target.checked });
    };

    return (
        <div style={{ margin: '0 auto', width: '80%', padding: '50px' }}>
            <div className="board-title">학사공지 작성</div>
            <Form onSubmit={submit}>
                <FormGroup row style={{ alignItems: 'center' }}>
                    <Col sm={10}>
                        <Input type="text" id="title" name="title" onChange={changeValue} placeholder='제목을 작성해주세요.' />
                    </Col>
                    <Col sm={2}>
                        <Input type="checkbox" name="isRequired" onChange={handleCheckChange} /> &nbsp; 필독 여부
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={12}>
                        <Editor
                            ref={editorRef}
                            height="550px"
                            placeholder="학사공지를 작성해주세요."
                            toolbarItems={toolbarItems}
                            hideModeSwitch={true}
                            previewStyle="vertical"
                        />
                    </Col>
                </FormGroup>
                <div style={{ textAlign: 'center' }}>
                    <Button className="searchBtn" type="submit">게시</Button>&nbsp;&nbsp;
                </div>
            </Form>
        </div>
    )
}

export default NoticeWrite;
