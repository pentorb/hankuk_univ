const Toc = () => {
    return (
        <div className="btn-group-vertical">
            <a href="/수강신청" className="toc_bnt">
                <img src="\images\university.png" style={{ width: "50px", height: "50px" }} alt="" />
                <div style={{ paddingTop: "10px" }}>수강신청</div>
            </a>
            <a href="/마이포탈" className="toc_bnt">
                <img src="\images\student.png" style={{ width: "50px", height: "50px" }} alt="" />
                <div style={{ paddingTop: "10px" }}>마이 포탈</div>
            </a>
            <a href="/쪽지" className="toc_bnt">
                <img src="\images\envelope1.png" style={{ width: "50px", height: "auto" }} alt="" /><br />
                쪽 지
            </a>
            <a href="/통합게시판" className="toc_bnt">
                <img src="\images\university2.png" style={{ width: "50px", height: "50px" }} alt="" />
                <div style={{ paddingTop: "10px" }}>통합 게시판</div>
            </a>
        </div>
    )
}

export default Toc;
