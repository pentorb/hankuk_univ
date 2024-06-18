import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Paper, Typography, Stack, Pagination, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { Table, Input } from 'reactstrap';
import '../student/css/HueAndBok.css';
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai/react';
import { url } from '../../config/config';
import { memberAtom, tokenAtom } from '../../atoms';
import React, { useEffect, useState } from 'react';
import BokInfo from '../student/BokInfo';
// import BokModalByStd from './BokModalByStd';

const typeMap = {
    p: '출산, 임신 휴학',
    k: '육아 휴학',
    o: '일반 휴학',
    m: '군 휴학',
    s: '창업 휴학',
    i: '질병 휴학'
};

const statusMap = {
    REQ: '신청',
    REJ: '반려',
    APP: '승인'
};

function getStatusStyle(status) {
    switch (status) {
        case 'REQ':
            return { color: 'blue' };
        case 'APP':
            return { color: 'green' };
        case 'REJ':
            return { color: 'red' };
        default:
            return {};
    }
}

function parseSemester(data) {
    const year = Math.floor(data / 100);
    const semester = data % 100;
    return `${year}년도 ${semester}학기`;
}

const BokhakInsert = () => {
    const navigate = useNavigate();
    const [hueInfo, setHueInfo] = useState([]);
    const token = useAtomValue(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [type, setType] = useState('');
    const [selectedHue, setSelectedHue] = useState(null);
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        curPage: 1,
        startPage: 1,
        endPage: 1,
        allPage: 1
    });
    const handlePageChange = (page) => {
        fetchData(page); // 페이지 변경 시 데이터 다시 가져오기
    };

    const trClick = (hb) => {
        setSelectedHue(hb);
        Swal.fire({
            title: `${hb.habNo}번 복학 신청하시겠습니까?`,
            html:'한 번 복학 신청을 하면 철회할 수 없습니다.<br/>신중히 신청하시길 바랍니다.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "확인"
        }).then((result) => {
            const modifyUrl = `${url}/bokModify?stdNo=${member.id}&habNo=${hb.habNo}`; // HaB 테이블에서 데이터 수정 
            if (result.isConfirmed) {
                axios.get(modifyUrl, { headers: { Authorization: JSON.stringify(token) } })
                    .then(res => {
                        navigate('/student/regBokhak')
                        window.location.reload();
                    })
            }
        });

    };

    useEffect(() => {
        console.log(token);
        if (token.access_token === '') return
        fetchData(1);
    }, [token, type]);

    const fetchData = (page) => {
        const listUrl = `${url}/HueBokList?stdNo=${member.id}&page=${page}&type=${type}`; // HaB 테이블에서 데이터 조회 
        console.log(listUrl);
        axios.get(listUrl, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                setHueInfo([...res.data.hueInfo]);
                console.log(res.data.hueInfo);
                setPageInfo({ ...res.data.pageInfo });
                // 페이지 버튼 설정
                let pageButtons = [];
                for (let i = res.data.pageInfo.startPage; i <= res.data.pageInfo.endPage; i++) {
                    pageButtons.push(i);
                }
                setPageBtn([...pageButtons]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // 이수 학기로 학년 구하기 
    const finSem = (finSem) => {
        const grade = Math.floor((finSem - 1) / 2 + 1);
        return `${grade}학년`;
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>복학 신청</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            학적
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>복학 신청</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>복학 시 유의 사항</b></span>
                        </div>
                        <div className='box' style={{ overflowY: 'scroll', height: '300px' }}>
                            <div>
                                <BokInfo />
                            </div>
                        </div>

                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>학적기초정보</b></span>
                        </div>
                        <div style={{ padding: '10px 50px 30px', textAlign: 'center', fontSize: 'larger' }}>
                            <Table className="table" bordered>
                                <thead>
                                    <tr>
                                        <th>학번</th>
                                        <th>이름</th>
                                        <th>학부(과)</th>
                                        <th>학년</th>
                                        <th>학적 상태</th>
                                        <th>학생 연락처</th>
                                        <th>지도교수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">{member.id}</td>
                                        <td>{member.name}</td>
                                        <td>{member.majName}</td>
                                        <td>{finSem(member.finSem)}</td>
                                        <td>{statusMap[member.status] || member.status}</td>
                                        <td>{member.tel}</td>
                                        <td>{member.profName}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>


                        <div className="categori" style={{ justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                                <span style={{ fontSize: 'x-large' }}><b>복학 내역</b></span>
                            </div>
                        </div>
                        <div style={{ padding: '0px 50px 0px', textAlign: 'center', fontSize: 'larger' }}>
                            <Table className="table" bordered hover>
                                <thead>
                                    <tr>
                                        <th>복학 번호</th>
                                        {/* <th>학번</th> */}
                                        <th>복학 신청 학기</th>
                                        <th>복학 유형</th>
                                        {/* <th>상태</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {hueInfo.length === 0 ? (
                                <tr>
                                        <td colSpan="4"> 조회 내역이 없습니다. </td>
                                </tr>
                            ) : (
                                <>
                                    {hueInfo.filter(info => info.status === 'B').map(info => (
                                        <tr key={info.habNo}>
                                            <td scope="row">{info.habNo}</td>
                                            <td>{parseSemester(info.appSem)}</td>
                                            <td>{typeMap[info.type] || info.type}</td>
                                            {/* <td><Button onClick={() => trClick(info)}>복학 신청</Button></td> */}
                                        </tr>
                                    ))}
                                    </>
                            )}
                                </tbody>
                            </Table>
                            {/* <Stack spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
                                <Pagination count={pageInfo.allPage} page={pageInfo.curPage} onChange={(e, page) => handlePageChange(page)} />
                            </Stack> */}
                        </div>

                        <div className="categori" style={{ justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                                <span style={{ fontSize: 'x-large' }}><b>휴학 내역</b></span>
                            </div>
                        </div>
                        <div style={{ padding: '0px 50px 0px', textAlign: 'center', fontSize: 'larger' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Input type="select" className="selBox" id="type" name="type" style={{ marginRight: '0px' }}>
                                    <option>구분</option>
                                    <option value="o">일반 휴학</option>
                                    {member.gender !== 'F' ? (<><option value="m">군 휴학</option></>) : ''}
                                    <option value="p">출산, 임신 휴학</option>
                                    <option value="s">창업 휴학</option>
                                    <option value="i">질병 휴학</option>
                                    <option value="k">육아 복학</option>
                                </Input>
                            </div>
                            <Table className="table" bordered hover>
                                <thead>
                                    <tr>
                                        <th>휴학 번호</th>
                                        {/* <th>학번</th> */}
                                        <th>휴학 신청 학기</th>
                                        <th>휴학 유형</th>
                                        <th>신청</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hueInfo.length === 0 ? (
                                <tr>
                                        <td colSpan="4"> 조회 내역이 없습니다. </td>
                                </tr>
                            ) : (
                                <>
                                    {hueInfo.filter(info => info.status === 'H').map(info => (
                                        <tr key={info.habNo}>
                                            <td scope="row">{info.habNo}</td>
                                            <td>{parseSemester(info.appSem)}</td>
                                            <td>{typeMap[info.type] || info.type}</td>
                                            <td><Button onClick={() => trClick(info)}>복학 신청</Button></td>
                                        </tr>
                                    ))}
                                    </>
                            )}
                                </tbody>
                            </Table>
                            <Stack spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
                                <Pagination count={pageInfo.allPage} page={pageInfo.curPage} onChange={(e, page) => handlePageChange(page)} />
                            </Stack>
                        </div>

                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default BokhakInsert;