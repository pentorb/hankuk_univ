import { Paper } from "@mui/material";
import Toc from "./Toc";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { tokenAtom } from '../../atoms';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { url } from '../../config/config';

const Main = () => {
    const [member, setMember] = useState({
        stdNo: '', profNo: '', stfNo: '', dept: '', name: '', position: '', joinDt: '', tel: '', addr: '', detailAddr: '', postCode: '', gender: '', birthday: '', email: '', emailDo: '', status: '', profile: '', finCredit: '', finSem: '', majCd: ''
    })
    const [token, setToken] = useAtom(tokenAtom);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(token);
        axios.get(`${url}/user`,
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                console.log(res);
                if (res.headers.authorization != null) {
                    setToken(JSON.parse(res.headers.authorization));
                    // navigate("/");
                } else {
                    setMember({ ...res.data })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div style={{ width: '1300px', height: '1200px', margin: "0 auto", position: 'relative' }}>
            <div style={{ width: "1300px", height: "532px", margin: "0 auto", position: 'relative', backgroundImage: 'url(/images/background.jpg)' }}>
                <div style={{ display: 'flex', position: 'relative', zIndex: 2, marginLeft: '20px' }}> {/* 수정된 부분 */}
                    <span style={{ margin: '10px 5px' }}><img src="/images/logo2.png" alt="" style={{ width: '40px' }} /></span>
                    <span style={{
                        fontSize: "24px", fontFamily: "ChosunLo", color: "white", margin: '13px 3px'
                    }}>
                        한국대학교
                    </span >
                    <span style={{ fontSize: "22px", color: "white", margin: '13px 3px' }}> / 종합학사포탈</span >
                </div>
                <div>
                    <div style={{ bottom: 0, left: 0 }}>
                        <div style={{ fontSize: '32px', fontWeight: '900', color: 'white', display: 'flex', marginTop: '240px', marginLeft: '60px' }}>
                            끝없는 도전으로 새로운 길을 개척하는 힘
                        </div>
                    </div>
                    <a href="/로그인" style={{
                        position: 'absolute',
                        borderRadius: '50px',
                        backgroundColor: 'var(--subcolor)',
                        color: 'white',
                        left: '60px',
                        bottom: '100px',
                        width: '450px',
                        height: '70px',
                        textDecorationLine: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <div style={{ fontSize: "25px", fontWeight: '700' }}>로그인(Login)</div>
                    </a>
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    right: '20px',
                    width: '100px',
                    height: '400px'
                }}>
                    <Toc />
                </div>
                <span style={{ display: 'flex' }}>
                    <div style={{ width: '450px', height: '450px', borderRadius: '15px 15px 0 0', backgroundColor: "var(--maincolor)", marginTop: "120px", marginLeft: '60px' }}>
                        <div style={{ fontSize: "32px", color: 'white', fontWeight: 'bolder', padding: '30px 0 20px 0', display: "flex", marginLeft: '60px' }}>교내 일정</div>
                        <div style={{ backgroundColor: 'white', width: '350px', height: '300px', margin: '0 50px' }}></div>
                    </div>
                    <div style={{ margin: '200px 0 0 80px', }}>
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

        </div >
    );
}

export default Main;
