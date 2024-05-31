
const Header = () => {
    return (
        <div style={{ width: '100%', height: '85px', display: 'flex', margin: '0 auto' }}>
            <img src="/images/logo2.png" style={{ width: '50px', height: '50px', margin: '15px 10px 15px 20px' }} />
            <span style={{ fontSize: "24px", fontFamily: "ChosunLo", color: "var(--maincolor)", margin: '23px 5px 23px 0    ' }}>한국대학교 </span>
            <span style={{ fontSize: "22px", fontWeight: '600', color: "var(--maincolor)", margin: '23px 0' }}>/ 종합학사포탈</span>
        </div>
    )
}
export default Header;