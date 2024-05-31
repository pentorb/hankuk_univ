import { Col, Button, Table, FormGroup, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BoardList = () => {
    const formStyle = { width: '600px', textAlign: "center", margin: "0 auto" };
    const [pageBtn, setPageBtn] = useState([]);
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [word, setWord] = useState('');
    const [type, setType] = useState('');
    const user = useSelector(state => state.persistedReducer.user);

    // useEffect(() => {
    //     submit(1);
    // }, [])

    // const submit = (page) => {
    //     const url = `http://localhost:8090/boardList?page=${page}&type=${type}&word=${word}`;
    //     console.log(url);
    //     axios.get(url)
    //         .then(res => {
    //             let pageInfo = res.data.pageInfo;
    //             setBoardList([...res.data.boardList])
    //             let page = [];
    //             for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
    //                 page.push(i);
    //             }
    //             setPageBtn([...page]);
    //             setPageInfo({ ...pageInfo });
    //         })
    //         .catch(err => {

    //         })
    // }
    // const deleteBoard = (num) => {
    //     const url = `http://localhost:8090/deleteBoard?num=${num}`;
    //     axios.get(url)
    //         .then(res => {
    //             let modBoardList = boardList.filter(board => board.num !== num);
    //             setBoardList([...modBoardList]);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }
    return (
        <div>
            <div className="header-text">게시글 목록</div>
            <FormGroup row style={formStyle}>
                <Col sm={3}>
                    <Input type='select' name='type' onChange={(e) => setType(e.target.value)}>
                        <option value="">선택하세요</option>
                        <option value="subject">제목</option>
                        <option value="writer">작성자</option>
                        <option value="content">내용</option>
                    </Input>
                </Col>
                <Col sm={5}>
                    <Input type='text' name='word' id='word' onChange={(e) => setWord(e.target.value)} />
                </Col>
                <Col sm={2}>
                    <Button >검색</Button>
                </Col>
                <Col sm={2}>
                    {user.id != '' && <Button tag="a" href="/boardWrite" color='success'>글쓰기</Button>}
                </Col>
            </FormGroup>
        </div >

    )
}
export default BoardList;