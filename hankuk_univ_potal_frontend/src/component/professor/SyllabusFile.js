import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
import syllabusFile from '../../assets/test.pdf';

const SyllabusFile = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);

    return(
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom>
                <b>강의계획서</b>
            </Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/professor/">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none' href="/professor/lectureDashboard">
                            과목
                        </Link>
                        <Link color="inherit" underline='none'>
                            {lecture.subName}
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>강의계획서</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <Grid container>
                <Grid xs={12} sx={{ height:70}}/>
                <Grid xs={1}/>
                <Grid xs={10}>
                    <iframe src={syllabusFile} width="100%" height="900"></iframe>
                </Grid>
                <Grid xs={1}/>
                </Grid>

                </Paper>
        </Grid>
    )
}
export default SyllabusFile;