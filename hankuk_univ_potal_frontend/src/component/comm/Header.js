import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { memberAtom, activeTabAtom, tokenAtom } from '../../atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { url } from '../../config/config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    const navigate = useNavigate();
    const setActiveTab = useSetAtom(activeTabAtom);
    const member = useAtomValue(memberAtom);
    // const [token, setToken] = useAtom(tokenAtom);

    const goPotal = () => {
        if (member.id.substring(0, 1) === "P") {
            navigate("/professor");
        } else if (member.id.substring(0, 1) === "S") {
            navigate("/staff");
        } else if (member.id.substring(0, 1) === "2") {
            navigate("/student");
        }
    }

    // useEffect(() => {
    //     // console.log(token);
    //     axios.get(`${url}/user`,
    //         {
    //             headers: { Authorization: JSON.stringify(token) }
    //         }
    //     )
    //         .then(res => {
    //             console.log(res);
    //             if (res.headers.authorization != null) {
    //                 setToken(JSON.parse(res.headers.authorization));
    //             } else {
    //                 setMember({ ...res.data })
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, [])

    return (
        <div style={{ display: 'flex' }}>
            <div className="col-6" style={{ height: '85px', display: 'flex', margin: '0 auto' }}>
                <img src="/images/logo2.png" style={{ width: '50px', height: '50px', margin: '15px 10px 15px 20px' }} />
                <span onClick={() => { setActiveTab(0); navigate("/"); }} style={{ margin: '23px 5px 23px 0', textDecoration: "none", color: "var(--maincolor)", fontSize: "24px", fontFamily: "ChosunLo", cursor: "pointer" }}>한국대학교 </span>
                <span onClick={() => { setActiveTab(0); goPotal(); }} style={{ margin: '23px 0', textDecoration: "none", color: "var(--maincolor)", fontSize: "22px", fontWeight: '600', cursor: "pointer" }}>/ 종합학사포탈</span>

            </div>
            <div className="col-6" style={{ height: '85px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {member ? (
                    <>
                        {member.id.substring(0, 1) === "S" ? (
                            <span style={{ fontSize: '18px', display: 'flex', alignItems: 'center', color: '#092264', margin: '13px 25px' }}>
                                <AccountCircleIcon />&nbsp;&nbsp; {member.dept}
                            </span>
                        ) : (
                            <span style={{ fontSize: '18px', display: 'flex', alignItems: 'center', color: '#092264', margin: '13px 25px' }}>
                                <AccountCircleIcon />&nbsp;&nbsp; {member.name} 님
                            </span>
                        )}
                    </>
                ) : (
                    <>
                    </>
                )}

            </div>
        </div>
    )
}
export default Header;