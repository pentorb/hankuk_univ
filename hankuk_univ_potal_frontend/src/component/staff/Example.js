import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AccountManagement from './AccountManagement';

const Example = () => {
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>계정관리</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "100vh", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 마이페이지 <KeyboardDoubleArrowRightIcon /> 성적 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>성적조회</b></Typography>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Example;