import { Link, useNavigate } from "react-router-dom";
import { memberAtom } from '../../atoms';
import { useAtomValue } from 'jotai';

const Toc = () => {
    const member = useAtomValue(memberAtom);
    const navigate = useNavigate();

    const goPotal = () => {
        if (member.id.substring(0, 1) === "P") {
            navigate("/professor");
        } else if (member.id.substring(0, 1) === "S") {
            navigate("/staff");
        } else if (member.id.substring(0, 1) === "2") {
            navigate("/student");
        }
    }
    return (
        <div className="btn-group-vertical">
            <Link to="/수강신청" className="toc_bnt">
                <img src="\images\university.png" style={{ width: "50px", height: "50px" }} alt="" />
                <div style={{ paddingTop: "10px" }}>수강신청</div>
            </Link>
            <div onClick={goPotal} className="toc_bnt" style={{cursor:"pointer"}}>
                <img src="\images\student.png" style={{ width: "50px", height: "50px" }} alt="" />
                <div style={{ paddingTop: "10px" }}>마이 포탈</div>
            </div>
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
