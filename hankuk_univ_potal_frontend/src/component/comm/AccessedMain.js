import Toc from "./Toc";
const AccessedMain = () => {
    return (
        <div style={{ width: '1300px', height: '1200px', margin: "0 auto", position: 'relative' }}>
            <div style={{ display: 'flex', position: 'relative', zIndex: 2, marginLeft: '20px' }}> {/* 수정된 부분 */}
                <span style={{ margin: '10px 5px' }}><img src="/images/logo2.png" alt="" style={{ width: '40px' }} /></span>
                <span style={{
                    fontSize: "24px", fontFamily: "ChosunLo", color: 'var(--maincolor)', margin: '13px 3px'
                }}>
                    한국대학교
                </span >
                <span style={{ fontSize: "22px", margin: '13px 3px' }}> / 종합학사포탈</span >
            </div>
            <span style={{ display: 'flex' }}>
                <div>
                    <div style={{ width: '450px', height: '360px', background: '#F5F9FA', margin: '22px 0 0 60px', }}></div>
                </div>
                <div style={{ marginLeft: '80px' }}>
                    <div style={{ fontSize: '32px', fontWeight: "bolder", display: "flex", marginBottom: '10px' }}>시간표</div>
                    <div style={{ width: '540px', height: '330px', backgroundColor: 'var(--maincolor6)', borderRadius: '20px', boxShadow: '-moz-initial' }}></div>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '85px',
                    right: '20px',
                    width: '100px',
                    height: '400px'
                }}>
                    <Toc />
                </div>
            </span>

            <span style={{ display: 'flex' }}>
                <div style={{ width: '450px', height: '450px', borderRadius: '15px 15px 0 0', backgroundColor: "var(--maincolor)", marginTop: "14px", marginLeft: '60px' }}>
                    <div style={{ fontSize: "32px", color: 'white', fontWeight: 'bolder', padding: '30px 0 20px 0', display: "flex", marginLeft: '60px' }}>교내 일정</div>
                    <div style={{ backgroundColor: 'white', width: '350px', height: '300px', margin: '0 50px' }}></div>
                </div>
                <div style={{ margin: '95px 0 0 80px', }}>
                    <div style={{ fontSize: '32px', fontWeight: "bolder", display: "flex", marginBottom: '10px' }}>NOTICE</div>
                    <div style={{ width: '640px', height: '310px', backgroundColor: 'var(--maincolor6)' }}></div>
                </div>
            </span>
            <div>
                <div style={{ margin: '20px 0 0 60px', }}>
                    <div style={{ fontSize: '32px', fontWeight: "bolder", display: "flex", margin: '10px 0 10px 60px' }}>NEWS</div>
                    <span style={{ display: 'flex', margin: '0 80px' }}>
                        <div style={{ width: '500px', height: '150px', backgroundColor: 'var(--maincolor6)', borderRadius: '40px 0 40px 0' }}></div>
                        <div style={{ width: '500px', height: '150px', backgroundColor: 'var(--maincolor6)', marginLeft: '20px', borderRadius: '40px 0 40px 0' }}></div>
                    </span>
                </div>
            </div>
            {/* <div style={{ backgroundColor: 'darkgray', width: '100%', height: '150px', margin: '30px 0 0 0' }}>

                </div> */}


        </div >
    );
}

export default AccessedMain;
