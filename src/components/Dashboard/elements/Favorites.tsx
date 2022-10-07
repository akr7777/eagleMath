import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import {useAppDispatch} from "../../../store/store";
import {getAllTasksThunk} from "../../features/tasksSlice";
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
import Line from "../../common/line";
import s2 from "./elements.module.css"
import {getFavoritesThunk} from "../../features/dashboardSlice";

type FavoriteMaterialsPropsType = {userId: IdFiledType}
const FavoriteMaterials = (props: FavoriteMaterialsPropsType) => {

    const dispatch = useAppDispatch();
    //const userId = useSelector((state: RootState) => state.auth.user.id);
    useEffect(() => {
        dispatch(getAllTasksThunk());
        dispatch(getAllMaterialsThunk());
        dispatch(getAllCategoriesThunk());
        dispatch(getFavoritesThunk(props.userId));
    }, [props.userId]);

    const list:Array<FavoriteContentOutputType> = FavoriteContent();
    const [selectedId, setSelectedId] = useState<IdFiledType>('');

    return <div className={s2.div1}>
        <Accordion className={s1.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'h5'}>Избранные материалы</Typography>
            </AccordionSummary>
            <AccordionDetails>
                    {
                        list.map(item => {
                            return <div key={item.contentId}
                                         onClick={() => setSelectedId(item.contentId)}
                                         className={String(item.contentId) === String(selectedId) ? (s1.lineDiv + ' ' + s1.lineDiv_selected) : s1.lineDiv}
                                    >
                                        <div className={s1.sdiv_left}>
                                            {item.type === "M" && <IconMaterial/>}
                                            {item.type === "T" && <IconTask/>}
                                            <Typography variant={'overline'}>{item.path}</Typography>
                                            <Line
                                                contentId={item.contentId}
                                                label={item.label}
                                                isMaterial={true}
                                            />

                                        </div>
                                    </div>
                        })
                    }
            </AccordionDetails>
        </Accordion>

    </div>
}

export default FavoriteMaterials;