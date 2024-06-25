import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Input } from "reactstrap";
import SearchIcon from '@mui/icons-material/Search';
import { url } from '../../config/config';
import { memberAtom, tokenAtom } from "../../atoms";
import { useAtomValue } from "jotai";
import { Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import NoticeWrite from "../NoticeWrite";

const NoticeBoard = () => {
    const [word, setWord] = useState('');
    const [type, setType] = useState('');
    const [pageBtn, setPageBtn] = useState([1, 2, 3, 4, 5]);
    const [nbrdList, setNbrdList] = useState([]);
    const [rbrdList, setRbrdList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const token = useAtomValue(tokenAtom);
    const navigate = useNavigate();
    const member = useAtomValue(memberAtom);
    const [showWrite, setShowWrite] = useState(false); // 추가: 글쓰기 화면 표시 상태

    const handlePageChange = (page) => {
        submit(page); // 페이지 변경 시 데이터 다시 가져오기
    };

    useEffect(() => {
        submit(1);
    }, [token]);

    const submit = (page) => {
        const listUrl = `${url}/NoticeBrdList?page=${page}&type=${type}&word=${word}`;
        axios.get(listUrl, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                setNbrdList([...res.data.nbrdList]);
                setPageInfo({ ...res.data.pageInfo });
                setRbrdList([...res. data.rbrdList]);
                let page = [];
                for (let i = res.data.pageInfo.startPage; i <= res.data.pageInfo.endPage; i++) {
                    page.push(i);
                }
                setPageBtn([...page]);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }

    const handleWriteComplete = () => {
        setShowWrite(false);
        submit(1); // 글 작성 후 첫 페이지로 이동하여 목록을 갱신합니다.
    };


    return (
        <div>
            {!showWrite ? (
                <>
            <div className="searchArea">
                <Input type="select" className="search" style={{ width: '100px' }} name="type" onChange={(e) => setType(e.target.value)}>
                    <option value="">구분</option>
                    <option value="title">제목</option>
                    <option value="writer">작성자</option>
                    <option value="content">내용</option>
                </Input>

                <Input type='text' className="search" name='keyword' onChange={(e) => setWord(e.target.value)} />
                <Button onClick={() => submit(1)} className="searchBtn"><SearchIcon /></Button>
                {member.id === 'S241234' ? (
                    <Button className="searchBtn" style={{ width: '66px' }} onClick={() => setShowWrite(true)}>글쓰기</Button>
                ):(<></>)}
            </div>

            <div className="tableArea">
                <Table bordered hover style={{ textAlign: 'center', tableLayout: 'fixed', width: '100%', marginBottom:'20px' }}>
                    <thead style={{ fontSize: '20px' }}>
                        <tr>
                            <th style={{ width: '10%' }}>No.</th>
                            <th style={{ width: '40%' }}>제목</th>
                            <th style={{ width: '15%' }}>작성자</th>
                            <th style={{ width: '15%' }}>작성일시</th>
                            <th style={{ width: '10%' }}>조회수</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '18px' }}>
                        {rbrdList.map(brd => (
                            <tr key={brd.nbNo}>
                                <td><span style={{ color: 'red', fontWeight: 'bold' }}>필독</span></td>
                                <td style={{ textAlign: 'left' }}>{brd.title}</td>
                                <td>{brd.writer}</td>
                                <td>{brd.writeDt}</td>
                                <td>{brd.viewCount}</td>
                            </tr>
                        ))}
                        {nbrdList.map(brd => (
                            !brd.isRequired && (
                                <tr key={brd.nbNo}>
                                    <td>{brd.nbNo}</td>
                                    <td style={{ textAlign: 'left' }}>{brd.title}</td>
                                    <td>{brd.writer}</td>
                                    <td>{brd.writeDt}</td>
                                    <td>{brd.viewCount}</td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </Table>
                <Stack spacing={2} alignItems="center" sx={{ marginBottom: 4 }}>
                    <Pagination count={pageInfo.allPage} page={pageInfo.curPage} onChange={(e, page) => handlePageChange(page)} />
                </Stack>
            </div>
                </>
            ) : ( <NoticeWrite onWriteComplete={handleWriteComplete} />)}
        </div>
    );
}

export default NoticeBoard;
