import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Routes, Route} from 'react-router-dom';
import Header from '../comm/Header';
import CourseRegistrationSidebar from './CourseRegistrationSidebar';
import CourseRegistration from './CourseRegistration';
import PreRegistration from './PreRegistration';

const CourseRegistrationMain = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Header/>
                    </Grid>
                    <Grid item xs={2} sx={{ height: "140vh" }}>
                        <CourseRegistrationSidebar/>
                    </Grid>
                    <Grid item xs={10}>                        
                        <Routes>
                            <Route path="/" element={<CourseRegistration/>}></Route>
                            <Route path="/pre-registration" element={<PreRegistration/>}></Route>
                        </Routes>
                    </Grid>
                   
                </Grid>
            </Box>
        </>
    )
}

export default CourseRegistrationMain;