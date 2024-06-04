import { Link } from "react-router-dom";

const Toc = () => {
    return (
        <div className="btn-group-vertical">
            <Link to="/수강신청" className="toc_bnt">
                <img src="\images\university.png" style={{ width: "50px", height: "50px" }} alt="" />
                <div style={{ paddingTop: "10px" }}>수강신청</div>
            </Link>
            <Link to="/my-potal" className="toc_bnt">
                <img src="\images\student.png" style={{ width: "50px", height: "50px" }} alt="" />
                <div style={{ paddingTop: "10px" }}>마이 포탈</div>
            </Link>
            <Link to="/쪽지" className="toc_bnt">
                <img src="\images\envelope1.png" style={{ width: "50px", height: "auto" }} alt="" /><br />
                쪽 지
            </Link>
            <Link to="/TotalBoardlist" className="toc_bnt">
                <img src="\images\university2.png" style={{ width: "50px", height: "50px" }} alt="" />
                <div style={{ paddingTop: "10px" }}>통합 게시판</div>
            </Link>
        </div>
    )
}

export default Toc;
