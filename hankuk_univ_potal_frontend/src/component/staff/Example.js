import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';


const Example = () => {
    return (
        <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>계정관리</b></Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
            <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
              <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                <Link underline="none" color="inherit" href="/student">
                  <HomeIcon />
                </Link>
                <Link color="inherit" underline='none'>
                  학사 지원
                </Link>
                <Link underline="hover" color="#4952A9">
                  <b>계정 관리</b>
                </Link>
              </Breadcrumbs>
              </div>
              <hr />


              
            </Paper>
        </Grid>
        </Grid>
    )
}

export default Example;