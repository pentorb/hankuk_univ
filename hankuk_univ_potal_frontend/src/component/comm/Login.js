import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { url } from '../../config/config';
import { useSetAtom } from 'jotai';
import { tokenAtom, memberAtom } from '../../atoms';
import '../comm/css/Main.css';
import Swal from "sweetalert2";

export default function Login() {
    const [member, setMember] = useState({ username: '', password: '' })
    const setToken = useSetAtom(tokenAtom)
    const setMemberAtom = useSetAtom(memberAtom)
    const navigate = useNavigate();

    const changeValue = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("username", member.username);
        formData.append("password", member.password);
        axios.post(`${url}/login`, formData)
            .then(res => {
                console.log(res);
                setToken(JSON.parse(res.headers.authorization));
                axios.get(`${url}/user`, { headers: { Authorization: res.headers.authorization } })
                    .then(res => {
                        console.log(res.data)
                        setMemberAtom(res.data)
                        navigate("/");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            })
    }


    const searchPW = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '비밀번호를 입력하세요',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="학번">' +
                '<input id="swal-input2" class="swal2-input" placeholder="전화번호">',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: '확인',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                if ('1234' === password) {
                  return Swal.fire({
                    icon: 'success',
                    title: '비밀번호 확인됨'
                  });
                } else {
                  Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
                }
              },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                  icon:'success',
                  title: '정보 수정 완료',
                  text: '입력하신 정보가 성공적으로 변경되었습니다.'
                });
                // submit(e);
              }
          });
          

    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className="main-container">
                <div className="main-image">
                    <div style={{display:'flex', padding:'20px', flexDirection:'column'}}>
                        <span style={{fontSize:'200px', color:'#ffffff75', fontFamily: 'DM Serif Display'}}>ENDLESS</span>
                        <span style={{fontSize:'130px', color:'#ffffff75', fontFamily: 'DM Serif Display', textAlign:'end'}}>CHALLEAGE</span>
                    </div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <span style={{fontSize:'200px', height:'180px', color:'#ffffff75', fontFamily: 'DM Serif Display'}}>HANKUK</span>
                        <span style={{fontSize:'160px', marginTop:'20px', color:'#ffffff75', fontFamily: 'DM Serif Display', textAlign:'end'}}>UNIVERSITY</span>
                    </div> 
                </div>
            </div>

                <Box sx={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor:'white', padding:'100px 60px', borderRadius:'16px' }}>
                    <Typography component="h1" variant="h5">
                        통 합 로 그 인
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="username"
                            label="학번 (교번)"
                            name="username"
                            autoComplete="id"
                            autoFocus
                            onChange={changeValue}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="비밀번호 (Password)"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={changeValue}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, height: 60, borderRadius: 10, backgroundColor: "firstColor.main" }}
                        >
                            <Typography variant="h6" color="white"><b>로그인 (Login)</b></Typography>
                        </Button>
                        <Grid container>
                            <Grid item xs style={{textAlign:'center'}}>
                                {/* <Link onClick={searchId} variant="body2" style={{ textDecoration: "none", color: "black" }}>
                                    ID 찾기
                                </Link>&nbsp;/&nbsp; */}
                                <Link onClick={searchPW} variant="body2" style={{ textDecoration: "none", color: "black" }}>
                                    Password 찾기
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
        </Container>
    );
}