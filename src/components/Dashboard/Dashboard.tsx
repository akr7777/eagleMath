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


const Dashboard = () => {
    //const isLoading = useSelector((state: RootState) => state.dashboard.isLoading);
    useEffect(() => {

    }, [])
    const isLoading = false;
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    return <>
        {/*{!isAuth && <Navigate to={PATHS.login}/>}*/}
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <Typography variant="h4">Панель управления</Typography>

                    <div className={s.someDiv1}>
                        <FavoriteMaterials/>
                    </div>

                    {/*<div className={s.someDiv1}>
                        <Plans/>
                    </div>*/}
                </Container>
        }
    </>
}

export default Dashboard;