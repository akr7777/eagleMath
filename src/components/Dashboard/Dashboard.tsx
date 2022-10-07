import React, {useEffect} from 'react';
import s from '../common/commonCSS.module.css';
import Container from "@mui/material/Container";
import Preloader from "../common/Preloader";
import {Typography} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteMaterials from "./elements/Favorites";
import {Navigate} from "react-router-dom";
import {PATHS} from "../AppBar/AppBar";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {FavoriteContent} from "./utils/utils";
import s1 from './styles.module.css';
import Users from "./elements/users";
import Notes from "./elements/user-info-notes";


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


                </Container>
        }
    </>
}

export default Dashboard;