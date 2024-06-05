import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ width: '100%', height: '85px', display: 'flex', margin: '0 auto' }}>
            <img src="/images/logo2.png" style={{ width: '50px', height: '50px', margin: '15px 10px 15px 20px' }} />
            <span style={{ margin: '23px 5px 23px 0' }}><Link to="/" style={{textDecoration:"none", color: "var(--maincolor)", fontSize: "24px", fontFamily: "ChosunLo"}}>한국대학교</Link> </span>
            <span style={{ margin: '23px 0' }}>/ <Link to="/my-potal" style={{textDecoration:"none", color: "var(--maincolor)", fontSize: "22px", fontWeight: '600'}}>종합학사포탈</Link></span>
        </div>
    )
}
export default Header;