import Grid from '@mui/material/Grid';
import { Paper, Typography, Stack, Pagination } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { Table, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { url } from '../../config/config';
import { useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import axios from 'axios';
import '../staff/css/HuehakByStf.css';
import HueModalByStf from './HueModalByStf';

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

function parseSemester(data) {
    const year = Math.floor(data / 100);
    const semester = data % 100;
    return `${year}년도 ${semester}학기`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2); // 년도에서 마지막 두 자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (0부터 시작하므로 1을 더함)
    const day = date.getDate().toString().padStart(2, '0'); // 일

    return `${year}.${month}.${day}`;
}

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

const StaffHuehak = () => {
    const [allhbs, setAllhbs] = useState([]);
    const token = useAtomValue(tokenAtom);
    const [type, setType] = useState('');
    const [pageInfo, setPageInfo] = useState({
        curPage: 1,
        startPage: 1,
        endPage: 1,
        allPage: 1
    });
    const [pageBtn, setPageBtn] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedHb, setSelectedHb] = useState(null);
    const toggle = () => setModal(!modal);

    const handleChangeType = (e) => {
        const selectedType = e.target.value;
        setType(selectedType); // 선택한 값으로 state 업데이트
    };

    const handleRowClick = (hb) => {
        setSelectedHb(hb);
        setModal(true);
    };

    useEffect(() => {
        if (token.access_token === '') return;
        fetchData(1);
    }, [token, type]);

    const fetchData = (page) => {
        const listUrl = `${url}/allHBList?page=${page}&type=${type}`;
        axios.get(listUrl, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                setAllhbs([...res.data.allhbList]);
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

    const handlePageChange = (page) => {
        fetchData(page); // 페이지 변경 시 데이터 다시 가져오기
    };

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>휴복학 신청 관리</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '800px', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            학생 지원
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>휴복학 신청 관리</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} style={{marginBottom:'30px'}}>
                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>휴학 신청 현황</b></span>
                        </div>
                        <div style={{ padding: '0px 50px 10px', textAlign: 'center', fontSize: 'larger' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Input type="select" className="selBox" id="type" name="type" onChange={handleChangeType}>
                                    <option>구분</option>
                                    <option value="o">일반 휴학</option>
                                    <option value="m">군 휴학</option>
                                    <option value="p">출산, 임신 휴학</option>
                                    <option value="s">창업 휴학</option>
                                    <option value="i">질병 휴학</option>
                                    <option value="k">육아 복학</option>
                                </Input>
                            </div>
                            <Table className="table" bordered hover>
                                <thead>
                                    <tr>
                                        <th>신청 번호</th>
                                        <th>학번</th>
                                        <th>이름</th>
                                        <th>소속</th>
                                        <th>학과</th>
                                        <th>유형</th>
                                        <th>휴학 학기</th>
                                        <th>일자</th>
                                        <th>상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allhbs.filter(hb => hb.sect === 'H' || hb.status === 'REQ').map(hb => (
                                        <tr key={hb.hueNo} onClick={() => handleRowClick(hb)}>
                                            <td scope="row">{hb.hueNo}</td>
                                            <td>{hb.stdNo}</td>
                                            <td>{hb.stdNm}</td>
                                            <td>{hb.colNm}</td>
                                            <td>{hb.majNm}</td>
                                            <td>{typeMap[hb.type] || hb.type}</td>
                                            <td>{parseSemester(hb.hueSem)}</td>
                                            <td>{formatDate(hb.appDt)}</td>
                                            <td style={{ ...getStatusStyle(hb.status), cursor: 'pointer' }}>
                                                    {statusMap[hb.status] || hb.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <Stack spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
                            <Pagination count={pageInfo.allPage} page={pageInfo.curPage} onChange={(e, page) => handlePageChange(page)} />
                        </Stack>
                        {selectedHb && (
                            <HueModalByStf isOpen={modal} toggle={toggle} data={selectedHb} />
                        )}
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default StaffHuehak;