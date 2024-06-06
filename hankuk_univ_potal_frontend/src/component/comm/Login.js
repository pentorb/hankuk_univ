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
import {useSetAtom} from 'jotai';
import { tokenAtom } from '../../atoms';

export default function Login() {
    const [member, setMember] = useState({username:'', password:''})
    const setToken = useSetAtom(tokenAtom)
    const navigate = useNavigate();

    const changeValue = (e) => {
        setMember({...member, [e.target.name]:e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("username", member.username);
        formData.append("password", member.password);
        axios.post(`${url}/login`, formData)
            .then(res=> {
                console.log(res);
                setToken(JSON.parse(res.headers.authorization));
                navigate("/");
            })
            .catch(err=> {
                console.log(err);
            })
    }

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                            sx={{ mt: 3, mb: 2, height:60, borderRadius:10, backgroundColor:"firstColor.main" }}
                        >
                            <Typography variant="h6" color="white"><b>로그인 (Login)</b></Typography>
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" style={{textDecoration:"none", color:"black"}}>
                                    ID 찾기
                                </Link>&nbsp;/&nbsp;
                                <Link href="#" variant="body2" style={{textDecoration:"none", color:"black"}}>
                                    Password 찾기
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    );
}