import { Typography, Paper, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { lectureNameAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const LectureVideo = () => {
    const lectureName = useAtomValue(lectureNameAtom);
    
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>강의콘텐츠</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            과목
                        </Link>
                        <Link color="inherit" underline='none'>
                            {lectureName}
                        </Link>
                        <Link color="#4952A9" underline='none'>
                            <b>강의콘텐츠</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                {/* ------Your content start------! */}
                <Grid container>
                <Grid xs={12} sx={{ height:100}}/>
                <Grid xs={1}/>
                <Grid xs={10}>                    
                    <iframe title="video" width="100%" height="640" src="https://www.youtube.com/embed/1ttLx9MbrCI?si=u5xPhcpaJbttnjFs" frameborder="0" allowfullscreen></iframe>
                </Grid>
                <Grid xs={1}/>
                <Grid xs={12} sx={{ height:120}}/>
                </Grid>
                {/* ------Your content end------! */}
                <br />
            </Paper>
        </Grid>
    )
}

export default LectureVideo;