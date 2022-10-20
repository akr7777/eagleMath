import React, {useEffect} from 'react';
import s from '../common/commonCSS.module.css';
import Container from "@mui/material/Container";
import Preloader from "../common/Preloader";
import {Typography} from "@mui/material";
import FavoriteMaterials from "./elements/Favorites";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Users from "./elements/users";
import Notes from "./elements/user-info-notes";
import TestResultsDashboard from "./elements/test-results-dashboard";


const Dashboard = () => {
    //const isLoading = useSelector((state: RootState) => state.dashboard.isLoading);
    const userId = useSelector((state: RootState) => state.auth.user.id);
    console.log()

    useEffect(() => {

    }, [])
    const isLoading = false;
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

    return <>
        {/*{!isAuth && <Navigate to={PATHS.login}/>}*/}
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <Typography variant="h4">Панель управления</Typography>

                    <FavoriteMaterials userId={userId}/>

                    <Notes userId={userId}/>

                    <Users/>

                    <TestResultsDashboard/>


                </Container>
        }
    </>
}

export default Dashboard;