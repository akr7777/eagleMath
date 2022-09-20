import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {getAllTasksThunk, getFavoritesThunk} from "../../features/tasksSlice";
import {getAllCategoriesThunk, IdFiledType} from "../../features/categoriesSlice";
import {FavoriteContent, FavoriteContentOutputType} from "../utils/utils";
import {getAllMaterialsThunk} from "../../features/materialsSlice";
import s1 from '../styles.module.css';
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import IconMaterial from '@mui/icons-material/AutoStories';
import IconTask from '@mui/icons-material/AppRegistration';
import Line from "../../utils/line";

const FavoriteMaterials = () => {

    const dispatch = useAppDispatch();
    const userId = useSelector((state: RootState) => state.auth.user.id);
    useEffect(() => {
        dispatch(getAllTasksThunk());
        dispatch(getAllMaterialsThunk());
        dispatch(getAllCategoriesThunk());
        dispatch(getFavoritesThunk(userId));
    }, [userId]);

    const list:Array<FavoriteContentOutputType> = FavoriteContent();

    const [selectedId, setSelectedId] = useState<IdFiledType>('');


    return <>
        <Accordion className={s1.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'h5'}>Избранные материалы</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {
                        list.map(item => {
                            return <>
                                    <div key={item.contentId}
                                         onClick={() => setSelectedId(item.contentId)}
                                         className={String(item.contentId) === String(selectedId) ? (s1.lineDiv + ' ' + s1.lineDiv_selected) : s1.lineDiv}
                                    >
                                        {/*Левая часть строки*/}
                                        <div className={s1.sdiv_left}>
                                            {item.type === "M" && <IconMaterial/>}
                                            {item.type === "T" && <IconTask/>}

                                            <Typography variant={'overline'}>{item.path}</Typography>

                                            {/*<Typography variant={'subtitle1'}>{item.label}</Typography>*/}

                                            <Line
                                                contentId={item.contentId}
                                                label={item.label}
                                                isMaterial={true}
                                                //favoritesIds={[]}
                                                //addToFavorite={addToFavorite}
                                                //deleteFromFavorite={deleteFromFavorite}
                                            />

                                        </div>

                                        {/*Праввая часть строки
                                        <div className={s1.sdiv_right}>
                                            Porps
                                        </div>*/}
                                    </div>
                            </>
                        })
                    }
                </Typography>
            </AccordionDetails>
        </Accordion>

    </>
}

export default FavoriteMaterials;