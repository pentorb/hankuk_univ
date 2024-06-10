import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { tokenAtom } from '../../atoms';
import { useAtom } from 'jotai';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { url } from '../../config/config';

const Header = () => {
    // const [member, setMember] = useState({name:''});
    // const [token, setToken] = useAtom(tokenAtom);

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
        <div style={{display:'flex'}}>
            <div className="col-6" style={{height: '85px', display: 'flex', margin: '0 auto' }}>
                <img src="/images/logo2.png" style={{ width: '50px', height: '50px', margin: '15px 10px 15px 20px' }} />
                <span style={{ margin: '23px 5px 23px 0' }}><Link to="/" style={{ textDecoration: "none", color: "var(--maincolor)", fontSize: "24px", fontFamily: "ChosunLo" }}>한국대학교</Link> </span>
                <span style={{ margin: '23px 0' }}>/ <Link to="/student" style={{ textDecoration: "none", color: "var(--maincolor)", fontSize: "22px", fontWeight: '600' }}>종합학사포탈</Link></span>
                
            </div>
                <div className="col-6" style={{ height: '85px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    {/* <span style={{ margin: '23px 20px 23px 0', fontSize: '18px' }}><AccountCircleIcon />&nbsp;&nbsp;<b>{member.name}</b> 님</span> */}
                </div>
        </div>
    )
}
export default Header;