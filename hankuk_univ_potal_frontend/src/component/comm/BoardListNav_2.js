import Nav from 'react-bootstrap/Nav';

function BoardListNav_2() {
    return (
        <div style={{ display: 'flex', width: '1300px', height: '85px', margin: '0 auto' }}>
            <Nav style={{ margin: '20px auto' }} defaultActiveKey="/TotalBoardlist">
                <Nav.Item>
                    <Nav.Link href="/TotalBoardlist/notice" style={{ width: '145px', height: '45px', borderRadius: 0 }} >공지사항</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/TotalBoardlist/news" style={{ width: '145px', height: '45px', borderRadius: 0 }}>News</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/TotalBoardlist/schedule" style={{ width: '145px', height: '45px', borderRadius: 0 }}>교내일정</Nav.Link>
                </Nav.Item>
            </Nav>
        </div >
    );
}

export default BoardListNav_2;