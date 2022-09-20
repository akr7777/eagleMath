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
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Избранные материалы</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FavoriteMaterials/>
                            </AccordionDetails>
                        </Accordion>
                    </div>


                    {/*<Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Accordion 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disabled>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>Disabled Accordion</Typography>
                        </AccordionSummary>
                    </Accordion>*/}
                </Container>
        }
    </>
}

export default Dashboard;